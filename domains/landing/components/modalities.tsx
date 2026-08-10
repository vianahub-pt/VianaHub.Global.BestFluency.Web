import { MessageCircle, User, Users } from "lucide-react";

import { type LocaleCode } from "@/core/config/locales";
import { getLandingContent } from "@/domains/landing/i18n";
import { buttonVariants } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { SectionHeading } from "@/shared/components/ui/section-heading";
import { WhatsAppLink } from "@/shared/components/whatsapp-link";
import { cn } from "@/shared/lib/utils";

/**
 * Secção de modalidades (spec §10).
 *
 * - H2 + introdução, dois cards empilhados no telemóvel e lado a lado no
 *   desktop (lg);
 * - CTA contextual de WhatsApp em cada card (section individual/group e
 *   modality individual/group para atribuição, spec §20);
 * - sem preços e sem afirmar disponibilidade imediata de turmas (spec §31):
 *   o card de turmas usa a nota exata "Sujeito à formação de turma e
 *   disponibilidade".
 */
export function Modalities({ locale }: { locale: LocaleCode }) {
  const content = getLandingContent(locale);
  const { individual, group } = content.modalities;

  return (
    <section
      id="modalidades"
      aria-labelledby="modalities-title"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <SectionHeading
          title={content.modalities.h2}
          titleId="modalities-title"
          intro={content.modalities.intro}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Card className="flex flex-col">
            <CardHeader>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 text-accent">
                <User className="h-5 w-5" aria-hidden="true" />
              </span>
              <CardTitle className="mt-2">{individual.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
              <p className="text-base leading-7 text-muted-foreground">
                {individual.text}
              </p>
              <p className="mt-4 inline-flex w-fit items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                {individual.note}
              </p>
              <div className="mt-6 flex flex-1 items-end">
                <WhatsAppLink
                  message={individual.whatsappMessage}
                  section="individual"
                  modality="individual"
                  ctaLabel={individual.ctaLabel}
                  ariaLabel={individual.ctaAriaLabel}
                  className={cn(
                    buttonVariants({ variant: "primary", size: "lg" }),
                    "w-full",
                  )}
                >
                  <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                  {individual.ctaLabel}
                </WhatsAppLink>
              </div>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Users className="h-5 w-5" aria-hidden="true" />
              </span>
              <CardTitle className="mt-2">{group.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
              <p className="text-base leading-7 text-muted-foreground">
                {group.text}
              </p>
              <p className="mt-4 inline-flex w-fit items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                {group.note}
              </p>
              <div className="mt-6 flex flex-1 items-end">
                <WhatsAppLink
                  message={group.whatsappMessage}
                  section="group"
                  modality="group"
                  ctaLabel={group.ctaLabel}
                  ariaLabel={group.ctaAriaLabel}
                  className={cn(
                    buttonVariants({ variant: "primary", size: "lg" }),
                    "w-full",
                  )}
                >
                  <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                  {group.ctaLabel}
                </WhatsAppLink>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
