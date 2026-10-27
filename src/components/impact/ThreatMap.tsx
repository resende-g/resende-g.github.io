import { useEffect, useRef, useState } from 'react';
import { hubs } from '../../content/impact/cyber';
import { useI18n } from '../../i18n';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { MAP_ASPECT, dotRadius, landDots } from './mapDots';
import { StaticThreatMap } from './StaticThreatMap';
import { arcControl, categoryColor, createSimulation, project, quadraticPoint, type SimEvent } from './threatSim';

const MAX_PIXEL_RATIO = 2;
const FRAME_INTERVAL = 1000 / 30;
const LAND_DOT = 'rgba(157, 184, 255, 0.30)';
const HUB_DOT = 'rgba(238, 240, 245, 0.55)';

interface Layer {
  width: number;
  height: number;
  ratio: number;
  base: HTMLCanvasElement;
}

function hexToRgba(hex: string, alpha: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

/** Renders the static dot field (land + hubs) into an offscreen canvas, redrawn only on resize. */
function buildBaseLayer(width: number, height: number, ratio: number): HTMLCanvasElement | null {
  const base = document.createElement('canvas');
  base.width = Math.round(width * ratio);
  base.height = Math.round(height * ratio);
  const ctx = base.getContext('2d');
  if (!ctx) return null;
  ctx.scale(ratio, ratio);
  const step = width < 560 ? 2 : 1;
  const r = dotRadius(width, step);
  ctx.fillStyle = LAND_DOT;
  for (const dot of landDots(width, height, step)) {
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = HUB_DOT;
  for (const hub of hubs) {
    const p = project(hub.lon, hub.lat, width, height);
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
    ctx.fill();
  }
  return base;
}

function drawEvent(ctx: CanvasRenderingContext2D, event: SimEvent, now: number, width: number, height: number): void {
  const progress = Math.min(1, (now - event.start) / event.duration);
  const a = project(event.from.lon, event.from.lat, width, height);
  const b = project(event.to.lon, event.to.lat, width, height);
  const c = arcControl(a, b);
  const color = categoryColor(event.category);

  // The head travels during the first 70% of the lifetime; the tail follows, so the arc "flows" and fades.
  const head = Math.min(1, progress / 0.7);
  const tail = Math.max(0, (progress - 0.3) / 0.7);
  const alpha = progress > 0.85 ? (1 - progress) / 0.15 : 1;

  if (head > tail) {
    const steps = 24;
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const t = tail + ((head - tail) * i) / steps;
      const p = quadraticPoint(a, c, b, t);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.lineCap = 'round';
    ctx.strokeStyle = hexToRgba(color, 0.18 * alpha);
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.strokeStyle = hexToRgba(color, 0.9 * alpha);
    ctx.lineWidth = 1.4;
    ctx.stroke();
  }

  // Origin pulse during the first 600 ms.
  const sinceStart = now - event.start;
  if (sinceStart < 600) {
    const k = sinceStart / 600;
    ctx.beginPath();
    ctx.arc(a.x, a.y, 2 + k * 9, 0, Math.PI * 2);
    ctx.strokeStyle = hexToRgba(color, 0.6 * (1 - k));
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Destination burst once the head arrives.
  const arrival = event.start + event.duration * 0.7;
  if (now >= arrival && now < arrival + 700) {
    const k = (now - arrival) / 700;
    ctx.beginPath();
    ctx.arc(b.x, b.y, 2 + k * 12, 0, Math.PI * 2);
    ctx.strokeStyle = hexToRgba(color, 0.7 * (1 - k));
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(b.x, b.y, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = hexToRgba(color, 0.95 * (1 - k * 0.5));
    ctx.fill();
  }
}

/**
 * Animated demonstration map. Draws a dotted world and synthetic arcs on a 2D canvas; runs only while
 * visible and not paused; pixel ratio capped; everything is released on unmount.
 * Falls back to the static SVG map when the user prefers reduced motion or the canvas is unavailable.
 */
export function ThreatMap() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const [unsupported, setUnsupported] = useState(false);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const visible = useInView(containerRef, { once: false, threshold: 0.1 });
  const useStatic = reduced || unsupported;

  useEffect(() => {
    if (useStatic) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setUnsupported(true);
      return;
    }

    let layer: Layer | null = null;
    let frame = 0;
    let lastFrame = 0;
    let running = false;
    const simulation = createSimulation();

    const resize = () => {
      const width = container.clientWidth;
      if (width === 0) return;
      const height = Math.round(width * MAP_ASPECT);
      const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.height = `${height}px`;
      const base = buildBaseLayer(width, height, ratio);
      if (!base) {
        setUnsupported(true);
        return;
      }
      layer = { width, height, ratio, base };
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      render(performance.now());
    };

    const render = (now: number) => {
      if (!layer) return;
      ctx.clearRect(0, 0, layer.width, layer.height);
      ctx.drawImage(layer.base, 0, 0, layer.width, layer.height);
      for (const event of simulation.update(now)) drawEvent(ctx, event, now, layer.width, layer.height);
    };

    const loop = (now: number) => {
      if (!running) return;
      if (now - lastFrame >= FRAME_INTERVAL) {
        lastFrame = now;
        render(now);
      }
      frame = requestAnimationFrame(loop);
    };

    const shouldRun = () => visible && !paused && document.visibilityState === 'visible';
    const sync = () => {
      const next = shouldRun();
      if (next && !running) {
        running = true;
        frame = requestAnimationFrame(loop);
      } else if (!next && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    };

    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
    observer?.observe(container);
    if (!observer) window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', sync);
    resize();
    sync();

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', sync);
      layer = null;
      canvas.width = 0;
      canvas.height = 0;
    };
  }, [useStatic, visible, paused]);

  if (useStatic) {
    return <StaticThreatMap reason={reduced ? t.impact.cyber.reducedMotion : t.impact.cyber.noCanvas} />;
  }

  return (
    <div className="map" ref={containerRef}>
      <canvas ref={canvasRef} className="map__canvas" role="img" aria-label={t.impact.cyber.mapLabel} />
      <button
        type="button"
        className="map__control"
        aria-pressed={paused}
        onClick={() => setPaused((value) => !value)}
      >
        {paused ? t.impact.cyber.resume : t.impact.cyber.pause}
      </button>
      {paused && (
        <p className="map__status" role="status">
          {t.impact.cyber.paused}
        </p>
      )}
    </div>
  );
}
