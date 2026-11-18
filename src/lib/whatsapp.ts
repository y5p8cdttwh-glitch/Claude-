import { site } from '../config/site';

export const DEFAULT_MESSAGE =
  'Olá! Vim pelo site da Simões Higienizações e gostaria de solicitar um orçamento.';

export function whatsappUrl(message: string = DEFAULT_MESSAGE): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function serviceMessage(serviceName: string): string {
  return `Olá! Vim pelo site e gostaria de um orçamento para ${serviceName.toLowerCase()}. Posso enviar fotos?`;
}

/**
 * Abre o WhatsApp em nova aba. Se o navegador bloquear a nova janela,
 * abre na mesma aba. Retorna a URL usada (para o link alternativo).
 * Obs.: não usar "noopener" em window.open — com ele o retorno é sempre null.
 */
export function openWhatsApp(message: string): string {
  const url = whatsappUrl(message);
  const win = window.open(url, '_blank');
  if (win) win.opener = null;
  else window.location.href = url;
  return url;
}
