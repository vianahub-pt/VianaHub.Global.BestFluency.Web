import { MessageCircle } from "lucide-react";

import { type LocaleCode } from "@/core/config/locales";
import { site } from "@/core/config/site";
import { getLandingContent } from "@/domains/landing/content";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import { RoutePath } from "@/shared/components/ui/route-path";
import { SectionHeading } from "@/shared/components/ui/section-heading";
import { buttonVariants } from "@/shared/components/ui/button";
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
 * A partir da issue #2 esta página usa os primitivos do design system
 * (Badge, Card, SectionHeading, RoutePath, Button) como demonstração viva
 * dos padrões: hierarquia, toque ≥ 44 px, temas claro/escuro e a direção
 * visual subtil de viagem (rota decorativa).
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
          <Badge>{content.foundation.eyebrow}</Badge>
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
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              {content.cta.whatsappLabel}
            </WhatsAppLink>
          </p>
          <RoutePath orientation="horizontal" className="mt-14 max-w-sm" />
        </section>

        <section
          aria-labelledby="contacts-title"
          className="mt-16 border-t border-border pt-10"
        >
          <SectionHeading
            title={content.foundation.contactsTitle}
            titleId="contacts-title"
          />
          <Card className="mt-6">
            <CardContent className="pt-6">
              <address className="text-sm not-italic leading-7 text-muted-foreground">
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
                  className="inline-flex min-h-11 items-center underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {site.phoneDisplay}
                </a>
              </address>
            </CardContent>
          </Card>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
