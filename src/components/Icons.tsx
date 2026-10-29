import type { SVGProps } from 'react';
import lattesMask from '../assets/lattes-mask.png';

/**
 * Inline SVG icons (no runtime dependency, no external requests).
 * GitHub and ORCID paths come from simple-icons (CC0). LinkedIn, Mail, Pause, Play, Menu and Close are simplified
 * in-house drawings.
 * Lattes uses the supplied mark as a CSS mask so it takes the current text color like the SVG icons.
 */
type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = { viewBox: '0 0 24 24', 'aria-hidden': true, focusable: false };

export function GitHubIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export function OrcidIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z" />
    </svg>
  );
}

/** Simplified "in" glyph. */
export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="4.9" cy="5" r="2.1" />
      <rect x="3.1" y="9" width="3.6" height="12" rx="0.4" />
      <path d="M10 9h3.5v1.7c.8-1.3 2.3-2 4-2 3 0 4.5 1.9 4.5 5.2V21h-3.6v-6.2c0-1.8-.7-2.8-2.1-2.8-1.5 0-2.7 1.1-2.7 3.1V21H10z" />
    </svg>
  );
}

/** Lattes (CNPq) mark rendered through a mask image, colored by `currentColor`. */
export function LattesIcon({ className }: { className?: string }) {
  const mask = `url(${lattesMask})`;
  return (
    <span
      className={className ? `icon-mask ${className}` : 'icon-mask'}
      aria-hidden="true"
      style={{ WebkitMaskImage: mask, maskImage: mask }}
    />
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 4.5h18A2.5 2.5 0 0 1 23.5 7v10a2.5 2.5 0 0 1-2.5 2.5H3A2.5 2.5 0 0 1 .5 17V7A2.5 2.5 0 0 1 3 4.5zm-.7 2.9V17c0 .4.3.7.7.7h18c.4 0 .7-.3.7-.7V7.4l-8.6 6.3a1.8 1.8 0 0 1-2.2 0zm1.1-1.1L12 12.2l8.6-5.9z" />
    </svg>
  );
}

/** Two bars; used by the map's pause control. */
export function PauseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

/** Right-pointing triangle; used by the map's resume control. */
export function PlayIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
    </svg>
  );
}

/** Two bars (three would echo the brand mark beside it); opens the header menu on narrow screens. */
export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="8" width="16" height="1.8" rx="0.9" />
      <rect x="4" y="14.2" width="16" height="1.8" rx="0.9" />
    </svg>
  );
}

/** Diagonal cross; closes the header menu. */
export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.3 5.03 12 10.73l5.7-5.7 1.27 1.27-5.7 5.7 5.7 5.7-1.27 1.27-5.7-5.7-5.7 5.7-1.27-1.27 5.7-5.7-5.7-5.7z" />
    </svg>
  );
}
