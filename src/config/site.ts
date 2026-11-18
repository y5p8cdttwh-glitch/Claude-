/**
 * CONFIGURAÇÃO CENTRAL DO SITE
 * Altere aqui contato, redes sociais, logo e mídias principais.
 */
export const site = {
  name: 'Simões Higienizações',
  shortName: 'Simões',
  tagline: 'Higienização profissional de estofados',
  city: 'Itaobim',
  state: 'MG',
  serviceArea: 'Itaobim e cidades da região do Vale do Jequitinhonha, mediante confirmação',

  /** WhatsApp no formato internacional, apenas números: 55 + DDD + número */
  whatsappNumber: '5533997021704',
  /** Como o número aparece escrito no site */
  whatsappDisplay: '(33) 99702-1704',

  instagramUser: 'simoeshigienizacoes',
  instagramUrl: 'https://www.instagram.com/simoeshigienizacoes/',

  /**
   * Logo: coloque o arquivo em /public (ex.: /public/logo.svg ou /public/logo.png)
   * e informe o caminho abaixo. Enquanto estiver vazio, o site usa o logotipo tipográfico.
   */
  logoSrc: '',
  /** Versão clara da logo (para o rodapé azul-marinho). Opcional. */
  logoLightSrc: '',

  /**
   * Mídia do topo (hero). Use uma foto OU um vídeo real de atendimento.
   * Ex.: heroImage: '/images/hero/atendimento.webp'
   *      heroVideo: '/images/hero/atendimento.mp4' (curto, sem áudio, até ~4 MB)
   */
  heroImage: '',
  heroVideo: '',
  heroAlt: 'Profissional da Simões Higienizações realizando a higienização de um sofá',

  /** Foto da seção "Sobre" (opcional). Ex.: '/images/sobre/equipe.webp' */
  aboutImage: '',
  aboutAlt: 'Equipe da Simões Higienizações',
} as const;
