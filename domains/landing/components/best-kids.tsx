import { MessageCircle } from "lucide-react";

import { type LocaleCode } from "@/core/config/locales";
import { getMessages } from "@/core/i18n";
import { buttonVariants } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ScrollReveal } from "@/shared/components/ui/scroll-reveal";
import { WhatsAppLink } from "@/shared/components/whatsapp-link";
import { cn } from "@/shared/lib/utils";

/**
 * Best Kids (spec §13, reorganizada na issue #29).
 *
 * - imagem real `public/assets/english-kids.jpg` (fonte), servida em WebP
 *   responsivo (480/960/1440, geradas por scripts/optimize-images.mjs) com
 *   dimensões explícitas, lazy loading (abaixo da dobra) e alt do contrato
 *   (bestKids.imageAlt);
 * - ordem visual (DOM = mobile): (1) imagem, (2) textos, (3) frase de
 *   destaque, (4) grelha de 4 diferenciais, (5) informações práticas,
 *   (6) CTA WhatsApp "Conhecer a Best Kids";
 * - desktop (lg): duas colunas — conteúdo à esquerda (textos, diferenciais
 *   e o card "Conhecer a Best Kids" imediatamente abaixo dos quatro cards)
 *   e imagem à direita;
 * - os diferenciais e o card de informação prática usam `bg-card` para se
 *   destacarem do fundo suave da secção (alternância de fundos da issue #29).
 */
export function BestKids({ locale }: { locale: LocaleCode }) {
  const content = getMessages(locale).landing;
  const { bestKids } = content;

  // Dynamic asset paths based on active locale
  const localeLower = locale.toLowerCase();
  const kidsBasePath = `/assets/${locale}/kids-${localeLower}`;

  return (
    <section
      id="bestKids"
      aria-labelledby="best-kids-title"
      className="flex min-h-dvh flex-col justify-center border-t border-border bg-gradient-to-b from-muted/40 to-accent/40"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-10">
          <div className="lg:order-1">
            <ScrollReveal animation="fade-left" delay={0.05}>
              <h2
                id="best-kids-title"
                className="font-title text-accent dark:text-white font-title font-bold tracking-tight text-balance
                text-2xl
                sm:text-3xl
                md:text-3xl
                lg:text-4xl"
              >
                {bestKids.h2}
              </h2>

              <div className="mt-4">
                {bestKids.text.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7 [&:not(:first-child)]:mt-3"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.15}>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {bestKids.differentials.map((item) => (
                  <li
                    key={item.title}
                    className="flex min-h-10 items-start gap-2.5 rounded-lg border border-border bg-card px-3 py-2.5 shadow-sm sm:gap-3"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold leading-5 sm:text-sm">
                        {item.title}
                      </span>
                      <span className="text-xs leading-5 text-muted-foreground">
                        {item.text}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.25}>
              <Card className="mt-4">
                <CardContent className="p-3 sm:p-4">
                  <ul className="grid gap-2">
                    {bestKids.practicalInfo.map((info) => (
                      <li
                        key={info}
                        className="flex min-h-6 items-center gap-2.5 text-xs font-medium leading-5 sm:text-sm sm:leading-6"
                      >
                        <span className="flex h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {info}
                      </li>
                    ))}
                  </ul>
                  <WhatsAppLink
                    message={bestKids.whatsappMessage}
                    section="best_kids"
                    modality="best_kids"
                    ctaLabel={bestKids.ctaLabel}
                    ariaLabel={bestKids.ctaAriaLabel}
                    className={cn(
                      buttonVariants({ variant: "destructive", size: "lg" }),
                      "mt-3 w-full",
                    )}
                  >
                    <MessageCircle
                      className="h-5 w-5 shrink-0"
                      aria-hidden="true"
                    />
                    {bestKids.ctaLabel}
                  </WhatsAppLink>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          <ScrollReveal animation="scale-in" delay={0.1} className="lg:order-2">
            <Card className="overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element -- Static export (output: "export"), assets pré-gerados em WebP, srcSet responsivo produzido pela pipeline de imagens, Next Image optimizer não existe em runtime (images.unoptimized: true) */}
              <img
                src={`${kidsBasePath}-960.webp`}
                srcSet={`${kidsBasePath}-480.webp 480w, ${kidsBasePath}-960.webp 960w, ${kidsBasePath}-1440.webp 1440w`}
                sizes="(min-width: 64rem) 560px, calc(100vw - 2rem)"
                alt={bestKids.imageAlt}
                width={960}
                height={1440}
                loading="lazy"
                decoding="async"
                className="h-auto w-full max-h-[75vh] object-cover"
              />
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
