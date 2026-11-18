import type { LucideIcon } from 'lucide-react';
import { Sofa, BedDouble, Armchair, Car, Layers } from 'lucide-react';
import { ChairIcon, type IconComponent } from '../components/ui/icons';

export type Service = {
  id: string;
  title: string;
  /** Nome usado no formulário e na mensagem do WhatsApp */
  formLabel: string;
  /** Nome curto (rodapé) */
  shortTitle: string;
  description: string;
  icon: LucideIcon | IconComponent;
  /** Foto real do serviço em /public/images/servicos. Vazio = arte padrão da marca. */
  image: string;
  imageAlt: string;
};

export const services: Service[] = [
  {
    id: 'sofas',
    title: 'Higienização de sofás',
    formLabel: 'Sofá',
    shortTitle: 'Sofás',
    description:
      'Limpeza profunda do tecido, assento e encosto, removendo sujeiras acumuladas e manchas do dia a dia, com cuidado para cada tipo de tecido.',
    icon: Sofa,
    image: '',
    imageAlt: 'Sofá higienizado pela Simões Higienizações',
  },
  {
    id: 'colchoes',
    title: 'Higienização de colchões',
    formLabel: 'Colchão',
    shortTitle: 'Colchões',
    description:
      'Higienização das faces e laterais do colchão, ajudando a remover poeira, suor e marcas para um descanso mais confortável.',
    icon: BedDouble,
    image: '',
    imageAlt: 'Colchão higienizado pela Simões Higienizações',
  },
  {
    id: 'poltronas',
    title: 'Higienização de poltronas',
    formLabel: 'Poltrona',
    shortTitle: 'Poltronas',
    description:
      'Atenção a costuras, braços e detalhes, renovando a aparência das poltronas sem agredir o acabamento.',
    icon: Armchair,
    image: '',
    imageAlt: 'Poltrona higienizada pela Simões Higienizações',
  },
  {
    id: 'cadeiras',
    title: 'Higienização de cadeiras',
    formLabel: 'Cadeira',
    shortTitle: 'Cadeiras',
    description:
      'Cadeiras de jantar, escritório e estofadas em geral. Ideal para manter a mesa e o ambiente de trabalho sempre bem cuidados.',
    icon: ChairIcon,
    image: '',
    imageAlt: 'Cadeiras estofadas higienizadas pela Simões Higienizações',
  },
  {
    id: 'automotivos',
    title: 'Higienização de bancos automotivos',
    formLabel: 'Bancos automotivos',
    shortTitle: 'Bancos automotivos',
    description:
      'Higienização dos bancos do seu veículo, removendo sujeiras e marcas de uso para um interior mais agradável.',
    icon: Car,
    image: '',
    imageAlt: 'Bancos automotivos higienizados pela Simões Higienizações',
  },
  {
    id: 'tapetes',
    title: 'Higienização de tapetes',
    formLabel: 'Tapete',
    shortTitle: 'Tapetes',
    description:
      'Limpeza de tapetes no próprio local, com técnica adequada ao material para recuperar a aparência e a maciez.',
    icon: Layers,
    image: '',
    imageAlt: 'Tapete higienizado pela Simões Higienizações',
  },
];
