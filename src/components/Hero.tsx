import { m } from 'framer-motion';
import { ArrowDown, MapPin, Camera, Home, Sparkles } from 'lucide-react';
import { ButtonLink } from './ui/Button';
import { WhatsAppIcon } from './ui/icons';
import { FabricPattern } from './ui/FabricPattern';
import { site } from '../config/site';
import { whatsappUrl } from '../lib/whatsapp';

const ease = [0.22, 1, 0.36, 1] as const;

const highlights = [
  { icon: Home, text: 'Atendimento no seu endereço' },
  { icon: Camera, text: 'Orçamento a partir de fotos' },
  { icon: Sparkles, text: 'Cuidado com cada tipo de tecido' },
];

function HeroMedia() {
  if (site.heroVideo) {
    return (
      <video
        className="h-full w-full object-cover"
        src={site.heroVideo}
        poster={site.heroImage || undefined}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={site.heroAlt}
      />
    );
  }
  if (site.heroImage) {
    return (
      <img
        className="h-full w-full object-cover"
        src={site.heroImage}
        alt={site.heroAlt}
        {...{ fetchpriority: 'high' }}
        decoding="async"
        width={960}
        height={1200}
      />
    );
  }
  // Arte padrão da marca, exibida até a foto/vídeo real ser adicionada.
  const items = ['Sofás', 'Colchões', 'Poltronas', 'Cadeiras', 'Bancos automotivos', 'Tapetes'];
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-navy p-8 pb-28 text-white sm:p-10 sm:pb-32">
      <FabricPattern id="hero-fabric" className="text-mist" opacity={0.08} />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-mist/10 blur-3xl" />
      <span className="relative text-xs font-semibold uppercase tracking-[0.28em] text-gold-light">
        {site.city} · {site.state}
      </span>
      <span aria-hidden="true" className="relative mt-auto block font-display text-[8rem] font-bold leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_#C9A24B] sm:text-[10rem]">
        S
      </span>
      <p className="relative mt-6 max-w-[18rem] font-display text-2xl font-medium leading-tight text-white/90 sm:text-[1.7rem]">
        Conforto renovado, cuidado em cada detalhe.
      </p>
      <ul className="relative mt-6 flex flex-wrap gap-2" aria-label="Estofados atendidos">
        {items.map((t) => (
          <li key={t} className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-mist/80">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem] bg-gradient-to-b from-mist-100 via-mist-50 to-white" />
      <div className="mx-auto grid max-w-container items-center gap-14 px-5 pb-20 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10 xl:gap-14 lg:pb-28">
        <div>
          <m.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/70 px-4 py-2 text-xs font-medium text-navy/80 backdrop-blur"
          >
            <MapPin className="h-3.5 w-3.5 text-gold-dark" aria-hidden="true" />
            Itaobim e região do Vale do Jequitinhonha
          </m.p>

          <m.h1
            id="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            className="font-display text-[2.75rem] font-semibold leading-[0.98] tracking-tight text-navy sm:text-6xl lg:text-[4.6rem]"
          >
            Seu estofado merece um cuidado <span className="relative whitespace-nowrap text-navy-600">profissional<span aria-hidden="true" className="absolute -bottom-1 left-0 h-[3px] w-full origin-left bg-gold/80" /></span>.
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-navy/70"
          >
            Higienização de estofados em Itaobim e região, com atenção aos detalhes para renovar o conforto do seu ambiente.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <ButtonLink href={whatsappUrl()} external size="lg" className="sm:whitespace-nowrap lg:px-6" data-cta="hero-whatsapp">
              <WhatsAppIcon className="h-5 w-5" />
              Solicitar orçamento pelo WhatsApp
            </ButtonLink>
            <ButtonLink href="#servicos" variant="secondary" size="lg" className="sm:whitespace-nowrap lg:px-6">
              Conhecer nossos serviços
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </ButtonLink>
          </m.div>

          <m.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-12 grid gap-4 border-t border-navy/10 pt-8 sm:grid-cols-3"
          >
            {highlights.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm font-medium leading-snug text-navy/80">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" aria-hidden="true" />
                {text}
              </li>
            ))}
          </m.ul>
        </div>

        <m.div
          initial={{ opacity: 0, scale: 0.97, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-navy/5">
            <HeroMedia />
          </div>
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease }}
            className="absolute -bottom-6 -left-3 flex max-w-[17rem] items-center gap-3 rounded-2xl bg-white p-4 shadow-lift ring-1 ring-navy/5 sm:-left-8"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#E8F7EE] text-[#1FA855]">
              <WhatsAppIcon className="h-5 w-5" />
            </span>
            <p className="text-sm leading-snug text-navy/80">
              <strong className="block font-semibold text-navy">Envie uma foto</strong>
              e receba seu orçamento pelo WhatsApp.
            </p>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
