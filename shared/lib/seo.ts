import type { Metadata } from "next";

import { site } from "@/core/config/site";
import { getLocale, locales, type LocaleCode } from "@/core/config/locales";

/** URL absoluta a partir de um caminho do site. */
export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}

/** Mapa hreflang -> URL absoluta, com x-default para a raiz (pt-PT). */
export function languageAlternates(): Record<string, string> {
  const entries = locales.map((l) => [l.hreflang, absoluteUrl(l.path)]);
  return {
    ...Object.fromEntries(entries),
    "x-default": absoluteUrl("/"),
  };
}

/**
 * Metadata por locale: canonical autorreferencial, hreflang recíproco,
 * Open Graph e controlo de indexação (noindex até ao lançamento oficial).
 */
export function buildLocaleMetadata(
  code: LocaleCode,
  meta: { title: string; description: string },
): Metadata {
  const locale = getLocale(code);

  return {
    metadataBase: new URL(site.url),
    title: meta.title,
    description: meta.description,
    applicationName: site.name,
    alternates: {
      canonical: locale.path,
      languages: languageAlternates(),
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: locale.ogLocale,
      url: locale.path,
      title: meta.title,
      description: meta.description,
    },
    robots: site.indexable
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}

/**
 * JSON-LD da organização educativa — apenas dados confirmados na spec §21.
 * Proibido: Review, AggregateRating, preços, horários, coordenadas ou
 * qualquer dado ainda não confirmado.
 */
export function buildOrganizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.name,
    telephone: site.phoneDisplay,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/logo.jpeg"),
    image: absoluteUrl("/logo.jpeg"),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: "Amadora",
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
  };
}
