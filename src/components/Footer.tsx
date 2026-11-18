import { ArrowUp, MapPin } from 'lucide-react';
import { Logo } from './Logo';
import { WhatsAppIcon, InstagramIcon } from './ui/icons';
import { navItems } from '../lib/nav';
import { services } from '../data/services';
import { site } from '../config/site';
import { whatsappUrl } from '../lib/whatsapp';

const linkCls = 'text-mist/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:text-gold-light';

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="mx-auto max-w-container px-5 pb-10 pt-20 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-mist/70">
              Higienização profissional de estofados em {site.city}-{site.state} e região do Vale do Jequitinhonha.
            </p>
            <div className="mt-6 flex gap-3">
              <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={`Instagram @${site.instagramUser}`} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition hover:border-gold hover:text-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition hover:border-gold hover:text-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                <WhatsAppIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <nav aria-label="Rodapé: navegação">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold-light">Navegação</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navItems.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className={linkCls}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold-light">Serviços</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.id}>
                  <a href="#servicos" className={linkCls}>{s.shortTitle}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold-light">Contato</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2.5 ${linkCls}`}>
                  <WhatsAppIcon className="h-4 w-4" /> {site.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2.5 ${linkCls}`}>
                  <InstagramIcon className="h-4 w-4" /> @{site.instagramUser}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-mist/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{site.city} - {site.state}<br />Atendimento na região mediante confirmação</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-6 border-t border-white/10 pt-8 text-xs text-mist/70 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {site.name}. Todos os direitos reservados.</p>
          <a href="#inicio" className={`inline-flex items-center gap-2 ${linkCls}`}>
            Voltar ao topo <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
