/**
 * Original geometric illustration of "A Justiça" (Alfredo Ceschiatti, 1961), the seated, blindfolded figure with a
 * sword across her lap in front of the Supreme Federal Court in Brasília, seen from the front-left as in the usual
 * photographs: head raised, torso leaning back, hands on the sword resting on the knees, cubic seat and plinth.
 * The head, torso and arms follow the statue's silhouette; the seat, legs and sword are drawn as simple planes.
 */
export function JusticeStatue({ title }: { title: string }) {
  return (
    <svg className="statue" viewBox="40 30 260 312" role="img" aria-labelledby="statue-title">
      <title id="statue-title">{title}</title>
      <defs>
        <linearGradient id="statue-lit" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eef0f4" />
          <stop offset="0.6" stopColor="#cfd4dd" />
          <stop offset="1" stopColor="#aab0bc" />
        </linearGradient>
        <linearGradient id="statue-mid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c3c8d2" />
          <stop offset="1" stopColor="#8e95a2" />
        </linearGradient>
        <linearGradient id="statue-dark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8d94a1" />
          <stop offset="1" stopColor="#5d6471" />
        </linearGradient>
        <linearGradient id="statue-blade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6f7fa" />
          <stop offset="0.5" stopColor="#b9c0cc" />
          <stop offset="1" stopColor="#e9ecf1" />
        </linearGradient>
        <radialGradient id="statue-halo" cx="0.5" cy="0.45" r="0.55">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="160" cy="190" rx="130" ry="150" fill="url(#statue-halo)" />

      {/* plinth */}
      <polygon points="44,322 300,315 300,342 44,342" fill="url(#statue-dark)" />
      <polygon points="44,322 300,315 300,319 44,326" fill="#c3c8d2" opacity="0.5" />

      {/* cubic seat: right side, front, top */}
      <polygon points="256,198 268,186 268,302 256,318" fill="url(#statue-dark)" />
      <polygon points="150,214 256,198 256,318 152,322" fill="url(#statue-mid)" />
      <polygon points="172,192 256,198 268,186 188,181" fill="url(#statue-lit)" />

      {/* lower legs with drapery */}
      <polygon points="84,234 110,243 154,232 154,322 92,322 80,300 78,262" fill="url(#statue-mid)" />
      <path d="M98 246 Q92 290 96 320" stroke="#5d6471" strokeOpacity="0.5" strokeWidth="2" fill="none" />
      <path d="M126 240 Q120 285 128 320" stroke="#5d6471" strokeOpacity="0.45" strokeWidth="2" fill="none" />
      <path d="M144 236 Q140 280 146 320" stroke="#eef0f4" strokeOpacity="0.35" strokeWidth="1.5" fill="none" />

      {/* thighs */}
      <polygon points="120,197 178,189 186,202 110,243 84,234 86,224" fill="url(#statue-lit)" />

      {/* head, torso and arms */}
      <path
        d="M124 38 L134 38 L137 39 L142 44 L141 60 L137 73 L134 77 L135 94 L142 102 L153 110 L164 121 L150 149 L150 157 L152 163 L156 168 L166 176 L174 192 L131 197 L139 180 L140 176 L132 171 L132 168 L130 166 L123 164 L122 165 L123 170 L121 172 L104 175 L101 173 L93 172 L87 168 L83 168 L81 165 L76 164 L76 162 L74 161 L72 157 L72 148 L75 138 L89 109 L95 101 L104 96 L109 95 L113 91 L112 68 L114 67 L114 60 L106 59 L105 57 L101 55 L101 52 L113 43Z"
        fill="url(#statue-lit)"
      />
      <polygon points="135,94 142,102 153,110 164,121 150,149 150,157 156,168 166,176 174,192 158,192 146,160 144,128 138,110" fill="url(#statue-dark)" opacity="0.8" />
      <path d="M95 101 Q84 130 80 160" stroke="#5d6471" strokeOpacity="0.4" strokeWidth="3" fill="none" />
      <polygon points="128,39 137,39 142,44 141,60 137,73 134,77 131,70 132,52" fill="url(#statue-dark)" opacity="0.75" />

      {/* blindfold */}
      <polygon points="99,59 140,50 141,58 100,68" fill="#4a505c" />
      <path d="M100 60 L139 51" stroke="#eef0f4" strokeOpacity="0.35" strokeWidth="1" fill="none" />

      {/* sword resting on the knees: blade, guard, grip, pommel */}
      <polygon points="109,186 63,254 57,250 103,182" fill="url(#statue-blade)" />
      <line x1="106" y1="184" x2="60" y2="252" stroke="#6f7684" strokeWidth="0.8" strokeOpacity="0.7" />
      <polygon points="99,177 116,188 114,191 97,180" fill="#4a505c" />
      <line x1="108" y1="182" x2="119" y2="168" stroke="#4a505c" strokeWidth="5" strokeLinecap="round" />
      <circle cx="121" cy="166" r="4" fill="url(#statue-blade)" />

      {/* hands over the blade */}
      <ellipse cx="101" cy="187" rx="9" ry="7" fill="url(#statue-lit)" />
      <ellipse cx="112" cy="181" rx="7" ry="6" fill="url(#statue-mid)" />
    </svg>
  );
}
