"use client";

import type { LandingContent } from "@/core/i18n";
import { cn } from "@/shared/lib/utils";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { href: "#home", key: "home" },
  { href: "#modalities", key: "modalities" },
  { href: "#method", key: "method" },
  { href: "#bestKids", key: "bestKids" },
  { href: "#testimonials", key: "testimonials" },
  { href: "#journey", key: "journey" },
  { href: "#founder", key: "founder" },
  { href: "#faq", key: "faq" },
] as const;

interface MainNavProps {
  nav: LandingContent["nav"];
  ariaLabel?: string;
  onNavigate?: () => void;
  className?: string;
}

export function MainNav({
  nav,
  ariaLabel,
  onNavigate,
  className,
}: MainNavProps) {
  const label = ariaLabel ?? nav.ariaLabel;
  const [activeId, setActiveId] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1));
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!elements.length) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      },
    );

    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const isActive = (href: string) => activeId === href.slice(1);

  return (
    <nav aria-label={label} className={className}>
      <ul className="flex flex-col gap-1 lg:flex-row lg:flex-nowrap lg:items-center lg:justify-center lg:gap-1">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <li key={item.key}>
              <a
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "inline-flex min-h-11 items-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:justify-center lg:px-2",
                  active
                    ? "bg-muted text-accent"
                    : "text-foreground hover:bg-muted hover:text-accent",
                )}
              >
                {nav.links[item.key]}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
