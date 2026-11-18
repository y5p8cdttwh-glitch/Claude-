import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  id?: string;
};

export function SectionHeading({ eyebrow, title, description, align = 'left', tone = 'dark', id }: Props) {
  const center = align === 'center';
  const light = tone === 'light';
  return (
    <Reveal className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <p
        className={`mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] ${
          light ? 'text-gold-light' : 'text-gold-dark'
        }`}
      >
        <span aria-hidden="true" className="h-px w-8 bg-gold" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`font-display text-[2.1rem] font-semibold leading-[1.05] tracking-tight sm:text-5xl ${
          light ? 'text-white' : 'text-navy'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-base leading-relaxed sm:text-lg ${light ? 'text-mist/80' : 'text-navy/70'}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
