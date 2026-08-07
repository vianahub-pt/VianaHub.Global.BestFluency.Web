import { site } from "@/core/config/site";

/**
 * Constrói o link oficial do WhatsApp (spec §20):
 * https://wa.me/<número>?text=<mensagem codificada>
 */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
