import { BookOpen, Gamepad2, MessageCircle, Music, Palette, Sparkles } from "lucide-react";

import { type LocaleCode } from "@/core/config/locales";
import { getLandingContent } from "@/domains/landing/content";
import { buttonVariants } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { SectionHeading } from "@/shared/components/ui/section-heading";
import { WhatsAppLink } from "@/shared/components/whatsapp-link";
import { cn } from "@/shared/lib/utils";

/**
 * Best Kids (spec §13).
 *
 * - textos, frase de destaque, 4 diferenciais e informação prática
 *   (6–13 anos, presencial Venda Nova/Amadora, online, turmas por idade/nível);
 * - CTA WhatsApp contextual "Conhecer a Best Kids";
 * - o asset real da Faísca ainda não foi fornecido (spec §30 — pendente):
 *   enquanto isso, o espaço visual usa um placeholder ABSTRATO (formas
 *   geométricas em preto/branco/dourado, sem crianças e sem rostos).
 *   Quando `public/assets/brand/faisca.webp` for fornecido, substituir o bloco
 *   abaixo por <Image> com o alt do contrato (bestKids.imageAlt).
 */
export function BestKids({ locale }: { locale: LocaleCode }) {
  const content = getLandingContent(locale);
  const { bestKids } = content;

  return (
    <section
      id="best-kids"
      aria-labelledby="best-kids-title"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <SectionHeading title={bestKids.h2} titleId="best-kids-title" />

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div>
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
                  className="flex min-h-12 items-start gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3"
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
          </div>

          <div className="flex flex-col gap-6">
            <Card className="overflow-hidden">
              {/* Placeholder abstrato (sem crianças/rostos) até o asset da Faísca. */}
              <div
                aria-hidden="true"
                className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-foreground"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(212,175,55,0.25),transparent_55%)]" />
                <div className="grid grid-cols-3 gap-4 p-6 opacity-80">
                  <Gamepad2 className="h-9 w-9 text-accent" strokeWidth={1.5} />
                  <Music className="h-9 w-9 text-accent" strokeWidth={1.5} />
                  <Palette className="h-9 w-9 text-accent" strokeWidth={1.5} />
                  <BookOpen className="h-9 w-9 text-accent" strokeWidth={1.5} />
                  <Sparkles className="h-9 w-9 text-accent" strokeWidth={1.5} />
                  <Sparkles className="h-9 w-9 text-accent/50" strokeWidth={1.5} />
                </div>
              </div>
            </Card>

            <Card>
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
                  <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
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
