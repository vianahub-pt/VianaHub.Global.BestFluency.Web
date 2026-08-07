import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/shared/lib/seo";

export const dynamic = "force-static";

/**
 * robots.txt estático. A indexação efetiva é controlada por página via meta
 * robots (noindex até ao lançamento oficial — ver ADR 0001).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
