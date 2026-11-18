import { useState } from 'react';
import { Camera } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { Reveal } from './ui/Reveal';
import { ButtonLink } from './ui/Button';
import { InstagramIcon } from './ui/icons';
import { BeforeAfter } from './BeforeAfter';
import { results } from '../data/results';
import { site } from '../config/site';

function EmptyResults() {
  return (
    <Reveal className="mt-14">
      <div className="relative overflow-hidden rounded-[2rem] border border-dashed border-navy/15 bg-mist-50 px-6 py-16 text-center sm:px-12">
        <span className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-white shadow-soft ring-1 ring-gold/30">
          <Camera className="h-7 w-7 text-navy" strokeWidth={1.4} aria-hidden="true" />
        </span>
        <h3 className="font-display text-2xl font-semibold text-navy sm:text-3xl">Galeria de resultados em preparação</h3>
        <p className="mx-auto mt-3 max-w-lg leading-relaxed text-navy/65">
          Em breve você verá aqui fotos reais de antes e depois dos nossos atendimentos. Enquanto isso, acompanhe nosso trabalho no Instagram.
        </p>
        <ButtonLink href={site.instagramUrl} external variant="secondary" size="lg" className="mt-8">
          <InstagramIcon className="h-5 w-5" /> Ver @{site.instagramUser}
        </ButtonLink>
      </div>
    </Reveal>
  );
}

export function Results() {
  const [current, setCurrent] = useState(0);
  const item = results[current];

  return (
    <section id="resultados" aria-labelledby="resultados-title" className="scroll-mt-20 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <SectionHeading
          id="resultados-title"
          eyebrow="Antes e depois"
          title="Resultados reais dos nossos atendimentos."
          description={
            results.length
              ? 'Arraste o controle sobre a imagem para comparar. Todas as fotos são de atendimentos realizados pela Simões Higienizações.'
              : 'Aqui mostramos apenas fotos de atendimentos realizados por nós, sem montagens.'
          }
        />

        {!item ? (
          <EmptyResults />
        ) : (
          <div className="mt-14 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
            <Reveal>
              <BeforeAfter key={item.id} before={item.before} after={item.after} title={item.title} />
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                  {String(current + 1).padStart(2, '0')} / {String(results.length).padStart(2, '0')}
                </p>
                <h3 className="mt-3 font-display text-3xl font-semibold text-navy">{item.title}</h3>
                {item.city && <p className="mt-1 text-sm text-navy/65">{item.city}</p>}
                {item.description && <p className="mt-4 leading-relaxed text-navy/70">{item.description}</p>}

                {results.length > 1 && (
                  <ul className="mt-8 grid grid-cols-3 gap-3" aria-label="Escolher resultado">
                    {results.map((r, i) => (
                      <li key={r.id}>
                        <button
                          type="button"
                          onClick={() => setCurrent(i)}
                          aria-pressed={i === current}
                          aria-label={`Ver resultado: ${r.title}`}
                          className={`block aspect-square w-full overflow-hidden rounded-2xl ring-2 ring-offset-2 transition focus-visible:outline-none focus-visible:ring-gold ${
                            i === current ? 'ring-navy' : 'ring-transparent opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={r.after} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
