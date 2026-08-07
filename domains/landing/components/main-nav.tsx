import type { LocaleCode } from "@/core/config/locales";
import { getLandingContent } from "@/domains/landing/content";

/**
 * Navegação principal por âncoras (spec §7).
 *
 * Links âncora contratuais para as secções comerciais da landing — os
 * elementos-alvo (#modalidades, #metodo, #best-kids, #depoimentos, #faq)
 * são entregues nas issues de implementação das secções do EPIC #1.
 *
 * Cada item tem área de toque ≥ 44 px, foco visível e fecha o menu móvel
 * ao navegar (`onNavigate`).
 */
const navItems = [
  { href: "#modalidades", key: "modalities" },
  { href: "#metodo", key: "method" },
  { href: "#best-kids", key: "bestKids" },
  { href: "#depoimentos", key: "testimonials" },
  { href: "#faq", key: "faq" },
] as const;

interface MainNavProps {
  locale: LocaleCode;
  ariaLabel?: string;
  onNavigate?: () => void;
  className?: string;
}

export function MainNav({
  locale,
  ariaLabel,
  onNavigate,
  className,
}: MainNavProps) {
  const content = getLandingContent(locale);
  const label = ariaLabel ?? content.nav.ariaLabel;

  return (
    <nav aria-label={label} className={className}>
      <ul className="flex flex-col gap-1 lg:flex-row lg:items-center">
        {navItems.map((item) => (
          <li key={item.key}>
            <a
              href={item.href}
              onClick={onNavigate}
              className="inline-flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {content.nav.links[item.key]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
