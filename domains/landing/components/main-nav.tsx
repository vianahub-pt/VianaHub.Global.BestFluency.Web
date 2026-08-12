import type { LandingContent } from "@/core/i18n";

/**
 * Navegação principal por âncoras (spec §7).
 *
 * Links âncora contratuais para as secções comerciais da landing — os
 * elementos-alvo (#modalidades, #metodo, #best-kids, #depoimentos, #faq)
 * são entregues nas issues de implementação das secções do EPIC #1.
 *
 * Cada item tem área de toque ≥ 44 px, foco visível e fecha o menu móvel
 * ao navegar (`onNavigate`).
 *
 * Recebe o namespace `nav` por props: é partilhado pelo SiteHeader (Server
 * Component) e pelo MobileMenu (Client Component), logo não pode importar
 * os dicionários de `core/i18n` (ficariam no bundle client).
 */
const navItems = [
  { href: "#modalidades", key: "modalities" },
  { href: "#metodo", key: "method" },
  { href: "#best-kids", key: "bestKids" },
  { href: "#depoimentos", key: "testimonials" },
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

  return (
    <nav aria-label={label} className={className}>
      <ul className="flex flex-col gap-1 lg:grid lg:grid-cols-[8.5rem_5rem_6rem_9.5rem_3.5rem] lg:items-center lg:gap-1">
        {navItems.map((item) => (
          <li key={item.key}>
            <a
              href={item.href}
              onClick={onNavigate}
              className="inline-flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:w-full lg:justify-center lg:px-2"
            >
              {nav.links[item.key]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
