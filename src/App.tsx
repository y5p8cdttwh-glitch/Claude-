import { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Benefits } from './components/Benefits';
import { Services } from './components/Services';
import { Results } from './components/Results';
import { HowItWorks } from './components/HowItWorks';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials';
import { Faq } from './components/Faq';
import { QuoteForm } from './components/QuoteForm';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  // Links diretos para uma seção (ex.: /#servicos) rolam até ela após o carregamento
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'instant' }));
  }, []);

  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Benefits />
        <Services />
        <Results />
        <HowItWorks />
        <About />
        <Testimonials />
        <Faq />
        <QuoteForm />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
