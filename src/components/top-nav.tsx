import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { feedMeta, formatDateTime } from "@/lib/feed";

export function TopNav() {
  const updatedAt = feedMeta.editorialGeneratedAt ?? feedMeta.generatedAt;

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--nav-bg)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <BrandMark size="sm" />
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.32em] text-[color:var(--foreground-strong)]">
              EDCritix
            </div>
            <div className="text-sm text-[color:var(--muted)]">Defibrillating the Data</div>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden rounded-full border border-[color:var(--border)] bg-[color:var(--pill-bg)] px-4 py-2 text-xs font-medium text-[color:var(--pill-text)] sm:block">
            Updated {formatDateTime(updatedAt)}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
