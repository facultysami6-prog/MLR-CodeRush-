

export function Tomato({ size = 90 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <defs><radialGradient id="tm" cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#f26a4f" /><stop offset="1" stopColor="#b52f1c" /></radialGradient></defs>
      <ellipse cx="50" cy="93" rx="28" ry="4" fill="#0d3d28" opacity=".15" />
      <circle cx="50" cy="55" r="36" fill="url(#tm)" />
      <path d="M50 22l7 10 11-6-4 12 12 2-10 7M50 22l-7 10-11-6 4 12-12 2 10 7" fill="#2f8a4b" stroke="#176b45" strokeWidth="2" strokeLinejoin="round" />
      <ellipse cx="36" cy="46" rx="6" ry="10" fill="#fff" opacity=".25" transform="rotate(25 36 46)" />
    </svg>
  );
}

export function Carrot({ size = 110 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <defs><linearGradient id="cr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f7a04a" /><stop offset="1" stopColor="#e07414" /></linearGradient></defs>
      <path d="M62 30c8 4 12 12 10 18L26 90c-4 3-9-2-6-6l30-52c3-5 8-4 12-2z" fill="url(#cr)" transform="rotate(-8 50 50)" />
      <path d="M45 52l10 3M38 64l9 3M52 42l8 3" stroke="#c4610f" strokeWidth="2" strokeLinecap="round" />
      <path d="M62 30c-2-12 4-20 10-24 2 8 0 16-4 24M66 34c6-8 14-10 22-8-4 8-12 12-20 12M60 32c-8-6-10-14-8-20 8 2 12 10 12 20" fill="#4caf50" stroke="#176b45" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function Leaf({ size = 70, color = '#4caf50' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M12 88C4 44 34 8 90 10c2 52-28 84-78 78z" fill={color} />
      <path d="M12 88C34 62 56 40 80 22M40 60l18 2M52 46l16-2M28 74l12 2" stroke="#0d3d28" strokeOpacity=".45" strokeWidth="2.4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Pumpkin({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <defs><radialGradient id="pk" cx=".4" cy=".3" r=".9"><stop offset="0" stopColor="#f9a94f" /><stop offset="1" stopColor="#d96c0f" /></radialGradient></defs>
      <ellipse cx="50" cy="62" rx="42" ry="32" fill="url(#pk)" />
      <path d="M50 30c-14 8-14 56 0 64M50 30c14 8 14 56 0 64M50 30c-28 4-38 48-8 62M50 30c28 4 38 48 8 62" stroke="#b85a0a" strokeOpacity=".5" strokeWidth="2" fill="none" />
      <path d="M50 32c0-8 2-12 8-15" stroke="#176b45" strokeWidth="5" strokeLinecap="round" fill="none" />
    </svg>
  );
}


export function QuoteArt() {
  return (
    <svg viewBox="0 0 520 520" className="quote__art" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="qa-rom" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#2f8a4b" /><stop offset="1" stopColor="#7bc67e" /></linearGradient>
        <linearGradient id="qa-rom2" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#1f7a44" /><stop offset="1" stopColor="#58b062" /></linearGradient>
        <radialGradient id="qa-tom" cx=".35" cy=".3" r=".85"><stop offset="0" stopColor="#f4715a" /><stop offset="1" stopColor="#a92c1a" /></radialGradient>
        <linearGradient id="qa-cuc" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#2a7a3d" /><stop offset=".45" stopColor="#5fae5a" /><stop offset="1" stopColor="#1d6133" /></linearGradient>
        <linearGradient id="qa-car" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f7a04a" /><stop offset="1" stopColor="#d9690f" /></linearGradient>
        <linearGradient id="qa-bag" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#d6ddc4" /><stop offset="1" stopColor="#a3b190" /></linearGradient>
        <radialGradient id="qa-lem" cx=".35" cy=".3" r=".85"><stop offset="0" stopColor="#f8ea62" /><stop offset="1" stopColor="#cfae17" /></radialGradient>
        <radialGradient id="qa-avo" cx=".35" cy=".3" r=".85"><stop offset="0" stopColor="#6f9440" /><stop offset="1" stopColor="#26401a" /></radialGradient>
        <radialGradient id="qa-head" cx=".4" cy=".3" r=".9"><stop offset="0" stopColor="#5aa95c" /><stop offset="1" stopColor="#1b6236" /></radialGradient>
        <linearGradient id="qa-stem" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#a9d383" /><stop offset="1" stopColor="#5f9d4c" /></linearGradient>
        <pattern id="qa-dots" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.5" r="2" fill="#a6dc9c" opacity=".45" /><circle cx="7" cy="7" r="1.8" fill="#0d3d28" opacity=".4" /></pattern>
      </defs>


      <path d="M318 330C286 220 318 96 392 34c56 60 80 170 40 300z" fill="url(#qa-rom)" />
      <path d="M384 336C374 232 424 132 506 108c22 92-6 178-58 236z" fill="url(#qa-rom2)" />
      <path d="M356 320C346 230 366 150 396 84M430 330C434 250 458 190 490 138" stroke="#d6f0d0" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" fill="none" />


      <g transform="rotate(-30 250 270)">
        <rect x="214" y="150" width="72" height="240" rx="36" fill="url(#qa-cuc)" />
        <path d="M232 170v200M250 160v220M268 170v200" stroke="#d6f0d0" strokeOpacity=".35" strokeWidth="2.5" strokeLinecap="round" />
      </g>


      <circle cx="252" cy="108" r="54" fill="url(#qa-tom)" />
      <path d="M252 62l10 18 20-8-8 20 20 6-18 12M252 62l-10 18-20-8 8 20-20 6 18 12" fill="#3f9a4d" stroke="#176b45" strokeWidth="2" strokeLinejoin="round" />
      <ellipse cx="228" cy="100" rx="8" ry="15" fill="#fff" opacity=".22" transform="rotate(20 228 100)" />


      <g stroke="#c4610f" strokeWidth="2" strokeLinecap="round">
        <path d="M30 292L170 228c18-6 30 14 14 28L44 320z" fill="url(#qa-car)" />
        <path d="M70 296l14-6M110 278l10-5M144 262l8-4M52 318l10-4" fill="none" />
      </g>
      <path d="M176 236c14-16 26-30 46-34-6 20-18 32-36 46z" fill="#4caf50" stroke="#176b45" strokeWidth="1.6" strokeLinejoin="round" />


      <path d="M262 360C242 300 238 248 246 214" stroke="#a3b190" strokeWidth="18" strokeLinecap="round" fill="none" />
      <path d="M246 250C330 232 430 200 520 158V520H278C270 440 258 350 246 250z" fill="url(#qa-bag)" />
      <path d="M300 258C340 250 400 232 470 208V520H340C330 440 312 350 300 258z" fill="#fff" opacity=".12" />
      <path d="M270 300C300 340 330 430 336 520M368 236C384 340 396 430 402 520" stroke="#7c8b6c" strokeOpacity=".35" strokeWidth="3" fill="none" />


      <ellipse cx="352" cy="440" rx="54" ry="48" fill="url(#qa-avo)" />
      <ellipse cx="334" cy="424" rx="10" ry="16" fill="#fff" opacity=".16" transform="rotate(25 334 424)" />


      <ellipse cx="222" cy="322" rx="54" ry="50" fill="url(#qa-lem)" />
      <ellipse cx="204" cy="304" rx="10" ry="16" fill="#fff" opacity=".28" transform="rotate(25 204 304)" />


      <path d="M96 520C98 480 110 456 126 432h36c-2 30 4 62 12 88z" fill="url(#qa-stem)" />
      <g fill="url(#qa-head)">
        <circle cx="66" cy="410" r="52" /><circle cx="134" cy="376" r="60" /><circle cx="200" cy="416" r="50" />
        <circle cx="102" cy="448" r="46" /><circle cx="168" cy="456" r="44" /><circle cx="44" cy="466" r="38" />
      </g>
      <g fill="url(#qa-dots)">
        <circle cx="66" cy="410" r="52" /><circle cx="134" cy="376" r="60" /><circle cx="200" cy="416" r="50" />
        <circle cx="102" cy="448" r="46" /><circle cx="168" cy="456" r="44" /><circle cx="44" cy="466" r="38" />
      </g>
    </svg>
  );
}
