/**
 * RESULTADOS REAIS — ANTES E DEPOIS
 * Adicione apenas fotos de atendimentos realizados pela Simões Higienizações.
 * Coloque os arquivos em /public/images/resultados e cadastre abaixo.
 *
 * Exemplo:
 * {
 *   id: 'sofa-retratil-cinza',
 *   title: 'Sofá retrátil',
 *   city: 'Itaobim',
 *   before: '/images/resultados/sofa-cinza-antes.webp',
 *   after: '/images/resultados/sofa-cinza-depois.webp',
 *   description: 'Sofá de 3 lugares com manchas de uso no assento.',
 * },
 *
 * Dica: tire as fotos do mesmo ângulo, distância e iluminação.
 */
export type Result = {
  id: string;
  title: string;
  city?: string;
  before: string;
  after: string;
  description?: string;
};

export const results: Result[] = [];
