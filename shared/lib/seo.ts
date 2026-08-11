import type { Metadata } from "next";

import { site } from "@/core/config/site";
import { getLocale, locales, type LocaleCode } from "@/core/config/locales";

/**
 * Imagem social Open Graph / Twitter (1200×630, PNG) gerada a partir da marca
 * (monograma "BF" + nome da escola). Sem rostos ou fotografias não autorizadas.
 * Fica em public/ para ser servida como asset estático em todas as rotas.
 */
export const SOCIAL_IMAGE_PATH = "/og-image.png";

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
 * Open Graph completo (com imagem social absoluta 1200×630), Twitter/X card,
 * controlo de indexação (noindex apenas antes do lançamento oficial).
 *
 * Title/description vêm do namespace landing.* de locales/{code}/common.json
 * via utilitário central (core/i18n — spec §21), sem duplicação entre idiomas.
 */
export function buildLocaleMetadata(
  code: LocaleCode,
  meta: { title: string; description: string },
): Metadata {
  const locale = getLocale(code);
  const socialImageUrl = absoluteUrl(SOCIAL_IMAGE_PATH);

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
      url: absoluteUrl(locale.path),
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: socialImageUrl,
          width: 1200,
          height: 630,
          alt: site.name,
        },
      ],
    },
    twitter: {
      // Nenhum handle social confirmado (spec §21): card sem `site`/`creator`.
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [socialImageUrl],
    },
    robots: site.indexable
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}

/**
 * JSON-LD da escola — apenas dados confirmados na spec §21.
 *
 * Tipos compatíveis com organização educativa e negócio local:
 * EducationalOrganization (escola de idiomas) + LocalBusiness (negócio local).
 *
 * Proibido (pendente de confirmação): Review, AggregateRating, preços,
 * horários, coordenadas, email, perfis sociais e código postal.
 */
export function buildOrganizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
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
