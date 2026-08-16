import { MessageCircle, User, Users } from "lucide-react";

import Image from "next/image";
import { type LocaleCode } from "@/core/config/locales";
import { getMessages } from "@/core/i18n";
import { buttonVariants } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
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
  const content = getMessages(locale).landing;
  const { individual, group } = content.modalities;

  return (
    <section
      id="modalidades"
      aria-labelledby="modalities-title"
      className="flex min-h-dvh flex-col justify-center border-t border-border bg-muted/40"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="lg:order-1">
          <h2
            id="best-kids-title"
            className="text-[#c2410c] dark:text-[#c2410c] font-display text-2xl font-bold tracking-tight text-balance sm:text-3xl"
          >
            {content.modalities.h2}
          </h2>
          <div className="mt-5">{content.modalities.intro}</div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:gap-8">
          <Card className="flex flex-col">
            <CardHeader>
              <span className="flex items-center justify-center border-b border-border pb-2 text-accent">
                <CardTitle className="mt-2">{individual.title}</CardTitle>
              </span>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
              <p className="text-base leading-7 text-muted-foreground">
                {individual.text}
              </p>
              <div className="mt-10 flex justify-center">
                <Image
                  src="/online-classes.jpg"
                  alt="Teste"
                  width={400}
                  height={400}
                  loading="lazy"
                  className="h-auto w-full max-w-sm rounded-2xl border border-border object-cover"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <span className="flex items-center justify-center border-b border-border pb-2 text-accent">
                <CardTitle className="mt-2">{group.title}</CardTitle>
              </span>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
              <p className="text-base leading-7 text-muted-foreground">
                {group.text}
              </p>
              <div className="mt-10 flex justify-center">
                <Image
                  src="/in-person.jpg"
                  alt="Teste"
                  width={400}
                  height={400}
                  loading="lazy"
                  className="h-auto w-full max-w-sm rounded-2xl border border-border object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 flex justify-center">
          <WhatsAppLink
            message={individual.whatsappMessage}
            section="testimonials"
            ctaLabel={individual.ctaLabel}
            ariaLabel={individual.ctaAriaLabel}
            className={cn(
              buttonVariants({ variant: "orange", size: "lg" }),
              "w-full sm:w-auto",
            )}
          >
            <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
            {individual.ctaLabel}
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
