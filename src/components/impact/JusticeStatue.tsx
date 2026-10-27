import { STATUE_SHADES, STATUE_SILHOUETTE, STATUE_VIEWBOX } from './statuePaths';

/**
 * Geometric illustration of "A Justiça" (Alfredo Ceschiatti, 1961), the seated, blindfolded figure with a sword
 * across her lap in front of the Supreme Federal Court in Brasília. The silhouette and the shade planes are traced
 * from a photograph of the statue (scripts/trace-statue.py); the blindfold and the sword are drawn on top.
 */
export function JusticeStatue({ title }: { title: string }) {
  return (
    <svg className="statue" viewBox={STATUE_VIEWBOX} role="img" aria-labelledby="statue-title">
      <title id="statue-title">{title}</title>
      <defs>
        <linearGradient id="statue-lit" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f1f3f7" />
          <stop offset="0.6" stopColor="#d6dae2" />
          <stop offset="1" stopColor="#b7bdc8" />
        </linearGradient>
        <linearGradient id="statue-mid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#aab0bc" />
          <stop offset="1" stopColor="#8a919e" />
        </linearGradient>
        <linearGradient id="statue-dark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7a8190" />
          <stop offset="1" stopColor="#5a6170" />
        </linearGradient>
        <linearGradient id="statue-blade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f6f7fa" />
          <stop offset="0.5" stopColor="#bcc3cf" />
          <stop offset="1" stopColor="#e9ecf1" />
        </linearGradient>
        <radialGradient id="statue-halo" cx="0.5" cy="0.5" r="0.55">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="600" cy="600" rx="480" ry="520" fill="url(#statue-halo)" />
      <path d={STATUE_SILHOUETTE} fill="url(#statue-lit)" />
      {STATUE_SHADES.map((paths, level) => paths.map((d, index) => <path key={`${level}-${index}`} d={d} fill={level === 0 ? 'url(#statue-mid)' : 'url(#statue-dark)'} />))}

      {/* blindfold */}
      <polygon points="318,160 428,146 430,172 320,188" fill="#4a505c" opacity="0.92" />
      <path d="M320 162 L427 148" stroke="#f1f3f7" strokeOpacity="0.35" strokeWidth="2" fill="none" />

      {/* sword resting across the lap: blade from the hands to the tip at the lower left */}
      <polygon points="376,486 296,690 284,684 364,480" fill="url(#statue-blade)" />
      <line x1="370" y1="484" x2="290" y2="687" stroke="#6f7684" strokeWidth="1.5" strokeOpacity="0.6" />
      <polygon points="352,470 392,492 388,500 348,478" fill="#4a505c" opacity="0.9" />
    </svg>
  );
}
