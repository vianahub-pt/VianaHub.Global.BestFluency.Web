import { getLocale, type LocaleCode } from "@/core/config/locales";
import { site } from "@/core/config/site";
import { getLandingContent } from "@/domains/landing/content";
import { WhatsAppLink } from "@/shared/components/whatsapp-link";

/**
 * Footer da fase de fundação com os dados confirmados (spec §19).
 * Política de Privacidade, Política de Cookies e links sociais entram
 * quando os respetivos conteúdos/URLs forem confirmados.
 */
export function SiteFooter({ locale }: { locale: LocaleCode }) {
  const content = getLandingContent(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8">
        <p className="text-base font-semibold">{site.name}</p>
        <address className="mt-4 text-sm not-italic leading-7 text-muted-foreground">
          {site.address.venue}
          <br />
          {site.address.street}
          <br />
          {site.address.locality}
          <br />
          <a
            href={`tel:${site.phoneHref}`}
            className="inline-flex min-h-11 items-center underline-offset-4 hover:text-foreground hover:underline"
          >
            {site.phoneDisplay}
          </a>
          <br />
          <WhatsAppLink
            message={content.cta.whatsappMessage}
            section="footer"
            ctaLabel="WhatsApp"
            ariaLabel={content.cta.whatsappAriaLabel}
            className="inline-flex min-h-11 items-center underline-offset-4 hover:text-foreground hover:underline"
          >
            WhatsApp
          </WhatsAppLink>
        </address>
        <p className="mt-6 text-xs text-muted-foreground">
          © {year} {site.name}. {content.footer.rightsReserved}
        </p>
      </div>
    </footer>
  );
}
