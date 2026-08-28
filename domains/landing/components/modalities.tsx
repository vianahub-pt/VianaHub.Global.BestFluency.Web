import { MessageCircle, User, Users } from "lucide-react";
import Image from "next/image";

import { type LocaleCode } from "@/core/config/locales";
import { getMessages } from "@/core/i18n";
import { buttonVariants } from "@/shared/components/ui/button";
import { ScrollReveal } from "@/shared/components/ui/scroll-reveal";
import { WhatsAppLink } from "@/shared/components/whatsapp-link";
import { cn } from "@/shared/lib/utils";

/**
 * Secção de modalidades (spec §10).
 *
 * - H2 + introdução, dois blocos lado a lado no desktop (sm:grid-cols-2);
 * - cada modalidade (individual / grupo) é uma coluna fluida com: ícone + título,
 *   texto descritivo, nota, imagem e CTA próprio de WhatsApp — sem Card,
 *   distribuição mais fluida;
 * - CTA contextual de WhatsApp em cada coluna (section e modality para
 *   atribuição, spec §20);
 * - sem preços e sem afirmar disponibilidade imediata de turmas (spec §31).
 */
export function Modalities({ locale }: { locale: LocaleCode }) {
  const content = getMessages(locale).landing;
  const { individual, group } = content.modalities;

  return (
    <section
      id="modalities"
      aria-labelledby="modalities-title"
      className="flex min-h-dvh flex-col justify-center border-t border-border bg-muted/40"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="lg:order-1">
          <ScrollReveal animation="fade-up" delay={0.05}>
            <h2
              id="modalities-title"
              className="font-title text-accent dark:text-white font-title font-bold tracking-tight text-balance
                text-2xl
                sm:text-3xl
                md:text-3xl
                lg:text-4xl"
            >
              {content.modalities.h2}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              {content.modalities.intro}
            </p>
          </ScrollReveal>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-10 lg:gap-12">
          {/* Coluna: aula individual */}
          <ScrollReveal animation="fade-left" delay={0.1}>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2.5">
                <User
                  className="h-5 w-5 shrink-0 text-accent sm:h-6 sm:w-6"
                  aria-hidden="true"
                />
                <h3 className="font-title text-lg font-bold tracking-tight text-foreground sm:text-xl md:text-2xl">
                  {individual.title}
                </h3>
              </div>

              <p className="text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                {individual.text}
              </p>

              <p className="text-xs italic leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                {individual.note}
              </p>

              <div className="mt-auto">
                {/* eslint-disable-next-line @next/next/no-img-element -- static export, assets pré-gerados em WebP com srcSet responsivo, next/image não suporta srcSet com unoptimized */}
                <img
                  src="/online-classes-1000.webp"
                  srcSet="/online-classes-1000.webp 1000w, /online-classes-1600.webp 1600w"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  alt={individual.imageAlt}
                  width={1000}
                  height={562}
                  loading="lazy"
                  decoding="async"
                  className="h-48 w-full rounded-2xl border border-border object-cover sm:h-56 md:h-64"
                />
              </div>

              <div className="mt-2 flex justify-center">
                <WhatsAppLink
                  message={individual.whatsappMessage}
                  section="individual"
                  modality="individual"
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
          </ScrollReveal>

          {/* Coluna: aula em grupo */}
          <ScrollReveal animation="fade-right" delay={0.1}>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2.5">
                <Users
                  className="h-5 w-5 shrink-0 text-accent sm:h-6 sm:w-6"
                  aria-hidden="true"
                />
                <h3 className="font-title text-lg font-bold tracking-tight text-foreground sm:text-xl md:text-2xl">
                  {group.title}
                </h3>
              </div>

              <p className="text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                {group.text}
              </p>

              <p className="text-xs italic leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                {group.note}
              </p>

              <div className="mt-auto">
                <Image
                  src="/in-person.jpg"
                  alt={group.imageAlt}
                  width={400}
                  height={300}
                  loading="lazy"
                  className="h-48 w-full rounded-2xl border border-border object-cover sm:h-56 md:h-64"
                />
              </div>

              <div className="mt-2 flex justify-center">
                <WhatsAppLink
                  message={group.whatsappMessage}
                  section="group"
                  modality="group"
                  ctaLabel={group.ctaLabel}
                  ariaLabel={group.ctaAriaLabel}
                  className={cn(
                    buttonVariants({ variant: "orange", size: "lg" }),
                    "w-full sm:w-auto",
                  )}
                >
                  <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                  {group.ctaLabel}
                </WhatsAppLink>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
