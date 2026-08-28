import type { ReactNode } from "react";

import { getLocale, type LocaleCode } from "@/core/config/locales";
import { getMessages } from "@/core/i18n";
import { CloudflareWebAnalytics } from "@/shared/components/analytics/cloudflare-web-analytics";
import { ConsentManager } from "@/shared/components/analytics/consent-manager";
import { GoogleAnalytics } from "@/shared/components/analytics/google-analytics";
import { JsonLd } from "@/shared/components/seo/json-ld";
import { ScrollPreservation } from "@/shared/components/ui/scroll-preservation";
import { ThemeProvider } from "@/shared/components/theme/theme-provider";
import { buildOrganizationJsonLd } from "@/shared/lib/seo";
import { bodyFont } from "@/shared/styles/fonts";

/**
 * Inline script that runs before first paint to:
 * 1. Apply saved theme (avoids FOUC)
 * 2. Set --hero-bg CSS variable to the correct WebP variant
 * 3. Preload the hero LCP image
 *
 * This prevents both light+dark hero images from being downloaded —
 * only the variant matching the user's saved theme is loaded.
 */
const themeScript = `
(function(){
  try{
    var t=localStorage.getItem('theme');
    if(t==='dark'){document.documentElement.classList.add('dark')}
    else if(t==='light'){document.documentElement.classList.remove('dark')}
    else if(matchMedia('(prefers-color-scheme:dark)').matches){document.documentElement.classList.add('dark')}
  }catch(e){}
  var dk=document.documentElement.classList.contains('dark');
  var w=innerWidth;
  var img='/bg-hero-'+(dk?'gray':'color')+'-'+(w>=1024?'desktop':'mobile')+'.webp';
  var l=document.createElement('link');
  l.rel='preload';l.as='image';l.href=img;l.fetchPriority='high';
  document.head.appendChild(l);
})();`;

interface DocumentShellProps {
  locale: LocaleCode;
  children: ReactNode;
}

/**
 * Root layout partilhado por todos os idiomas através de app/[[...locale]].
 *
 * Garante <html lang> estático e correto por idioma no HTML exportado,
 * skip link acessível, tema claro/escuro, analytics e JSON-LD.
 *
 * Arquitetura de consentimento:
 * - Cloudflare Web Analytics: sempre carregado (sem cookies).
 * - ConsentManager: decide se GA4 pode ou não carregar.
 * - GoogleAnalytics: só renderiza scripts quando consent === "accepted".
 */
export function DocumentShell({ locale, children }: DocumentShellProps) {
  const localeMeta = getLocale(locale);
  const content = getMessages(locale).landing;

  return (
    <html
      lang={localeMeta.hreflang}
      className={`${bodyFont.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col bg-background font-sans text-foreground antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeProvider>
          <ScrollPreservation />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-primary-foreground"
          >
            {content.a11y.skipToContent}
          </a>
          {children}
        </ThemeProvider>
        <CloudflareWebAnalytics />
        <ConsentManager locale={locale} />
        <GoogleAnalytics />
        <JsonLd data={buildOrganizationJsonLd()} />
      </body>
    </html>
  );
}
