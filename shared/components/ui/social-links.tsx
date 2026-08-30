import type { LocaleCode } from "@/core/config/locales";
import { getMessages } from "@/core/i18n";
import { site } from "@/core/config/site";
import { cn } from "@/shared/lib/utils";

import { InstagramIcon, LinkedInIcon } from "./social-icons";

interface SocialLinksProps {
  locale: LocaleCode;
  className?: string;
  /** Orientation of the link list. */
  orientation?: "horizontal" | "vertical";
  /** Size variant for the icons. */
  size?: "sm" | "md";
}

const socialLinks = [
  { key: "instagram", url: site.social.instagram, Icon: InstagramIcon },
  { key: "linkedin", url: site.social.linkedin, Icon: LinkedInIcon },
] as const;

/**
 * Renders social media links (Instagram + LinkedIn) with i18n labels.
 * Used in SiteFooter and MobileMenu.
 */
export function SocialLinks({
  locale,
  className,
  orientation = "vertical",
  size = "sm",
}: SocialLinksProps) {
  const content = getMessages(locale).landing.social;
  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <nav aria-label={content.followUs} className={className}>
      <h3 className="text-sm font-semibold text-white">{content.followUs}</h3>
      <ul
        className={cn(
          "mt-3 flex list-none gap-3 p-0",
          orientation === "vertical" && "flex-col",
        )}
      >
        {socialLinks.map(({ key, url, Icon }) => (
          <li key={key}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2 text-sm text-white transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              )}
            >
              <Icon className={iconSize} />
              <span>{key === "instagram" ? content.instagramLabel : content.linkedinLabel}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
