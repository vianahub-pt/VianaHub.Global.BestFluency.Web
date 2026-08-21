import type { MetadataRoute } from "next";

import { locales } from "@/core/config/locales";
import { absoluteUrl, languageAlternates } from "@/shared/lib/seo";

export const dynamic = "force-static";

/**
 * Sitemap com todos os idiomas publicados e alternates hreflang recíprocos
 * (inclui x-default para "/"), conforme as regras de SEO internacional.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = languageAlternates();

  return locales.map((locale) => ({
    url: absoluteUrl(locale.path),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: locale.isDefault ? 1 : 0.9,
    alternates: { languages },
  }));
}
