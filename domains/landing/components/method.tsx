import { MessageCircle } from "lucide-react";

import { type LocaleCode } from "@/core/config/locales";
import { getMessages } from "@/core/i18n";
import { buttonVariants } from "@/shared/components/ui/button";
import { ScrollReveal } from "@/shared/components/ui/scroll-reveal";
import { WhatsAppLink } from "@/shared/components/whatsapp-link";
import { cn } from "@/shared/lib/utils";

/**
 * Como começar (spec §16).
 *
 * - H2 + subtítulo alinhados com o padrão das outras secções (font-title,
 *   text-accent dark:text-white, sizing responsivo sm/md/lg);
 * - Introdução + ilustração central + 4 pilares numerados em grelha 2-colunas
 *   (desktop) / empilhado (mobile);
 * - Ilustração `teacher-board` central com srcSet responsivo, sem animação
 *   de float (simplificada);
 * - CTA "Dar o primeiro passo" com variante orange, motion-safe.
 */
export function Method({ locale }: { locale: LocaleCode }) {
  const content = getMessages(locale).landing;
  const { method } = content.methods;

  const pillars = method.pillars as { title: string; text: string }[];

  return (
    <section
      id="method"
      aria-labelledby="method-title"
      className="flex min-h-dvh flex-col justify-center border-t border-border bg-accent/20"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="lg:order-1">
          <h2
            id="method-title"
            className="font-title text-accent dark:text-white font-title font-bold tracking-tight text-balance
            text-2xl
            sm:text-3xl
            md:text-3xl
            lg:text-4xl"
          >
            {method.h2}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            {method.intro}
          </p>
        </div>

        {/* Illustration + Pillars layout */}
        <div className="mt-10 grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left column: pillars 1 & 2 */}
          <div className="flex flex-col gap-8">
            {pillars.slice(0, 2).map((pillar, i) => (
              <ScrollReveal
                key={pillar.title}
                animation="fade-left"
                delay={0.1 + i * 0.15}
              >
                <div className="flex items-start gap-3 text-left sm:gap-4">
                  <div className="min-w-0">
                    <h3 className="text-base font-bold tracking-tight text-foreground sm:text-lg md:text-xl">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                      {pillar.text}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal
            animation="scale-in"
            delay={0.05}
            className="flex justify-center order-first lg:order-none"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, assets pré-gerados em WebP com srcSet responsivo, next/image não suporta srcSet com unoptimized */}
            <img
              src="/teacher-board-1000.webp"
              srcSet="/teacher-board-1000.webp 1000w, /teacher-board-1600.webp 1600w"
              sizes="(max-width: 768px) 100vw, 50vw"
              alt={method.imageAlt}
              width={1000}
              height={667}
              loading="lazy"
              decoding="async"
              className="h-48 w-full max-w-sm object-contain sm:h-56 md:h-64 lg:max-w-lg"
              aria-hidden="true"
            />
          </ScrollReveal>

          {/* Right column: pillars 3 & 4 */}
          <div className="flex flex-col gap-8 lg:col-span-2 lg:flex-row lg:justify-center lg:gap-20">
            {pillars.slice(2, 4).map((pillar, i) => (
              <ScrollReveal
                key={pillar.title}
                animation="fade-right"
                delay={0.1 + i * 0.15}
                className="lg:w-1/2"
              >
                <div className="flex items-start gap-3 text-right flex-row-reverse sm:gap-4">
                  <div className="min-w-0">
                    <h3 className="text-base font-bold tracking-tight text-foreground sm:text-lg md:text-xl">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                      {pillar.text}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* CTA */}
        <ScrollReveal
          animation="fade-up"
          delay={0.3}
          className="mt-10 flex justify-center sm:mt-14"
        >
          <WhatsAppLink
            message={method.whatsappMessage}
            section="method"
            ctaLabel={method.ctaLabel}
            ariaLabel={method.ctaAriaLabel}
            className={cn(
              buttonVariants({ variant: "orange", size: "lg" }),
              "w-full sm:w-auto",
            )}
          >
            <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
            {method.ctaLabel}
          </WhatsAppLink>
        </ScrollReveal>
      </div>
    </section>
  );
}
