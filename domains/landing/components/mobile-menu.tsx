"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { LocaleCode } from "@/core/config/locales";
import { getLandingContent } from "@/domains/landing/content";
import { LocaleSwitcher } from "@/shared/components/locale/locale-switcher";
import { buttonVariants } from "@/shared/components/ui/button";
import { WhatsAppLink } from "@/shared/components/whatsapp-link";
import { cn } from "@/shared/lib/utils";

import { MainNav } from "./main-nav";

interface MobileMenuProps {
  locale: LocaleCode;
}

/**
 * Menu móvel acessível (spec §7 e §23).
 *
 * - botão real com `aria-expanded` e `aria-controls`;
 * - painel `id="mobile-menu"` controlado pelo botão;
 * - fecha ao selecionar uma âncora, com Escape ou ao clicar fora;
 * - foco movido para o primeiro link ao abrir e devolvido ao botão ao fechar;
 * - bloqueio de scroll de fundo enquanto aberto;
 * - área de toque ≥ 44 px em todos os elementos interativos;
 * - `prefers-reduced-motion` respeitado globalmente (globals.css).
 *
 * O painel também concentra o seletor de idiomas no telemóvel, mantendo o
 * header compacto (uma linha: logótipo + tema + menu) em 360 px.
 */
export function MobileMenu({ locale }: MobileMenuProps) {
  const content = getLandingContent(locale);
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setIsOpen(false);

  // Move o foco para o primeiro link do painel ao abrir.
  useEffect(() => {
    if (!isOpen) return;
    const firstLink = panelRef.current?.querySelector<HTMLAnchorElement>("a");
    firstLink?.focus();
  }, [isOpen]);

  // Bloqueia o scroll de fundo enquanto o menu está aberto.
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Fecha com Escape e devolve o foco ao botão.
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Fecha ao clicar/tocar fora do wrapper (botão + painel) e devolve o foco
  // ao botão. O wrapper inclui o botão de toggle, evitando o edge case em que
  // o pointerdown fecharia o menu e o click subsequente o reabriria.
  useEffect(() => {
    if (!isOpen) return;
    function handlePointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  return (
    // NOTA: o wrapper NÃO pode ser `relative` — o painel `absolute inset-x-0`
    // resolve o containing block no container `relative` do header
    // (largura total da viewport em mobile). Com `relative` aqui, o painel
    // mediria apenas a largura do botão (44 px) e os links/CTA quebrariam.
    <div ref={wrapperRef} className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? content.nav.closeMenuLabel : content.nav.menuLabel}
        className={buttonVariants({ variant: "outline", size: "icon" })}
      >
        {isOpen ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Menu className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      <div
        ref={panelRef}
        id="mobile-menu"
        className={cn(
          "absolute inset-x-0 top-full z-50 border-b border-border bg-background shadow-lg",
          !isOpen && "hidden",
        )}
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-4 md:px-8">
          <MainNav
            locale={locale}
            ariaLabel={content.nav.menuAriaLabel}
            onNavigate={closeMenu}
          />
          <div className="mt-4 border-t border-border pt-4">
            <LocaleSwitcher
              currentLocale={locale}
              label={content.a11y.languageSwitcherLabel}
            />
          </div>
          <WhatsAppLink
            message={content.nav.whatsappMessage}
            section="header"
            ctaLabel={content.nav.ctaLabel}
            ariaLabel={content.nav.ctaAriaLabel}
            className={cn(
              buttonVariants({ variant: "primary", size: "lg" }),
              "mt-4 w-full",
            )}
          >
            {content.nav.ctaLabel}
          </WhatsAppLink>
        </div>
      </div>
    </div>
  );
}
