"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

import { cn } from "@/shared/lib/utils";

interface VideoModalProps {
  /** Controls visibility. */
  open: boolean;
  /** Called when the modal requests to close. */
  onClose: () => void;
  /** Video source path (e.g. "/media/tvi-01.mp4"). */
  src: string;
  /** Accessible label for the video. */
  ariaLabel: string;
  className?: string;
}

/**
 * Video modal with:
 * - `role="dialog"` + `aria-modal="true"`
 * - Focus trap (Tab / Shift+Tab cycles inside)
 * - Escape key closes
 * - Click-outside (backdrop) closes
 * - Scroll lock on `<body>` while open
 * - Focus restored to trigger element on close
 * - Video pauses on close
 */
export function VideoModal({ open, onClose, src, ariaLabel, className }: VideoModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Store the element that had focus before the modal opened.
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }
  }, [open]);

  // Restore focus on close.
  useEffect(() => {
    if (!open && previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [open]);

  // Scroll lock.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Pause video and reset on close.
  useEffect(() => {
    if (!open && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [open]);

  // Escape key handler.
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Focus trap.
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const container = dialogRef.current;
      if (!container) return;

      const focusable = container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), video, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [],
  );

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog panel */}
      <div
        ref={dialogRef}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative z-10 flex w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-border bg-black shadow-2xl",
          "max-h-[85vh]",
          className,
        )}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        {/* Video */}
        <video
          ref={videoRef}
          src={src}
          controls
          autoPlay
          className="w-full"
          aria-label={ariaLabel}
        >
          O seu navegador não suporta a reprodução de vídeos.
        </video>
      </div>
    </div>
  );
}
