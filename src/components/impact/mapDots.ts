import { WORLD_GRID, decodeWorldGrid } from '../../content/impact/worldGrid';

let cache: Uint8Array | null = null;

/** Land cells, decoded once per page. */
export function landCells(): Uint8Array {
  if (!cache) cache = decodeWorldGrid();
  return cache;
}

/** Aspect ratio (height / width) of the map area covered by the grid. */
export const MAP_ASPECT = WORLD_GRID.rows / WORLD_GRID.cols;

export interface Dot {
  x: number;
  y: number;
}

/**
 * Centers of the land cells scaled to `width` × `height`. `step` skips cells (2 = every other row/column)
 * to keep the dot field legible on narrow screens.
 */
export function landDots(width: number, height: number, step = 1): Dot[] {
  const cells = landCells();
  const { cols, rows } = WORLD_GRID;
  const cellW = width / cols;
  const cellH = height / rows;
  const dots: Dot[] = [];
  for (let r = 0; r < rows; r += step) {
    for (let c = 0; c < cols; c += step) {
      if (cells[r * cols + c]) dots.push({ x: (c + 0.5) * cellW, y: (r + 0.5) * cellH });
    }
  }
  return dots;
}

/** Dot radius for a given width and step so the field stays even. */
export function dotRadius(width: number, step: number): number {
  return (width / WORLD_GRID.cols) * step * 0.3;
}
