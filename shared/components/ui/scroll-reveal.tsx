"use client";

import {
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";

import { cn } from "@/shared/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-left" | "fade-right" | "scale-in";
  delay?: number;
  threshold?: number;
  as?: ElementType;
}

/**
 * Wrapper que dispara animação CSS quando o elemento entra no viewport
 * e repete a cada reentrada (liga/desliga `.scroll-reveal-visible` conforme
 * `isIntersecting`). Usa Intersection Observer — sem dependências externas.
 * Respeita prefers-reduced-motion (animações desativadas via CSS global).
 *
 * O prop `as` permite renderizar como qualquer elemento (ex: `<li>` dentro
 * de `<ol>`) para manter semântica HTML válida.
 */
export function ScrollReveal({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  threshold = 0.15,
  as,
}: ScrollRevealProps) {
  const Tag = as ?? "div";
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.classList.add("scroll-reveal-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Religar a cada entrada na área de visão: ao sair remove a classe
        // (elemento volta a ficar oculto) e ao entrar adiciona de novo — a
        // transição CSS reinicia.
        el.classList.toggle("scroll-reveal-visible", entry.isIntersecting);
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={cn("scroll-reveal", `scroll-reveal-${animation}`, className)}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </Tag>
  );
}
