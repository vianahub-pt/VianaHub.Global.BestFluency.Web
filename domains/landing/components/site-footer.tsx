import type { LocaleCode } from "@/core/config/locales";
import { site } from "@/core/config/site";
import { getLandingContent } from "@/domains/landing/i18n";
import { PhoneLink } from "@/shared/components/phone-link";
import { WhatsAppLink } from "@/shared/components/whatsapp-link";

/**
 * Footer (spec §19).
 *
 * - logótipo + nome; morada; telefone clicável (tel:); WhatsApp com mensagem
 *   automática; ano atual e direitos reservados;
 * - Política de Privacidade e Política de Cookies: os itens são exibidos,
 *   mas ainda NÃO são links — o conteúdo legal está pendente (spec §31,
 *   "dados legais para Política de Privacidade") e as páginas não existem.
 *   Quando forem publicadas, transformar os spans em <Link> para as rotas
 *   definitivas;
 * - sem redes sociais: URLs ainda não confirmados (spec §31).
 */
export function SiteFooter({ locale }: { locale: LocaleCode }) {
  const content = getLandingContent(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
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
            <p className="text-base font-semibold">{site.name}</p>
          </div>

          <address className="flex flex-col gap-1 text-sm not-italic leading-7 text-muted-foreground">
            <span className="font-semibold text-foreground">
              {site.address.venue}
            </span>
            <span>{site.address.street}</span>
            <span>{site.address.locality}</span>
            <PhoneLink
              href={`tel:${site.phoneHref}`}
              section="footer"
              className="inline-flex min-h-11 w-fit items-center rounded-md font-semibold text-foreground underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring hover:text-foreground hover:underline"
            >
              {site.phoneDisplay}
            </PhoneLink>
            <WhatsAppLink
              message={content.cta.whatsappMessage}
              section="footer"
              ctaLabel={content.footer.whatsappLabel}
              ariaLabel={content.cta.whatsappAriaLabel}
              className="inline-flex min-h-11 w-fit items-center rounded-md font-semibold text-foreground underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring hover:text-foreground hover:underline"
            >
              {content.footer.whatsappLabel}
            </WhatsAppLink>
          </address>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {year} {site.name}. {content.footer.rightsReserved}
          </p>
          {/*
           * Política de Privacidade / Cookies: rótulos exibidos sem link até
           * o conteúdo legal ser publicado (spec §31). NÃO são links — evita
           * rotas 404 para páginas inexistentes.
           */}
          <p className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span aria-disabled="true" className="cursor-default opacity-80">
              {content.footer.privacyPolicy}
            </span>
            <span aria-disabled="true" className="cursor-default opacity-80">
              {content.footer.cookiesPolicy}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
