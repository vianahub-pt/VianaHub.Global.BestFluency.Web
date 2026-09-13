"use client";

import { Check, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import type { LocaleCode } from "@/core/config/locales";
import { buildReportagePath, buildTviReportagePath } from "@/shared/lib/routes";
import { cn } from "@/shared/lib/utils";

const reportageItems = [
  { value: "tvi", label: "Bom Dia Alegria" },
  { value: "new-amadora", label: "New in Amadora" },
] as const;

export function ReportagesSwitcher({
  label,
  locale,
}: {
  label: string;
  locale: LocaleCode;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [openUp, setOpenUp] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selectedLabel = reportageItems.find(
    (item) => item.value === selected,
  )?.label;

  function handleChange(value: string) {
    setSelected(value);
    setIsOpen(false);

    if (value === "new-amadora") {
      router.push(buildReportagePath(locale));
      return;
    }

    router.push(buildTviReportagePath(locale));
  }

  useLayoutEffect(() => {
    if (!isOpen || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    setOpenUp(spaceBelow < 180 && rect.top > spaceBelow);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) setIsOpen(false);
    }
    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={`${label}: ${selectedLabel ?? label}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="inline-flex min-h-11 w-40 shrink-0 items-center gap-1.5 rounded-md border-0 bg-white/20 px-3 text-sm font-medium text-foreground hover:bg-white hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <span className="flex-1 text-left">{selectedLabel ?? label}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform",
            isOpen && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <ul
          role="listbox"
          aria-label={label}
          className={cn(
            "absolute left-0 z-[60] max-h-72 w-full min-w-[10rem] overflow-auto rounded-md border border-border bg-popover py-1 text-popover-foreground shadow-md",
            openUp ? "bottom-full mb-1" : "top-full mt-1",
          )}
        >
          {reportageItems.map((item) => {
            const isSelected = item.value === selected;
            return (
              <li
                key={item.value}
                role="option"
                aria-selected={isSelected}
                tabIndex={0}
                onClick={() => handleChange(item.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleChange(item.value);
                  }
                }}
                className="flex min-h-11 cursor-pointer items-center gap-2 px-3 py-2 text-sm hover:bg-accent focus:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <span className="flex-1">{item.label}</span>
                {isSelected && (
                  <Check
                    className="h-4 w-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
