import logoBlack from '../assets/logo-black.png';
import { useI18n } from '../i18n';

interface LogoProps {
  className?: string;
  height?: number;
}

export function Logo({ className, height = 28 }: LogoProps) {
  const { t } = useI18n();
  // Source mark is 600×368 px (same aspect ratio as the original).
  const width = Math.round((height * 600) / 368);
  return <img className={className} src={logoBlack} alt={t.brand.logoAlt} width={width} height={height} decoding="async" />;
}
