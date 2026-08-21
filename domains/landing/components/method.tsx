import { MessageCircle } from "lucide-react";
import Image from "next/image";

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
 * - Ilustração `method-1.jpg` central, sem animação de float (simplificada);
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
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="lg:order-1">
          <h2
            id="method-title"
            className="font-title text-accent dark:text-white font-title font-bold tracking-tight text-balance
            sm:text-2xl
            md:text-3xl
            lg:text-4xl"
          >
            {method.h2}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            {method.intro}
          </p>
        </div>

        {/* Illustration + Pillars layout */}
        <div className="mt-12 grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left column: pillars 1 & 2 */}
          <div className="flex flex-col gap-10">
            {pillars.slice(0, 2).map((pillar, i) => (
              <ScrollReveal
                key={pillar.title}
                animation="fade-left"
                delay={0.1 + i * 0.15}
              >
                <div className="flex items-start gap-4 text-left">
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
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
            <Image
              src="/method.jpg"
              alt=""
              width={600}
              height={500}
              loading="lazy"
              decoding="async"
              className="h-auto w-full max-w-lg object-contain"
              aria-hidden="true"
            />
          </ScrollReveal>

          {/* Right column: pillars 3 & 4 */}
          <div className="flex flex-col gap-10 lg:col-span-2 lg:flex-row lg:justify-center lg:gap-20">
            {pillars.slice(2, 4).map((pillar, i) => (
              <ScrollReveal
                key={pillar.title}
                animation="fade-right"
                delay={0.1 + i * 0.15}
                className="lg:w-1/2"
              >
                <div className="flex items-start gap-4 text-right flex-row-reverse">
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
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
          className="mt-14 flex justify-center"
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
