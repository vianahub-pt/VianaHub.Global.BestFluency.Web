import { MapPin, Phone } from "lucide-react";

import { type LocaleCode } from "@/core/config/locales";
import { site } from "@/core/config/site";
import { getLandingContent } from "@/domains/landing/i18n";
import { PhoneLink } from "@/shared/components/phone-link";
import { Card, CardContent } from "@/shared/components/ui/card";
import { SectionHeading } from "@/shared/components/ui/section-heading";

/**
 * Aulas presenciais na Venda Nova, Amadora (spec §12).
 *
 * - morada e telefone visíveis no HTML (fora do FAQ), a partir dos dados
 *   confirmados em core/config/site.ts;
 * - sem mapa incorporado (spec §12);
 * - CTA "Ver localização": o link definitivo do Google Maps ainda não foi
 *   fornecido/confirmado (spec §31 — URL definitiva do Google Maps pendente).
 *   Enquanto isso o CTA permanece OCULTO (evita link morto/404). Quando o
 *   URL for confirmado, adicionar `mapsUrl` em core/config/site.ts e
 *   renderizar o link com este mesmo layout.
 */
export function InPerson({ locale }: { locale: LocaleCode }) {
  const content = getLandingContent(locale);

  return (
    <section
      id="presencial"
      aria-labelledby="in-person-title"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <SectionHeading title={content.inPerson.h2} titleId="in-person-title" />

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">
          <div>
            {content.inPerson.text.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-7 text-muted-foreground first:mt-0 [&:not(:first-child)]:mt-4"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <Card className="h-full">
            <CardContent className="p-6">
              <div className="flex gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <address className="flex flex-col gap-1 text-sm not-italic leading-6">
                  <span className="font-semibold text-foreground">
                    {site.address.venue}
                  </span>
                  <span className="text-muted-foreground">
                    {site.address.street}
                  </span>
                  <span className="text-muted-foreground">
                    {site.address.locality}
                  </span>
                </address>
              </div>
              <div className="mt-5 flex gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <PhoneLink
                  href={`tel:${site.phoneHref}`}
                  section="in_person"
                  className="inline-flex min-h-11 items-center rounded-md text-sm font-semibold underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring hover:text-foreground hover:underline"
                >
                  {site.phoneDisplay}
                </PhoneLink>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
