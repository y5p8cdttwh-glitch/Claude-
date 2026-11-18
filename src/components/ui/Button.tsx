import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'light' | 'ghost-light' | 'gold';
type Size = 'md' | 'lg';

const base =
  'group inline-flex items-center justify-center gap-2.5 rounded-full text-center font-semibold leading-snug tracking-[0.01em] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none select-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-navy text-white shadow-soft hover:bg-navy-700 hover:shadow-lift hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'border border-navy/15 bg-white text-navy hover:border-navy/40 hover:bg-mist-50 hover:-translate-y-0.5 active:translate-y-0',
  light:
    'bg-white text-navy shadow-soft hover:bg-mist-50 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-offset-navy',
  'ghost-light':
    'border border-white/25 text-white hover:border-white/60 hover:bg-white/5 focus-visible:ring-offset-navy',
  gold: 'bg-gold text-navy-900 shadow-soft hover:bg-gold-light hover:-translate-y-0.5 active:translate-y-0',
};

const sizes: Record<Size, string> = {
  md: 'min-h-11 px-5 py-2 text-sm',
  lg: 'min-h-14 px-5 py-3 text-[0.9rem] sm:px-7 sm:text-[0.95rem]',
};

type Common = { variant?: Variant; size?: Size; children: ReactNode; className?: string };

export function buttonClass(variant: Variant = 'primary', size: Size = 'md', extra = '') {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

export function ButtonLink({
  variant,
  size,
  className = '',
  children,
  external,
  ...rest
}: Common & AnchorHTMLAttributes<HTMLAnchorElement> & { external?: boolean }) {
  const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <a className={buttonClass(variant, size, className)} {...ext} {...rest}>
      {children}
    </a>
  );
}

export function Button({
  variant,
  size,
  className = '',
  children,
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
