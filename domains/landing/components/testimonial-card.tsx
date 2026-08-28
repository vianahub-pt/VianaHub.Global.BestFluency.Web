import Image from "next/image";

export function TestimonialCard({
  name,
  role,
  photo,
  quote,
}: {
  name: string;
  role: string;
  photo: string;
  quote: string;
}) {
  return (
    <div className="relative mb-3 overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md sm:mb-4 sm:rounded-2xl sm:p-5">
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full sm:h-12 sm:w-12 md:h-14 md:w-14">
          <Image
            src={photo}
            alt={name}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <cite className="block text-xs font-semibold not-italic text-foreground truncate sm:text-sm">
            {name}
          </cite>
          <span className="text-[11px] text-muted-foreground sm:text-xs">{role}</span>
        </div>
      </div>
      <blockquote className="mt-2.5 text-xs leading-5 text-foreground sm:mt-3 sm:text-sm sm:leading-6">
        &ldquo;{quote}&rdquo;
      </blockquote>
    </div>
  );
}
