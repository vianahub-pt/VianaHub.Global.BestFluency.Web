"use client";

import { MessageCircle, Minus, Plus } from "lucide-react";
import { useState } from "react";

import type { LandingContent } from "@/core/i18n";
import { buttonVariants } from "@/shared/components/ui/button";
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
            className="flex min-h-12 w-full items-center justify-between gap-4 rounded-lg px-4 py-3 text-left text-sm font-semibold leading-6 text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:px-5"
          >
            {item.question}
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent"
            >
              {isOpen ? (
                <Minus className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
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
          aria-hidden={!isOpen}
        >
          <div className="overflow-hidden">
            <p className="px-4 pb-5 text-sm leading-6 text-muted-foreground sm:px-5">
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
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <h2
          id="faq-title"
          className="font-title text-accent dark:text-white font-title font-bold tracking-tight text-balance
              sm:text-2xl
              md:text-3xl
              lg:text-4xl"
        >
          {faq.h2}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-7 text-muted-foreground">
          {faq.subtitle}
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-3">
            {faq.items
              .slice(0, 2)
              .map((item, index) => renderItem(item, index))}
          </div>
          <div className="flex flex-col gap-3">
            {faq.items
              .slice(2, 4)
              .map((item, index) => renderItem(item, index + 2))}
          </div>
          <div className="grid w-full gap-3 sm:col-span-2 sm:grid-cols-2">
            {faq.items
              .slice(4)
              .map((item, index) => renderItem(item, index + 4))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
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
        </div>
      </div>
    </section>
  );
}
