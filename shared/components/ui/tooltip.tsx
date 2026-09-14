"use client";

import { useState, useCallback } from "react";
import { cn } from "@/shared/lib/utils";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: "top" | "bottom";
  className?: string;
}

/**
 * Tooltip CSS puro (sem dependência Radix) com suporte a hover e focus.
 *
 * - `content`: texto/nó a mostrar no tooltip;
 * - `children`: trigger (deve ser um elemento focável ou encapsulado num focável);
 * - `side`: posição preferencial ("top" por omissão);
 * - visível em hover e focus via teclado;
 * - acessível: `role="tooltip"`, `aria-describedby`, `tabIndex={0}` no trigger.
 */
export function Tooltip({ content, children, side = "top", className }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);

  return (
    <span
      className={cn("relative inline-flex items-center", className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <span
        tabIndex={0}
        role="button"
        aria-describedby="tooltip-content"
        className="inline-flex cursor-help items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        onKeyDown={(e) => {
          if (e.key === "Escape") hide();
        }}
      >
        {children}
      </span>
      {visible && (
        <span
          id="tooltip-content"
          role="tooltip"
          className={cn(
            "absolute z-50 max-w-xs rounded-md border border-border bg-popover px-3 py-2 text-xs leading-5 text-popover-foreground shadow-md",
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
