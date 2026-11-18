export type QuoteData = {
  nome: string;
  cidade: string;
  tipo: string;
  quantidade: string;
  data: string;
  periodo: string;
  observacoes: string;
};

export type QuoteErrors = Partial<Record<keyof QuoteData, string>>;

export const OBS_MAX = 500;

export function todayISO(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export function validateQuote(v: QuoteData): QuoteErrors {
  const e: QuoteErrors = {};
  const nome = v.nome.trim();
  if (!nome) e.nome = 'Informe seu nome.';
  else if (nome.length < 2) e.nome = 'O nome precisa ter pelo menos 2 letras.';
  else if (!/\p{L}/u.test(nome)) e.nome = 'Informe um nome válido.';

  const cidade = v.cidade.trim();
  if (!cidade) e.cidade = 'Informe sua cidade.';
  else if (cidade.length < 2) e.cidade = 'Informe uma cidade válida.';

  if (!v.tipo) e.tipo = 'Selecione o tipo de estofado.';

  const q = Number(v.quantidade);
  if (!v.quantidade) e.quantidade = 'Informe a quantidade.';
  else if (!Number.isInteger(q) || q < 1) e.quantidade = 'Use um número inteiro a partir de 1.';
  else if (q > 50) e.quantidade = 'Para mais de 50 peças, fale direto pelo WhatsApp.';

  if (v.data && v.data < todayISO()) e.data = 'Escolha uma data a partir de hoje.';
  if (v.observacoes.length > OBS_MAX) e.observacoes = `Use no máximo ${OBS_MAX} caracteres.`;
  return e;
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

export function buildQuoteMessage(v: QuoteData): string {
  const lines = [
    'Olá! Gostaria de solicitar um orçamento pelo site da Simões Higienizações.',
    '',
    `*Nome:* ${v.nome.trim()}`,
    `*Cidade:* ${v.cidade.trim()}`,
    `*Estofado:* ${v.tipo}`,
    `*Quantidade:* ${Number(v.quantidade)}`,
  ];
  if (v.data || v.periodo) {
    const parts = [v.data && formatDate(v.data), v.periodo && v.periodo.toLowerCase()].filter(Boolean);
    lines.push(`*Preferência de data:* ${parts.join(', ')}`);
  }
  if (v.observacoes.trim()) lines.push(`*Observações:* ${v.observacoes.trim()}`);
  lines.push('', 'Posso enviar fotos do estofado por aqui.');
  return lines.join('\n');
}
