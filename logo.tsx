import { site } from "@/data/catalog";

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="3" y="13" width="4" height="8" fill="currentColor" />
      <rect x="10" y="8" width="4" height="13" fill="currentColor" />
      <rect x="17" y="3" width="4" height="18" fill="currentColor" />
    </svg>
  );
}

export function Logo() {
  if (site.logoSrc && site.logoIncludesName) {
    return (
      <img src={site.logoSrc} alt="Growth" className="h-10 w-auto" />
    );
  }

  return (
    <span className="flex flex-col">
      {site.logoSrc ? <img src={site.logoSrc} alt="" className="mb-2 h-10 w-auto" /> : null}
      <span className="font-display text-[1.65rem] leading-none tracking-tight">Growth Growvia</span>
      <span className="mt-1 text-xs tracking-[0.16em] text-faint uppercase">{site.identifier}</span>
    </span>
  );
}
