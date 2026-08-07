import { MessageCircle, Plane } from "lucide-react";

import { type LocaleCode } from "@/core/config/locales";
import { getLandingContent } from "@/domains/landing/content";
import { buttonVariants } from "@/shared/components/ui/button";
import { RoutePath } from "@/shared/components/ui/route-path";
import { WhatsAppLink } from "@/shared/components/whatsapp-link";
import { cn } from "@/shared/lib/utils";

/**
 * CTA final — cartão de embarque premium (spec §18).
 *
 * - eyebrow + H2 + texto + informação complementar exata do contrato;
 * - um único CTA principal de WhatsApp com a mensagem da spec §18;
 * - conceito de cartão de embarque: fundo de alto contraste com papéis
 *   cromáticos invertidos (bg-foreground / text-background), linha pontilhada
 *   (border-dashed), avião em traço fino (Plane) e selo discreto;
 *   RoutePath decorativo discreto;
 * - contraste AA nos dois temas (text-background/75 para textos secundários).
 */
export function FinalCta({ locale }: { locale: LocaleCode }) {
  const content = getLandingContent(locale);
  const { finalCta } = content;

  return (
    <section
      id="cta-final"
      aria-labelledby="final-cta-title"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <div className="relative overflow-hidden rounded-2xl bg-foreground px-5 py-12 text-background sm:px-10 md:px-16 md:py-16">
          {/* Detalhes decorativos do cartão de embarque (aria-hidden) */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <Plane
              className="absolute right-8 top-8 h-10 w-10 text-background/20"
              strokeWidth={1.25}
            />
            <div className="absolute inset-x-0 top-0 border-t-2 border-dashed border-background/25" />
            <RoutePath
              orientation="horizontal"
              className="absolute bottom-10 left-6 w-40 opacity-60"
            />
          </div>

          <div className="relative mx-auto max-w-2xl text-center">
            <p className="inline-flex items-center rounded-full border border-background/25 bg-background/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-background">
              {finalCta.eyebrow}
            </p>
            <h2
              id="final-cta-title"
              className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl"
            >
              {finalCta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-background/75">
              {finalCta.text}
            </p>
            <div className="mt-8 flex justify-center">
              <WhatsAppLink
                message={finalCta.whatsappMessage}
                section="final_cta"
                ctaLabel={finalCta.ctaLabel}
                ariaLabel={finalCta.ctaAriaLabel}
                className={cn(
                  buttonVariants({ variant: "gold", size: "lg" }),
                  "w-full sm:w-auto",
                )}
              >
                <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                {finalCta.ctaLabel}
              </WhatsAppLink>
            </div>
            <p className="mt-5 text-sm font-medium text-background/75">
              {finalCta.complement}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
