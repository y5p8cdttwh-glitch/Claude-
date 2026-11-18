import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';
import { FabricPattern } from './ui/FabricPattern';
import { WhatsAppIcon } from './ui/icons';
import { services, type Service } from '../data/services';
import { serviceMessage, whatsappUrl } from '../lib/whatsapp';

function ServiceVisual({ service, index }: { service: Service; index: number }) {
  if (service.image) {
    return (
      <img
        src={service.image}
        alt={service.imageAlt}
        loading="lazy"
        decoding="async"
        width={800}
        height={600}
        className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
      />
    );
  }
  const Icon = service.icon;
  const tones = ['from-mist-200 to-mist-50', 'from-mist-100 to-white', 'from-mist-300/70 to-mist-100'];
  return (
    <div className={`relative grid h-full w-full place-items-center bg-gradient-to-br ${tones[index % tones.length]}`}>
      <FabricPattern id={`fab-${service.id}`} className="text-navy" opacity={0.06} />
      <span className="relative grid h-24 w-24 place-items-center rounded-full bg-white/80 shadow-soft ring-1 ring-gold/30 backdrop-blur transition-transform duration-700 ease-out group-hover:scale-105">
        <Icon className="h-10 w-10 text-navy" strokeWidth={1.3} aria-hidden="true" />
      </span>
    </div>
  );
}

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="scroll-mt-20 bg-mist-50 py-24 sm:py-32">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="servicos-title"
            eyebrow="Serviços"
            title="Higienização para cada estofado da sua casa."
            description="Escolha o serviço e fale direto com a gente. Atendemos no seu endereço, com hora marcada."
          />
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal as="li" key={service.id} delay={(i % 3) * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-soft ring-1 ring-navy/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ServiceVisual service={service} index={i} />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-[1.4rem] font-semibold leading-tight text-navy">{service.title}</h3>
                  <p className="mt-3 flex-1 text-[0.94rem] leading-relaxed text-navy/65">{service.description}</p>
                  <a
                    href={whatsappUrl(serviceMessage(service.title))}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta={`servico-${service.id}`}
                    className="mt-7 inline-flex items-center justify-between gap-3 rounded-full border border-navy/10 py-2.5 pl-5 pr-2.5 text-sm font-semibold text-navy transition-all duration-300 hover:border-navy hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                    aria-label={`Solicitar orçamento de ${service.title.toLowerCase()} pelo WhatsApp`}
                  >
                    <span className="inline-flex items-center gap-2">
                      <WhatsAppIcon className="h-4 w-4" />
                      Solicitar orçamento
                    </span>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-mist-100 text-navy transition-all duration-300 group-hover:bg-gold group-hover:text-navy-900">
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
