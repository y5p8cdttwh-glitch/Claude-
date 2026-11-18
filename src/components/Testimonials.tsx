import { Quote, MessageSquareHeart } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';
import { ButtonLink } from './ui/Button';
import { WhatsAppIcon } from './ui/icons';
import { testimonials } from '../data/testimonials';
import { whatsappUrl } from '../lib/whatsapp';

const reviewMessage = 'Olá! Já fui atendido(a) pela Simões Higienizações e gostaria de deixar minha avaliação: ';

export function Testimonials() {
  return (
    <section aria-labelledby="depoimentos-title" className="bg-mist-50 py-24 sm:py-32">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <SectionHeading
          id="depoimentos-title"
          align="center"
          eyebrow="Depoimentos"
          title="A opinião de quem já recebeu nosso cuidado."
        />

        {testimonials.length === 0 ? (
          <Reveal className="mx-auto mt-12 max-w-2xl rounded-[2rem] bg-white p-10 text-center shadow-soft ring-1 ring-navy/5 sm:p-12">
            <MessageSquareHeart className="mx-auto mb-5 h-9 w-9 text-gold-dark" strokeWidth={1.4} aria-hidden="true" />
            <h3 className="font-display text-2xl font-semibold text-navy">Espaço reservado para avaliações reais</h3>
            <p className="mx-auto mt-3 max-w-md leading-relaxed text-navy/65">
              Publicamos aqui somente depoimentos verdadeiros de clientes. Já foi atendido por nós? Conte como foi a sua experiência.
            </p>
            <ButtonLink href={whatsappUrl(reviewMessage)} external variant="secondary" size="lg" className="mt-8">
              <WhatsAppIcon className="h-5 w-5 text-[#1FA855]" /> Enviar minha avaliação
            </ButtonLink>
          </Reveal>
        ) : (
          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal as="li" key={`${t.name}-${i}`} delay={(i % 3) * 0.08}>
                <figure className="flex h-full flex-col rounded-[1.75rem] bg-white p-8 shadow-soft ring-1 ring-navy/5">
                  <Quote className="h-7 w-7 text-gold" aria-hidden="true" />
                  <blockquote className="mt-5 flex-1 leading-relaxed text-navy/80">“{t.text}”</blockquote>
                  <figcaption className="mt-7 border-t border-navy/5 pt-5">
                    <p className="font-display text-lg font-semibold text-navy">{t.name}</p>
                    <p className="text-sm text-navy/65">
                      {[t.service, t.city, t.source && `via ${t.source}`].filter(Boolean).join(' · ')}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
