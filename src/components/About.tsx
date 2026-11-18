import { HeartHandshake, BadgeCheck, Eye, Gem } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';
import { FabricPattern } from './ui/FabricPattern';
import { site } from '../config/site';

const values = [
  { icon: HeartHandshake, title: 'Atendimento próximo', text: 'Ouvimos o que você precisa e explicamos cada etapa do serviço.' },
  { icon: BadgeCheck, title: 'Compromisso', text: 'Pontualidade no horário combinado e capricho do início ao fim.' },
  { icon: Eye, title: 'Transparência', text: 'Orçamento claro antes do serviço, sem cobranças inesperadas.' },
  { icon: Gem, title: 'Cuidado com cada peça', text: 'Respeito ao tecido, ao acabamento e ao seu ambiente.' },
];

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="scroll-mt-20 bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-container items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <div className="relative aspect-[5/6] overflow-hidden rounded-[2rem] shadow-lift">
            {site.aboutImage ? (
              <img src={site.aboutImage} alt={site.aboutAlt} loading="lazy" decoding="async" className="h-full w-full object-cover" width={900} height={1080} />
            ) : (
              <div className="relative flex h-full w-full flex-col justify-end bg-gradient-to-br from-mist-200 via-mist-100 to-white p-10">
                <FabricPattern id="about-fabric" className="text-navy" opacity={0.06} />
                <span aria-hidden="true" className="absolute right-8 top-6 font-display text-[10rem] font-bold leading-none text-navy/[0.06]">
                  S
                </span>
                <div className="relative max-w-sm">
                  <span aria-hidden="true" className="mb-4 block h-px w-12 bg-gold" />
                  <p className="font-display text-3xl font-medium leading-tight text-navy">
                    Cuidar do seu estofado é cuidar do lugar onde a sua família vive.
                  </p>
                </div>
              </div>
            )}
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            id="sobre-title"
            eyebrow="Sobre nós"
            title="Uma empresa de Itaobim que trata cada atendimento com atenção."
          />
          <Reveal delay={0.1} className="mt-6 space-y-4 text-lg leading-relaxed text-navy/70">
            <p>
              A Simões Higienizações é especializada na higienização profissional de estofados: sofás, colchões, poltronas,
              cadeiras, bancos automotivos e tapetes. Atendemos famílias, casas com crianças e animais de estimação, e todos
              que valorizam um ambiente limpo e confortável.
            </p>
            <p>
              Nosso trabalho começa ouvindo você e avaliando cada peça. Explicamos o que pode ser feito, passamos um
              orçamento transparente e vamos até o seu endereço para realizar o serviço com cuidado e organização.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={0.15 + i * 0.05} className="flex gap-4">
                <Icon className="mt-1 h-5 w-5 shrink-0 text-gold-dark" strokeWidth={1.6} aria-hidden="true" />
                <div>
                  <h3 className="font-display text-lg font-semibold text-navy">{title}</h3>
                  <p className="mt-1 text-[0.94rem] leading-relaxed text-navy/65">{text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
