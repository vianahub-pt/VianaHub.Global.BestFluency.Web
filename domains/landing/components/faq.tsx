"use client";

import { MessageCircle, Minus, Plus } from "lucide-react";
import { useState } from "react";

import type { LandingContent } from "@/core/i18n";
import { buttonVariants } from "@/shared/components/ui/button";
import { ScrollReveal } from "@/shared/components/ui/scroll-reveal";
import { WhatsAppLink } from "@/shared/components/whatsapp-link";
import { cn } from "@/shared/lib/utils";

/**
 * FAQ em accordion acessível (spec §17).
 *
 * Comportamento:
 * - todas as respostas fechadas inicialmente;
 * - apenas uma resposta aberta de cada vez (accordion "exclusive");
 * - botão real por pergunta, com `aria-expanded` e `aria-controls`;
 * - painel com `role="region"` e `aria-labelledby` para o respetivo botão;
 * - foco visível (herdado do design system) e área de toque ≥ 44 px;
 * - ícone `+` fechado e `−` aberto;
 * - animação curta apenas com `motion-safe` (grid-template-rows 0fr→1fr);
 * - sem scroll automático — a expansão empilha naturalmente, sem
 *   deslocamento inesperado da página.
 *
 * Conteúdo em HTML renderizado (não apenas JavaScript): as respostas vivem
 * no DOM desde o primeiro render (collapsed), cumprindo a spec §17.
 *
 * Layout em duas colunas: a primeira pergunta ocupa a coluna esquerda e as
 * restantes ocupam a coluna direita, de modo a não sobrecarregar a área
 * visível do utilizador.
 *
 * Client Component: recebe o namespace `faq` por props (serializado pelo
 * Server Component pai) — os dicionários de `core/i18n` não entram no
 * bundle client.
 */
export function Faq({ content: faq }: { content: LandingContent["faq"] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  const renderItem = (item: (typeof faq.items)[number], index: number) => {
    const isOpen = openIndex === index;
    const buttonId = `faq-trigger-${index}`;
    const panelId = `faq-panel-${index}`;

    return (
      <div
        key={item.question}
        className="rounded-lg border border-border bg-card shadow-sm"
      >
        <h3>
          <button
            id={buttonId}
            type="button"
            onClick={() => toggle(index)}
            aria-expanded={isOpen}
            aria-controls={panelId}
            className="flex min-h-11 w-full items-center justify-between gap-3 rounded-lg px-3.5 py-2.5 text-left text-xs font-semibold leading-5 text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:min-h-12 sm:gap-4 sm:px-4 sm:py-3 sm:text-sm sm:leading-6"
          >
            {item.question}
            <span
              aria-hidden="true"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent sm:h-8 sm:w-8"
            >
              {isOpen ? (
                <Minus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              ) : (
                <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              )}
            </span>
          </button>
        </h3>

        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className={cn(
            "grid motion-safe:transition-[grid-template-rows] motion-safe:duration-200 motion-safe:ease-out",
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
          {...(!isOpen && { "aria-hidden": true })}
        >
          <div className="overflow-hidden">
            <p className="px-3.5 pb-4 text-xs leading-5 text-muted-foreground sm:px-4 sm:pb-5 sm:text-sm sm:leading-6">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="flex min-h-dvh flex-col justify-center border-t border-border bg-gradient-to-b from-muted/40 to-accent/40"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <ScrollReveal animation="fade-up" delay={0.05}>
          <h2
            id="faq-title"
            className="font-title text-accent dark:text-white font-title font-bold tracking-tight text-balance
                text-2xl
                sm:text-3xl
                md:text-3xl
                lg:text-4xl"
          >
            {faq.h2}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            {faq.subtitle}
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.15}>
          <div className="mt-8 grid gap-2.5 sm:mt-10 sm:grid-cols-2 sm:gap-3">
            <div className="flex flex-col gap-2.5 sm:gap-3">
              {faq.items
                .slice(0, 2)
                .map((item, index) => renderItem(item, index))}
            </div>
            <div className="flex flex-col gap-2.5 sm:gap-3">
              {faq.items
                .slice(2, 4)
                .map((item, index) => renderItem(item, index + 2))}
            </div>
            <div className="grid w-full gap-2.5 sm:col-span-2 sm:grid-cols-2 sm:gap-3">
              {faq.items
                .slice(4)
                .map((item, index) => renderItem(item, index + 4))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.25} className="mt-10 flex justify-center sm:mt-12">
          <WhatsAppLink
            message={faq.whatsappMessage}
            section="faq"
            ctaLabel={faq.ctaLabel}
            ariaLabel={faq.ctaAriaLabel}
            className={cn(
              buttonVariants({ variant: "orange", size: "lg" }),
              "w-full sm:w-auto",
            )}
          >
            <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
            {faq.ctaLabel}
          </WhatsAppLink>
        </ScrollReveal>
      </div>
    </section>
  );
}
