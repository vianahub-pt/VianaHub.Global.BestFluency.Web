import type { MetadataRoute } from "next";

import { locales } from "@/core/config/locales";
import {
  absoluteUrl,
  buildReportageAlternates,
  buildTviReportageAlternates,
  languageAlternates,
} from "@/shared/lib/seo";
import { buildReportagePath, buildTviReportagePath } from "@/shared/lib/routes";

export const dynamic = "force-static";

/**
 * Sitemap com todos os idiomas publicados e alternates hreflang recíprocos
 * (inclui x-default para "/"), conforme as regras de SEO internacional.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = languageAlternates();
  const reportageLanguages = buildReportageAlternates();
  const tviReportageLanguages = buildTviReportageAlternates();

  return [
    ...locales.map((locale) => ({
      url: absoluteUrl(locale.path),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: locale.isDefault ? 1 : 0.9,
      alternates: { languages },
    })),
    ...locales.map((locale) => ({
      url: absoluteUrl(buildReportagePath(locale.code)),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: { languages: reportageLanguages },
    })),
    ...locales.map((locale) => ({
      url: absoluteUrl(buildTviReportagePath(locale.code)),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: { languages: tviReportageLanguages },
    })),
  ];
}
