/**
 * DEPOIMENTOS REAIS
 * Cadastre somente avaliações verdadeiras, com autorização do cliente.
 *
 * Exemplo:
 * {
 *   name: 'Maria S.',
 *   city: 'Itaobim',
 *   service: 'Higienização de sofá',
 *   text: 'Texto do cliente, exatamente como ele escreveu.',
 *   source: 'WhatsApp',          // ou 'Instagram', 'Google'
 * },
 */
export type Testimonial = {
  name: string;
  city?: string;
  service?: string;
  text: string;
  source?: string;
};

export const testimonials: Testimonial[] = [];
