import { useId, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Plus } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';
import { ButtonLink } from './ui/Button';
import { WhatsAppIcon } from './ui/icons';
import { faq } from '../data/faq';
import { whatsappUrl } from '../lib/whatsapp';

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const id = useId();
  return (
    <li className="border-b border-navy/10">
      <h3>
        <button
          type="button"
          id={`${id}-btn`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-lg font-semibold text-navy transition-colors hover:text-navy-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 sm:text-xl"
        >
          {q}
          <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${open ? 'rotate-45 border-navy bg-navy text-white' : 'border-navy/15 text-navy'}`}>
            <Plus className="h-4 w-4" aria-hidden="true" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-btn`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-7 pr-12 leading-relaxed text-navy/70">{a}</p>
          </m.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="duvidas" aria-labelledby="duvidas-title" className="scroll-mt-20 bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-container gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <SectionHeading
            id="duvidas-title"
            eyebrow="Dúvidas frequentes"
            title="Tudo o que você precisa saber."
            description="Não encontrou a sua dúvida? Fale com a gente. Respondemos pelo WhatsApp."
          />
          <Reveal delay={0.1} className="mt-8">
            <ButtonLink href={whatsappUrl('Olá! Tenho uma dúvida sobre o serviço de higienização.')} external variant="secondary">
              <WhatsAppIcon className="h-4 w-4 text-[#1FA855]" /> Tirar uma dúvida
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal>
          <ul className="border-t border-navy/10">
            {faq.map((item, i) => (
              <FaqItem key={item.q} q={item.q} a={item.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
