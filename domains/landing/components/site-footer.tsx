import type { LocaleCode } from "@/core/config/locales";
import { site } from "@/core/config/site";
import { getMessages } from "@/core/i18n";
import { PhoneLink } from "@/shared/components/phone-link";
import { WhatsAppLink } from "@/shared/components/whatsapp-link";

/**
 * Mapa de navegação do site para o footer — usa as âncoras de
 * secção definidas no spec §7 (ver main-nav.tsx).
 */
const siteMapItems = [
  { href: "#modalities", key: "modalities" },
  { href: "#method", key: "method" },
  { href: "#bestKids", key: "bestKids" },
  { href: "#testimonials", key: "testimonials" },
  { href: "#founder", key: "founder" },
  { href: "#journey", key: "journey" },
  { href: "#faq", key: "faq" },
] as const;

/**
 * Footer (spec §19).
 *
 * - Fundo preto profundo com tipografia clara;
 * - 3 colunas no desktop (Marca | Mapa do Site | Contactos),
 *   empilhadas no mobile;
 * - Mapa do Site: links âncora para todas as secções comerciais;
 * - Contactos: morada, telefone e WhatsApp com eventos de analytics;
 * - Barra inferior: copyright + links legais (Política de Privacidade /
 *   Política de Cookies) — ainda não são links (spec §31).
 */
export function SiteFooter({ locale }: { locale: LocaleCode }) {
  const content = getMessages(locale).landing;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-black">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:py-16 md:px-8">
        {/* Grid: 3 colunas desktop, empilhado mobile */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Coluna: Marca */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element -- srcSet responsivo não é suportado por next/image com images.unoptimized (spec §25). */}
              <img
                src="/logo-160.webp"
                srcSet="/logo-80.webp 80w, /logo-160.webp 160w"
                sizes="40px"
                alt=""
                width={160}
                height={160}
                loading="lazy"
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="text-xl font-bold text-accent">
                {site.shortName}
              </span>
            </div>
            <p className="max-w-xs text-sm text-white">
              {content.foundation.eyebrow}
            </p>
          </div>

          {/* Coluna: Mapa do Site */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-accent">
              {content.footer.siteMap}
            </h3>
            <ul className="flex flex-col gap-2">
              {siteMapItems.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    className="text-sm text-white transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {content.nav.links[item.key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna: Contactos */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-accent">
              {content.footer.contact}
            </h3>
            <address className="flex flex-col gap-2 text-sm not-italic text-white">
              <span className="font-medium text-white">
                {site.address.venue}
              </span>
              <span>{site.address.street}</span>
              <span>{site.address.locality}</span>
            </address>

            <PhoneLink
              href={`tel:${site.phoneHref}`}
              section="footer"
              className="text-sm text-white underline underline-offset-4 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {site.phoneDisplay}
            </PhoneLink>

            <WhatsAppLink
              message={content.cta.whatsappMessage}
              section="footer"
              ctaLabel={content.footer.whatsappLabel}
              ariaLabel={content.cta.whatsappAriaLabel}
              className="text-sm text-white underline underline-offset-4 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {content.footer.whatsappLabel}
            </WhatsAppLink>
          </div>
        </div>

        {/* Barra inferior: copyright + legais */}
        <div className="mt-12 border-t border-border pt-6 flex flex-col gap-4 text-xs text-accent sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {content.footer.rightsReserved}
          </p>
          {/*
           * Política de Privacidade / Cookies: rótulos exibidos sem link até
           * o conteúdo legal ser publicado (spec §31). NÃO são links — evita
           * rotas 404 para páginas inexistentes.
           */}
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <span
              aria-disabled="true"
              className="cursor-default opacity-80 text-accent"
            >
              {content.footer.privacyPolicy}
            </span>
            <span aria-disabled="true" className="cursor-default opacity-80">
              {content.footer.cookiesPolicy}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
