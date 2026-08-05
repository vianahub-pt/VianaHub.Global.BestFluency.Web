import { MessageCircle } from "lucide-react";

import { type LocaleCode } from "@/core/config/locales";
import { site } from "@/core/config/site";
import { getLandingContent } from "@/domains/landing/content";
import { WhatsAppLink } from "@/shared/components/whatsapp-link";

import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

/**
 * Página de fundação (issue #3).
 *
 * Valida toda a arquitetura static-first — rotas por idioma, <html lang>,
 * canonical/hreflang, temas, i18n sem fallback, JSON-LD, analytics e CTA de
 * WhatsApp — sem implementar ainda as secções comerciais da especificação
 * V2, que são entregues nas issues subsequentes do EPIC #1.
 *
 * Mantém exatamente um H1 (a marca) e HTML semântico.
 */
export function FoundationPage({ locale }: { locale: LocaleCode }) {
  const content = getLandingContent(locale);

  return (
    <>
      <SiteHeader locale={locale} />
      <main
        id="main"
        className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 md:px-8 md:py-24"
      >
        <section aria-labelledby="page-title">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {content.foundation.eyebrow}
          </p>
          <h1
            id="page-title"
            className="mt-4 text-4xl font-bold tracking-tight text-balance md:text-5xl"
          >
            {site.name}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {content.foundation.notice}
          </p>
          <p className="mt-10">
            <WhatsAppLink
              message={content.cta.whatsappMessage}
              section="foundation"
              ctaLabel={content.cta.whatsappLabel}
              ariaLabel={content.cta.whatsappAriaLabel}
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              {content.cta.whatsappLabel}
            </WhatsAppLink>
          </p>
        </section>

        <section
          aria-labelledby="contacts-title"
          className="mt-16 border-t border-border pt-10"
        >
          <h2 id="contacts-title" className="text-xl font-semibold">
            {content.foundation.contactsTitle}
          </h2>
          <address className="mt-4 text-sm not-italic leading-7 text-muted-foreground">
            <span className="font-medium text-foreground">
              {site.address.venue}
            </span>
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
          </address>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
