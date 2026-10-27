#!/usr/bin/env python3
"""Traces src/components/impact/statuePaths.ts from a cut-out photograph of "A Justiça" (statue on a black
background): the silhouette plus two shade bands, as simplified polygons. Needs only numpy and Pillow.

    python3 -I scripts/trace-statue.py <cutout.jpg> src/components/impact/statuePaths.ts [silhouette-tolerance] [blur]

The source photograph is not in the repository. Run with -I so nothing is imported from the image's folder.
"""
import json, sys
import numpy as np
from PIL import Image, ImageFilter

src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('L')
W, H = im.size
a = np.asarray(im).astype(np.float32)

def components(binary):
    h, w = binary.shape; labels = np.zeros((h, w), dtype=np.int32); n = 0; sizes = {}
    for y in range(h):
        row = binary[y]
        for x in np.where(row)[0]:
            if labels[y, x] == 0:
                n += 1; stack = [(y, x)]; labels[y, x] = n; size = 0
                while stack:
                    cy, cx = stack.pop(); size += 1
                    for ny, nx in ((cy-1, cx), (cy+1, cx), (cy, cx-1), (cy, cx+1)):
                        if 0 <= ny < h and 0 <= nx < w and binary[ny, nx] and labels[ny, nx] == 0:
                            labels[ny, nx] = n; stack.append((ny, nx))
                sizes[n] = size
    return labels, sizes

def trace(binary):
    h, w = binary.shape; p = np.zeros((h + 2, w + 2), dtype=bool); p[1:-1, 1:-1] = binary
    ys, xs = np.where(p)
    if len(ys) == 0: return []
    start = (int(ys[0]), int(xs[np.where(ys == ys[0])[0][0]]))
    dirs = [(0,1),(1,1),(1,0),(1,-1),(0,-1),(-1,-1),(-1,0),(-1,1)]
    contour = [start]; cur = start; backtrack = 4
    for _ in range(400000):
        found = False
        for k in range(8):
            d = (backtrack + 1 + k) % 8; ny, nx = cur[0] + dirs[d][0], cur[1] + dirs[d][1]
            if p[ny, nx]:
                cur = (ny, nx); contour.append(cur); backtrack = (d + 4) % 8; found = True; break
        if not found or (cur == start and len(contour) > 2): break
    return [(int(x) - 1, int(y) - 1) for (y, x) in contour]

def dp(points, tol):
    if len(points) < 3: return points
    a0, b0 = np.array(points[0], float), np.array(points[-1], float); ab = b0 - a0; n = np.hypot(*ab) or 1
    P = np.array(points, float); d = np.abs(ab[1]*P[:,0] - ab[0]*P[:,1] + b0[0]*a0[1] - b0[1]*a0[0]) / n
    i = int(np.argmax(d))
    if d[i] <= tol: return [points[0], points[-1]]
    return dp(points[:i+1], tol)[:-1] + dp(points[i:], tol)

def closed(points, tol):
    if len(points) < 4: return points
    far = int(np.argmax([np.hypot(x-points[0][0], y-points[0][1]) for x, y in points]))
    return dp(points[:far+1], tol)[:-1] + dp(points[far:], tol)[:-1]

def path_of(points):
    return 'M' + 'L'.join(f'{x} {y}' for x, y in points) + 'Z'

def fill_holes(mask):
    bg = ~mask
    bl, _ = components(bg)
    border = set(bl[0, :]) | set(bl[-1, :]) | set(bl[:, 0]) | set(bl[:, -1])
    return mask | (bg & ~np.isin(bl, list(border)))

# silhouette
m = a > 40
mask = Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.MaxFilter(3))
m = np.asarray(mask) > 0
lab, sz = components(m); sil = fill_holes(lab == max(sz, key=sz.get))
ys, xs = np.where(sil)
bbox = [int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())]
result = {'width': W, 'height': H, 'bbox': bbox, 'silhouette': path_of(closed(trace(sil), float(sys.argv[3]) if len(sys.argv) > 3 else 1.6)), 'levels': []}

# tonal bands
blurred = np.asarray(Image.fromarray(a.astype(np.uint8)).filter(ImageFilter.GaussianBlur(float(sys.argv[4]) if len(sys.argv) > 4 else 6))).astype(np.float32)
inside = blurred[sil]
cuts = [np.percentile(inside, q) for q in (28, 55)]
for i, cut in enumerate(cuts):
    band = (blurred < cut) & sil
    band = np.asarray(Image.fromarray((band * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.MinFilter(3))) > 0
    lab, sz = components(band)
    paths = []
    for label, size in sorted(sz.items(), key=lambda kv: -kv[1]):
        if size < 350: continue
        pts = trace(lab == label)
        if len(pts) > 10:
            paths.append(path_of(closed(pts, 2.4)))
    result['levels'].append({'cut': float(cut), 'paths': paths})
x0, y0, x1, y1 = result['bbox']
with open(out, 'w') as f:
    f.write('/**\n * Vector outline of "A Justiça" (Alfredo Ceschiatti) traced from a cut-out photograph by scripts/trace-statue.py:\n'
            ' * the silhouette and two shade bands as simplified polygons, in the photograph\'s pixel space. Do not edit by hand.\n */\n')
    f.write(f'export const STATUE_VIEWBOX = \'{x0 - 12} {y0 - 12} {x1 - x0 + 24} {y1 - y0 + 24}\';\n')
    f.write(f'export const STATUE_SILHOUETTE = \'{result["silhouette"]}\';\n')
    f.write('/** Darker planes, from mid tone to the darkest (each an array of closed paths). */\n')
    f.write('export const STATUE_SHADES: readonly (readonly string[])[] = [\n')
    for level in reversed(result['levels']):
        f.write('  [' + ', '.join(f"'{p}'" for p in level['paths']) + '],\n')
    f.write('];\n')
print('bbox', bbox, 'sil', len(result['silhouette']), 'bands', [(len(l['paths']), sum(len(p) for p in l['paths'])) for l in result['levels']])
