import { site } from '../config/site';

type Props = { tone?: 'dark' | 'light'; className?: string };

export function Logo({ tone = 'dark', className = '' }: Props) {
  const src = tone === 'light' ? site.logoLightSrc || site.logoSrc : site.logoSrc;
  if (src) {
    return <img src={src} alt={site.name} className={`h-10 w-auto ${className}`} height={40} />;
  }
  const light = tone === 'light';
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span
        aria-hidden="true"
        className={`grid h-10 w-10 place-items-center rounded-xl border font-display text-[1.35rem] font-bold leading-none ${
          light ? 'border-gold/60 bg-white/5 text-gold-light' : 'border-navy bg-navy text-gold-light'
        }`}
      >
        <span className="translate-y-[2px]">S</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.3rem] font-bold tracking-tight ${light ? 'text-white' : 'text-navy'}`}>
          Simões
        </span>{' '}
        <span className={`mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.3em] ${light ? 'text-mist/70' : 'text-navy/65'}`}>
          Higienizações
        </span>
      </span>
    </span>
  );
}
