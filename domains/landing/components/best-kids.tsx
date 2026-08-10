import { MessageCircle } from "lucide-react";

import { type LocaleCode } from "@/core/config/locales";
import { getLandingContent } from "@/domains/landing/i18n";
import { buttonVariants } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { SectionHeading } from "@/shared/components/ui/section-heading";
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
  const content = getLandingContent(locale);
  const { bestKids } = content;

  return (
    <section
      id="best-kids"
      aria-labelledby="best-kids-title"
      className="scroll-mt-24 border-t border-border bg-muted/40"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <SectionHeading title={bestKids.h2} titleId="best-kids-title" />

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
          {/*
           * Imagem real Best Kids: primeiro elemento no DOM (topo no mobile),
           * coluna direita no desktop (lg:order-2).
           */}
          <div className="lg:order-2">
            <Card className="overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element -- srcSet responsivo não é suportado por next/image com images.unoptimized (spec §25); variantes WebP geradas na pipeline de assets. */}
              <img
                src="/assets/pt-BR/kids-pt-br-960.webp"
                srcSet="/assets/pt-BR/kids-pt-br-480.webp 480w, /assets/pt-BR/kids-pt-br-960.webp 960w, /assets/pt-BR/kids-pt-br-1440.webp 1440w"
                sizes="(min-width: 64rem) 560px, calc(100vw - 2rem)"
                alt={bestKids.imageAlt}
                width={960}
                height={1440}
                loading="lazy"
                decoding="async"
                className="h-auto w-full object-cover"
              />
            </Card>
          </div>

          <div className="lg:order-1">
            {bestKids.text.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-7 text-muted-foreground [&:not(:first-child)]:mt-4"
              >
                {paragraph}
              </p>
            ))}

            <p className="mt-6 text-lg font-semibold leading-8 text-accent">
              {bestKids.highlight}
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {bestKids.differentials.map((item) => (
                <li
                  key={item.title}
                  className="flex min-h-12 items-start gap-3 rounded-lg border border-border bg-card px-4 py-3 shadow-sm"
                >
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <span className="flex flex-col gap-1">
                    <span className="text-sm font-semibold leading-5">
                      {item.title}
                    </span>
                    <span className="text-xs leading-5 text-muted-foreground">
                      {item.text}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            {/*
             * Card "Conhecer a Best Kids": à esquerda, imediatamente abaixo
             * dos quatro cards de diferenciais (issue #29).
             */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <ul className="grid gap-2.5">
                  {bestKids.practicalInfo.map((info) => (
                    <li
                      key={info}
                      className="flex min-h-11 items-center gap-3 text-sm font-medium leading-6"
                    >
                      <span className="flex h-2 w-2 shrink-0 rounded-full bg-accent" />
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
                    buttonVariants({ variant: "primary", size: "lg" }),
                    "mt-6 w-full",
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
          </div>
        </div>
      </div>
    </section>
  );
}
