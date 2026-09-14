"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/shared/lib/utils";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: "top" | "bottom";
  className?: string;
}

/**
 * Tooltip CSS puro (sem dependência Radix) com suporte a hover, focus e toque.
 *
 * Mobile-first:
 * - max-width: calc(100vw - 32px) para não sair da viewport;
 * - posicionamento bottom no mobile para não ultrapassar o topo;
 * - touch: toggle no toque (tap para mostrar, tap novamente para fechar);
 * - focus: visível em focus via teclado;
 * - Escape fecha o tooltip;
 * - acessível: `role="tooltip"`, `aria-describedby`.
 */
export function Tooltip({ content, children, side = "top", className }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);
  const toggle = useCallback(() => setVisible((v) => !v), []);

  // Fechar ao clicar fora
  useEffect(() => {
    if (!visible) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        setVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [visible]);

  return (
    <span
      className={cn("relative inline-flex items-center", className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <span
        ref={triggerRef}
        tabIndex={0}
        role="button"
        aria-describedby={visible ? "tooltip-content" : undefined}
        className="inline-flex cursor-help items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Escape") hide();
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
      >
        {children}
      </span>
      {visible && (
        <span
          ref={tooltipRef}
          id="tooltip-content"
          role="tooltip"
          className={cn(
            "absolute z-50 rounded-md border border-border bg-popover px-3 py-2 text-xs leading-5 text-popover-foreground shadow-md",
            "max-w-[calc(100vw-32px)]",
            side === "top"
              ? "bottom-full left-1/2 mb-2 -translate-x-1/2"
              : "top-full left-1/2 mt-2 -translate-x-1/2",
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
}
