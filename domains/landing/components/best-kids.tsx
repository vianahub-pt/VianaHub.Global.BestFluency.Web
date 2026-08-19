import { MessageCircle } from "lucide-react";

import { type LocaleCode } from "@/core/config/locales";
import { getMessages } from "@/core/i18n";
import { buttonVariants } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
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
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-10">
          <div className="lg:order-1">
            <h2
              id="best-kids-title"
              className="font-title text-accent dark:text-white font-title font-bold tracking-tight text-balance
              sm:text-2xl
              md:text-3xl
              lg:text-4xl"
            >
              {bestKids.h2}
            </h2>

            <div className="mt-5">
              {bestKids.text.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-7 text-muted-foreground [&:not(:first-child)]:mt-3"
                >
                  {paragraph}
                </p>
              ))}

              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {bestKids.differentials.map((item) => (
                  <li
                    key={item.title}
                    className="flex min-h-10 items-start gap-3 rounded-lg border border-border bg-card px-3 py-2 shadow-sm"
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

              <Card className="mt-4">
                <CardContent className="p-4">
                  <ul className="grid gap-2">
                    {bestKids.practicalInfo.map((info) => (
                      <li
                        key={info}
                        className="flex min-h-6 items-center gap-3 text-sm font-medium leading-6"
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
                      buttonVariants({ variant: "destructive", size: "lg" }),
                      "mt-2 w-full",
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

          <div className="lg:order-2">
            <Card className="overflow-hidden">
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
          </div>
        </div>
      </div>
    </section>
  );
}
