import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { ButtonLink } from './ui/Button';
import { WhatsAppIcon, InstagramIcon } from './ui/icons';
import { navItems } from '../lib/nav';
import { site } from '../config/site';
import { whatsappUrl } from '../lib/whatsapp';

const sectionIds = navItems.map((n) => n.id);

function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

/** Rola até a seção e move o foco para ela (importante para teclado e leitores de tela). */
function goToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
  history.replaceState(null, '', `#${id}`);
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Menu aberto: trava a rolagem do fundo, foca o 1º link, Esc fecha e o Tab fica preso ao menu
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    menuRef.current?.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !menuRef.current || !toggleRef.current) return;
      const items = [toggleRef.current, ...menuRef.current.querySelectorAll<HTMLElement>('a[href], button')];
      const i = items.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) {
        e.preventDefault();
        items[items.length - 1].focus();
      } else if (!e.shiftKey && (i === -1 || i === items.length - 1)) {
        e.preventDefault();
        items[0].focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  // Rola até a seção escolhida no menu mobile somente depois que ele fecha
  useEffect(() => {
    if (open || !pending) return;
    requestAnimationFrame(() => goToSection(pending));
    setPending(null);
  }, [open, pending]);

  const navigate = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    if (open) {
      setPending(id);
      setOpen(false);
    } else {
      goToSection(id);
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
          scrolled || open ? 'border-navy/5 bg-white/90 backdrop-blur-xl' : 'border-transparent bg-transparent'
        }`}
      >
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Pular para o conteúdo
        </a>
        <div
          className={`mx-auto flex max-w-container items-center justify-between px-5 transition-[height] duration-500 sm:px-8 ${
            scrolled ? 'h-[4.25rem]' : 'h-20'
          }`}
        >
          <a
            href="#inicio"
            onClick={navigate('inicio')}
            className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4"
          >
            <Logo />
            <span className="sr-only"> – voltar ao início</span>
          </a>

          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={navigate(item.id)}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={`relative block rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                      active === item.id ? 'text-navy' : 'text-navy/70 hover:text-navy'
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-500 ${
                        active === item.id ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink
              href="#contato"
              onClick={navigate('contato')}
              size="md"
              className="hidden text-[0.72rem] uppercase tracking-[0.12em] sm:inline-flex"
            >
              Solicitar orçamento
            </ButtonLink>
            <button
              ref={toggleRef}
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full text-navy transition hover:bg-mist-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* O menu fica fora do <header>: o backdrop-filter do header quebraria o position: fixed */}
      <AnimatePresence>
        {open && (
          <m.div
            id="menu-mobile"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto overscroll-contain bg-white px-5 pb-10 pt-4 sm:px-8 lg:hidden"
            style={{ top: scrolled ? '4.25rem' : '5rem' }}
          >
            <nav aria-label="Navegação móvel">
              <ul className="divide-y divide-navy/5">
                {navItems.map((item, i) => (
                  <m.li
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.35 }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={navigate(item.id)}
                      aria-current={active === item.id ? 'true' : undefined}
                      className="flex items-center justify-between py-4 font-display text-2xl font-semibold text-navy decoration-gold decoration-2 underline-offset-8 focus-visible:text-gold-dark focus-visible:underline focus-visible:outline-none"
                    >
                      {item.label}
                      <ArrowRight className="h-5 w-5 text-gold" aria-hidden="true" />
                    </a>
                  </m.li>
                ))}
              </ul>
            </nav>
            <div className="mt-8 grid gap-3">
              <ButtonLink href="#contato" size="lg" onClick={navigate('contato')}>
                Solicitar orçamento
              </ButtonLink>
              <ButtonLink href={whatsappUrl()} external variant="secondary" size="lg">
                <WhatsAppIcon className="h-5 w-5 text-[#1FA855]" /> Falar no WhatsApp
              </ButtonLink>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 py-2 text-sm font-medium text-navy/70 hover:text-navy"
              >
                <InstagramIcon className="h-4 w-4" /> @{site.instagramUser}
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
