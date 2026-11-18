import { Camera, ClipboardCheck, CalendarCheck, Sparkles } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';
import { ButtonLink } from './ui/Button';
import { WhatsAppIcon } from './ui/icons';
import { FabricPattern } from './ui/FabricPattern';
import { whatsappUrl } from '../lib/whatsapp';

const steps = [
  { icon: Camera, title: 'Envie uma foto', text: 'Mande pelo WhatsApp uma foto do estofado e conte o que precisa.' },
  { icon: ClipboardCheck, title: 'Avaliação e orçamento', text: 'Avaliamos o tecido e o estado da peça e enviamos um orçamento claro.' },
  { icon: CalendarCheck, title: 'Agende o atendimento', text: 'Combinamos o melhor dia e horário e vamos até o seu endereço.' },
  { icon: Sparkles, title: 'Serviço e orientações', text: 'Realizamos a higienização e passamos os cuidados para a secagem e conservação.' },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="como-title" className="relative overflow-hidden bg-navy py-24 text-white sm:py-32">
      <FabricPattern id="how-fabric" className="text-mist" opacity={0.04} />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full bg-gold/10 blur-3xl" />
      <div className="relative mx-auto max-w-container px-5 sm:px-8">
        <SectionHeading
          id="como-title"
          tone="light"
          eyebrow="Como funciona"
          title="Simples do primeiro contato ao resultado."
          description="Um processo direto e transparente, para você saber exatamente o que esperar."
        />

        <ol className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 0.1} className="relative lg:px-6 lg:first:pl-0 lg:last:pr-0">
              {i < steps.length - 1 && (
                <span aria-hidden="true" className="absolute left-[4.5rem] right-0 top-7 hidden h-px bg-gradient-to-r from-gold/60 to-white/10 lg:block" />
              )}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 lg:border-0 lg:bg-transparent lg:p-0">
                <div className="relative mb-7 flex items-center gap-4">
                  <span className="relative grid h-14 w-14 place-items-center rounded-full border border-gold/50 bg-navy text-gold-light">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="font-display text-sm font-semibold tracking-[0.2em] text-white/60 lg:hidden">
                    ETAPA {i + 1}
                  </span>
                </div>
                <p className="hidden font-display text-sm font-semibold tracking-[0.2em] text-white/60 lg:block">ETAPA {i + 1}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold">{title}</h3>
                <p className="mt-3 leading-relaxed text-mist/70">{text}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-16 flex flex-col items-start gap-4 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-2xl font-medium text-white/90">Comece agora: é só enviar uma foto.</p>
          <ButtonLink href={whatsappUrl('Olá! Quero enviar fotos do meu estofado para fazer um orçamento.')} external variant="light" size="lg">
            <WhatsAppIcon className="h-5 w-5 text-[#1FA855]" /> Enviar foto pelo WhatsApp
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
