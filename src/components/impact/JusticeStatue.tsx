/**
 * Original stylized illustration inspired by "A Justiça" (Alfredo Ceschiatti, 1961), the seated,
 * blindfolded figure with a sword across her lap in front of the Supreme Federal Court in Brasília.
 * Drawn from simple geometric masses with a stone-and-glass finish; decorative, described by `title`.
 */
export function JusticeStatue({ title }: { title: string }) {
  return (
    <svg className="statue" viewBox="0 0 220 340" role="img" aria-labelledby="statue-title">
      <title id="statue-title">{title}</title>
      <defs>
        <linearGradient id="statue-stone" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e6ebf6" />
          <stop offset="0.45" stopColor="#a4afc8" />
          <stop offset="1" stopColor="#4a5368" />
        </linearGradient>
        <linearGradient id="statue-shade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7d879f" />
          <stop offset="1" stopColor="#262c3d" />
        </linearGradient>
        <linearGradient id="statue-blade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f4f6fb" />
          <stop offset="0.5" stopColor="#9aa4bb" />
          <stop offset="1" stopColor="#e2e7f2" />
        </linearGradient>
        <radialGradient id="statue-halo" cx="0.5" cy="0.55" r="0.5">
          <stop offset="0" stopColor="#9db8ff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#9db8ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="110" cy="200" rx="104" ry="136" fill="url(#statue-halo)" />

      {/* pedestal */}
      <rect x="46" y="302" width="128" height="22" rx="4" fill="url(#statue-shade)" />
      <rect x="40" y="322" width="140" height="8" rx="3" fill="#1d2230" />

      {/* robe and legs: a single draped block from the knees to the base */}
      <path d="M64 204 H156 L166 302 H54 Z" fill="url(#statue-stone)" />
      <path d="M86 214 Q90 260 84 300" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="2" fill="none" />
      <path d="M134 214 Q138 260 134 300" stroke="#1d2230" strokeOpacity="0.35" strokeWidth="2" fill="none" />

      {/* torso */}
      <path d="M74 128 Q110 118 146 128 L152 206 H68 Z" fill="url(#statue-stone)" />
      <path d="M78 134 Q96 128 110 130" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" fill="none" />

      {/* arms resting towards the lap */}
      <path d="M78 134 L66 180 L92 200" stroke="url(#statue-stone)" strokeWidth="17" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M142 134 L154 180 L128 200" stroke="url(#statue-shade)" strokeWidth="17" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* neck and head */}
      <rect x="100" y="98" width="20" height="34" rx="6" fill="url(#statue-shade)" />
      <ellipse cx="110" cy="80" rx="24" ry="30" fill="url(#statue-stone)" />
      <path d="M86 76 Q110 40 134 76 Q122 66 110 66 Q98 66 86 76 Z" fill="url(#statue-shade)" />

      {/* blindfold */}
      <path d="M86 76 Q110 68 134 76 L134 87 Q110 80 86 87 Z" fill="#232838" opacity="0.92" />
      <path d="M88 78 Q110 71 132 78" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="1.2" fill="none" />

      {/* sword across the lap */}
      <path d="M26 206 L38 201 H132 V211 H38 Z" fill="url(#statue-blade)" />
      <rect x="131" y="195" width="5" height="22" rx="1.5" fill="#232838" />
      <rect x="136" y="202" width="30" height="8" rx="4" fill="#3a4156" />
      <circle cx="171" cy="206" r="5.5" fill="url(#statue-blade)" />

      {/* hands over the blade */}
      <ellipse cx="94" cy="203" rx="9" ry="6.5" fill="url(#statue-stone)" />
      <ellipse cx="126" cy="203" rx="9" ry="6.5" fill="url(#statue-stone)" />

      {/* glass rim light along the left edge */}
      <path d="M66 182 Q60 240 56 300" stroke="#ffffff" strokeOpacity="0.28" strokeWidth="1.5" fill="none" />
      <path d="M90 52 Q84 70 88 92" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
