"use client";

import { Play } from "lucide-react";
import { useCallback, useState } from "react";

import { type LocaleCode } from "@/core/config/locales";
import { getMessages } from "@/core/i18n";
import { VideoModal } from "@/shared/components/ui/video-modal";

/**
 * Video items displayed in the Testimonials section.
 * Each item opens a modal with the video player on click.
 */
const videoItems = [
  { src: "/media/tvi-01.mp4", labelKey: "tvi01" as const },
  { src: "/media/tvi-03.mp4", labelKey: "tvi03" as const },
  { src: "/media/tvi-04.mp4", labelKey: "tvi04" as const },
  { src: "/media/tvi-06.mp4", labelKey: "tvi06" as const },
] as const;

interface VideoInfoBarProps {
  locale: LocaleCode;
}

/**
 * Faixa de vídeos (Testimonials section).
 *
 * - 4 vídeos em grelha (1 coluna mobile, 2 tablet, 4 desktop);
 * - cada item mostra thumbnail/título com ícone de play;
 * - clique abre modal com `<video>` reproduzindo o ficheiro MP4.
 */
export function VideoInfoBar({ locale }: VideoInfoBarProps) {
  const content = getMessages(locale).landing;
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const openVideo = useCallback((src: string) => setActiveVideo(src), []);
  const closeVideo = useCallback(() => setActiveVideo(null), []);

  const activeItem = videoItems.find((v) => v.src === activeVideo);

  return (
    <>
      <section aria-label={content.videos.ariaLabel}>
        <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-8">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {videoItems.map((video) => (
              <li key={video.src}>
                <button
                  type="button"
                  onClick={() => openVideo(video.src)}
                  className="flex w-full items-center gap-3 rounded-lg border border-border bg-card/60 px-4 py-3 text-left shadow-sm transition-colors hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/80 text-black dark:text-white">
                    <Play className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium text-black dark:text-white">
                    {content.videos[video.labelKey]}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {activeItem && (
        <VideoModal
          open={!!activeVideo}
          onClose={closeVideo}
          src={activeItem.src}
          ariaLabel={content.videos[activeItem.labelKey]}
        />
      )}
    </>
  );
}
