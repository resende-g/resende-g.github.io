import { useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useI18n } from '../../i18n';
import { BRAZIL_ASPECT, STATIC_STRIKES, createSimulation, lonLatToPoint, outlinePoints, type Point, type Strike } from './brazilMap';

const MAX_PIXEL_RATIO = 2;
const FRAME_INTERVAL = 1000 / 30;
const SILVER = '#aeb4bf';
const SILVER_DARK = '#8b919c';

function tracePath(ctx: CanvasRenderingContext2D, points: Point[]): void {
  ctx.beginPath();
  points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
  ctx.closePath();
}

/** The glass slab: a soft shadow, a white-to-silver fill, an inner highlight and a diagonal sheen. */
function drawGlass(ctx: CanvasRenderingContext2D, points: Point[], width: number, height: number): void {
  ctx.save();
  ctx.shadowColor = 'rgba(30, 40, 60, 0.18)';
  ctx.shadowBlur = Math.max(12, width * 0.05);
  ctx.shadowOffsetY = Math.max(6, width * 0.02);
  const fill = ctx.createLinearGradient(0, 0, width, height);
  fill.addColorStop(0, 'rgba(255, 255, 255, 0.96)');
  fill.addColorStop(0.55, 'rgba(236, 239, 245, 0.92)');
  fill.addColorStop(1, 'rgba(214, 219, 228, 0.9)');
  tracePath(ctx, points);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.restore();

  ctx.save();
  tracePath(ctx, points);
  ctx.clip();
  const sheen = ctx.createLinearGradient(width * 0.1, 0, width * 0.7, height);
  sheen.addColorStop(0.3, 'rgba(255, 255, 255, 0)');
  sheen.addColorStop(0.48, 'rgba(255, 255, 255, 0.55)');
  sheen.addColorStop(0.56, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  tracePath(ctx, points);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  tracePath(ctx, points);
  ctx.strokeStyle = 'rgba(120, 128, 142, 0.35)';
  ctx.lineWidth = 0.75;
  ctx.stroke();
}

/** One falling streak: a silver trail with a bright head, then a short impact ring. */
function drawStrike(ctx: CanvasRenderingContext2D, target: Point, progress: number, height: number): void {
  const fall = Math.min(1, progress / 0.6);
  const startY = -height * 0.12;
  const headY = startY + (target.y - startY) * fall;
  const trail = Math.max(18, height * 0.22) * (1 - fall * 0.4);
  const alpha = progress < 0.6 ? 1 : Math.max(0, 1 - (progress - 0.6) / 0.25);

  if (fall < 1 || alpha > 0.05) {
    const gradient = ctx.createLinearGradient(target.x, headY - trail, target.x, headY);
    gradient.addColorStop(0, 'rgba(174, 180, 191, 0)');
    gradient.addColorStop(1, `rgba(139, 145, 156, ${0.95 * alpha})`);
    ctx.beginPath();
    ctx.moveTo(target.x, headY - trail);
    ctx.lineTo(target.x, headY);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1.8;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(target.x, headY, 2.6, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(target.x, headY, 1.4, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(139, 145, 156, ${alpha})`;
    ctx.fill();
  }

  if (progress >= 0.6) {
    const k = (progress - 0.6) / 0.4;
    ctx.beginPath();
    ctx.arc(target.x, target.y, 2 + k * 11, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(139, 145, 156, ${0.7 * (1 - k)})`;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(target.x, target.y, 1.8, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(139, 145, 156, ${0.9 * (1 - k)})`;
    ctx.fill();
  }
}

function StaticBrazilMap({ reason }: { reason?: string }) {
  const { t } = useI18n();
  const width = 600;
  const height = Math.round(width / BRAZIL_ASPECT);
  const path = useMemo(() => outlinePoints(width, height).map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join('') + 'Z', [height]);
  return (
    <div className="brmap brmap--static">
      <svg className="brmap__svg" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={t.impact.cyber.staticMapLabel}>
        <defs>
          <linearGradient id="brmap-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.55" stopColor="#eceff5" />
            <stop offset="1" stopColor="#d6dbe4" />
          </linearGradient>
          <filter id="brmap-shadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#1e283c" floodOpacity="0.18" />
          </filter>
        </defs>
        <path d={path} fill="url(#brmap-fill)" stroke="#ffffff" strokeWidth="1.5" filter="url(#brmap-shadow)" />
        {STATIC_STRIKES.map((strike, index) => {
          const target = lonLatToPoint(strike.lon, strike.lat, width, height);
          const startY = -height * 0.12;
          const headY = startY + (target.y - startY) * Math.min(1, strike.progress / 0.6);
          return (
            <g key={index}>
              <line x1={target.x} y1={headY - 60} x2={target.x} y2={headY} stroke={SILVER} strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.8" />
              <circle cx={target.x} cy={headY} r="2.2" fill="#ffffff" stroke={SILVER_DARK} strokeWidth="0.8" />
              {strike.progress >= 0.6 && <circle cx={target.x} cy={target.y} r="7" fill="none" stroke={SILVER_DARK} strokeOpacity="0.5" />}
            </g>
          );
        })}
      </svg>
      {reason && <p className="brmap__status">{reason}</p>}
    </div>
  );
}

/**
 * Brazil as a glass slab with synthetic silver "strikes" falling onto it (demonstration only).
 * 2D canvas; animates only while on screen, in a visible tab and not paused; static SVG under reduced motion or
 * without canvas support.
 */
export function BrazilMap() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const [unsupported, setUnsupported] = useState(false);
  const [paused, setPaused] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const visible = useInView(hostRef, { once: false, threshold: 0.1 });
  const useStatic = reduced || unsupported;

  useEffect(() => {
    if (useStatic) return;
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setUnsupported(true);
      return;
    }

    let width = 0;
    let height = 0;
    let points: Point[] = [];
    let simulation: ReturnType<typeof createSimulation> | null = null;
    let frame = 0;
    let lastFrame = 0;
    let running = false;

    const render = (now: number, strikes: Strike[]) => {
      ctx.clearRect(0, 0, width, height);
      drawGlass(ctx, points, width, height);
      for (const strike of strikes) drawStrike(ctx, strike.target, Math.min(1, (now - strike.start) / strike.duration), height);
    };

    const resize = () => {
      width = host.clientWidth;
      if (width === 0) return;
      height = Math.round(width / BRAZIL_ASPECT);
      const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      points = outlinePoints(width, height);
      simulation = createSimulation(points, width, height);
      render(performance.now(), []);
    };

    const loop = (now: number) => {
      if (!running) return;
      if (now - lastFrame >= FRAME_INTERVAL && simulation) {
        lastFrame = now;
        render(now, simulation.update(now));
      }
      frame = requestAnimationFrame(loop);
    };

    const sync = () => {
      const next = visible && !paused && document.visibilityState === 'visible';
      if (next && !running) {
        running = true;
        frame = requestAnimationFrame(loop);
      } else if (!next && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    };

    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
    observer?.observe(host);
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
      canvas.width = 0;
      canvas.height = 0;
    };
  }, [useStatic, visible, paused]);

  if (useStatic) return <StaticBrazilMap reason={reduced ? t.impact.cyber.reducedMotion : t.impact.cyber.noCanvas} />;

  return (
    <div className="brmap" ref={hostRef}>
      <canvas ref={canvasRef} className="brmap__canvas" role="img" aria-label={t.impact.cyber.mapLabel} />
      <button type="button" className="brmap__control" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>
        {paused ? t.impact.cyber.resume : t.impact.cyber.pause}
      </button>
    </div>
  );
}
