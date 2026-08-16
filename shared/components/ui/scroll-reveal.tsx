"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-left" | "fade-right" | "scale-in";
  delay?: number;
  threshold?: number;
}

/**
 * Wrapper que dispara animação CSS quando o elemento entra no viewport.
 * Usa Intersection Observer — sem dependências externas.
 * Respeita prefers-reduced-motion (animações desativadas via CSS global).
 */
export function ScrollReveal({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

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
        if (entry.isIntersecting) {
          el.classList.add("scroll-reveal-visible");
          observer.unobserve(el);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={cn("scroll-reveal", `scroll-reveal-${animation}`, className)}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
