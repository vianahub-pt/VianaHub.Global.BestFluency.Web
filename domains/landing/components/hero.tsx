import { MessageCircle } from "lucide-react";

import { type LocaleCode } from "@/core/config/locales";
import { getLandingContent } from "@/domains/landing/content";
import { Badge } from "@/shared/components/ui/badge";
import { buttonVariants } from "@/shared/components/ui/button";
import { RoutePath } from "@/shared/components/ui/route-path";
import { WhatsAppLink } from "@/shared/components/whatsapp-link";
import { cn } from "@/shared/lib/utils";

/**
 * Hero da landing (spec §8, imagem atualizada na issue #29).
 *
 * - eyebrow (Badge), H1 único, texto principal e texto complementar;
 * - CTA principal de WhatsApp "Marcar aula experimental" com mensagem
 *   contextual (spec §20), visível sem scroll em telemóveis comuns
 *   (360 / 390 / 412 px): o bloco de texto é compacto (text-3xl, espaços
 *   reduzidos) e o CTA vem imediatamente a seguir ao texto, antes da imagem;
 * - CTA secundário "Conhecer as modalidades" aponta para a âncora
 *   #modalidades (spec §8);
 * - painel visual da marca com o logótipo oficial `public/logo-160.webp`
 *   (mais a variante retina logo-320.webp via srcSet, gerada por
 *   scripts/optimize-images.mjs): dimensões explícitas, `fetchPriority="high"`
 *   para o LCP e alt descritivo do contrato de conteúdo (hero.imageAlt);
 *   o painel neutro com brilho dourado adapta-se aos dois temas;
 * - elemento decorativo de rota discreto (RoutePath, aria-hidden);
 * - um único H1 por página: todas as restantes secções usam H2/H3;
 * - mobile-first (§24): uma coluna no telemóvel, duas colunas no desktop (lg);
 *   texto antes dos elementos decorativos.
 */
export function Hero({ locale }: { locale: LocaleCode }) {
  const hero = getLandingContent(locale).hero;

  return (
    <section aria-labelledby="hero-title" className="border-b border-border">
      <div className="mx-auto w-full max-w-7xl px-4 py-7 md:px-8 md:py-16 lg:py-24">
        <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Badge>{hero.eyebrow}</Badge>
            <h1
              id="hero-title"
              className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl"
            >
              {hero.title}
            </h1>
            <p className="mt-3 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {hero.text}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground sm:mt-3 sm:text-base sm:leading-7">
              {hero.complement}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
              <WhatsAppLink
                message={hero.ctaWhatsappMessage}
                section="hero"
                ctaLabel={hero.ctaLabel}
                ariaLabel={hero.ctaAriaLabel}
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" }),
                  "w-full sm:w-auto",
                )}
              >
                <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                {hero.ctaLabel}
              </WhatsAppLink>
              <a
                href="#modalidades"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full sm:w-auto",
                )}
              >
                {hero.secondaryCtaLabel}
              </a>
            </div>
          </div>

          <div className="mt-12 lg:mt-0">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-muted/40">
              {/* Brilho dourado discreto da marca (decorativo). */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(212,175,55,0.18),transparent_55%)]"
              />
              <div className="relative flex aspect-[4/3] items-center justify-center p-8">
                {/* eslint-disable-next-line @next/next/no-img-element -- srcSet responsivo não é suportado por next/image com images.unoptimized (spec §25); fetchPriority alto mantém o logótipo como LCP. */}
                <img
                  src="/logo-160.webp"
                  srcSet="/logo-160.webp 160w, /logo-320.webp 320w"
                  sizes="160px"
                  alt={hero.imageAlt}
                  width={160}
                  height={160}
                  fetchPriority="high"
                  className="h-36 w-36 rounded-full object-cover shadow-lg ring-1 ring-border sm:h-40 sm:w-40"
                />
              </div>
            </div>
            <RoutePath orientation="horizontal" className="mt-6 max-w-xs" />
          </div>
        </div>
      </div>
    </section>
  );
}
