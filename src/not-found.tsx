import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft } from 'lucide-react';
import { Providers } from './Providers';
import { Logo } from './components/Logo';
import { ButtonLink } from './components/ui/Button';
import { WhatsAppIcon } from './components/ui/icons';
import { FabricPattern } from './components/ui/FabricPattern';
import { whatsappUrl } from './lib/whatsapp';

function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-mist-50">
      <FabricPattern id="nf-fabric" className="text-navy" opacity={0.04} />
      <header className="relative mx-auto w-full max-w-container px-5 py-6 sm:px-8">
        <a href="/" className="inline-block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4">
          <Logo />
          <span className="sr-only"> – página inicial</span>
        </a>
      </header>
      <main className="relative mx-auto flex w-full max-w-container flex-1 flex-col justify-center px-5 pb-24 sm:px-8">
        <p className="font-display text-[7rem] font-bold leading-none text-transparent [-webkit-text-stroke:1.5px_#C9A24B] sm:text-[10rem]">404</p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-navy sm:text-5xl">Página não encontrada.</h1>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-navy/70">
          O endereço que você acessou não existe ou foi alterado. Volte para o início ou fale com a gente.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Voltar ao início
          </ButtonLink>
          <ButtonLink href={whatsappUrl()} external variant="secondary" size="lg">
            <WhatsAppIcon className="h-5 w-5 text-[#1FA855]" /> Falar no WhatsApp
          </ButtonLink>
        </div>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <NotFound />
    </Providers>
  </StrictMode>,
);
