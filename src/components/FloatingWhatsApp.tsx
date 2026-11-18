import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { WhatsAppIcon } from './ui/icons';
import { whatsappUrl } from '../lib/whatsapp';

export function FloatingWhatsApp() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById('contato');
      const inContact = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.6 && contact.getBoundingClientRect().bottom > 0 : false;
      setShow(window.scrollY > 640 && !inContact);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <m.a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Solicitar orçamento pelo WhatsApp"
          data-cta="flutuante"
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-5 right-5 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-[#128041] px-4 font-semibold text-white shadow-lift transition-colors hover:bg-[#0E6A35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 sm:bottom-8 sm:right-8 sm:px-5"
        >
          <WhatsAppIcon className="h-6 w-6" />
          <span className="hidden text-sm sm:inline">Orçamento</span>
        </m.a>
      )}
    </AnimatePresence>
  );
}
