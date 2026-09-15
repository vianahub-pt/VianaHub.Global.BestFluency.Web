"use client";

import { Play } from "lucide-react";
import { useCallback, useState } from "react";

import type { LocaleCode } from "@/core/config/locales";
import { getMessages } from "@/core/i18n";
import { VideoModal } from "@/shared/components/ui/video-modal";

const videoItems = [
  { src: "/media/tvi-01.mp4", labelKey: "tvi01" as const },
  { src: "/media/tvi-03.mp4", labelKey: "tvi03" as const },
  { src: "/media/tvi-04.mp4", labelKey: "tvi04" as const },
  { src: "/media/tvi-06.mp4", labelKey: "tvi06" as const },
] as const;

interface TviVideoGalleryProps {
  locale: LocaleCode;
}

/**
 * Galeria de trechos da entrevista TVI.
 *
 * - 4 vídeos em grelha (1 coluna mobile, 2 tablet, 4 desktop);
 * - cada item mostra título com ícone de play;
 * - clique abre modal com `<video>` reproduzindo o ficheiro MP4;
 * - preload="none": nenhum MP4 é baixado antes da interação do utilizador.
 */
export function TviVideoGallery({ locale }: TviVideoGalleryProps) {
  const content = getMessages(locale).tviReportage;
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const openVideo = useCallback((src: string) => setActiveVideo(src), []);
  const closeVideo = useCallback(() => setActiveVideo(null), []);

  const activeItem = videoItems.find((v) => v.src === activeVideo);

  return (
    <>
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
                {content[video.labelKey]}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {activeItem && (
        <VideoModal
          open={!!activeVideo}
          onClose={closeVideo}
          src={activeItem.src}
          ariaLabel={content[activeItem.labelKey]}
        />
      )}
    </>
  );
}
