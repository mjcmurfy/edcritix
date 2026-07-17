import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { EditorialVisibilityToggle } from "@/components/editorial-visibility-toggle";
import { ThemeToggle } from "@/components/theme-toggle";

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--nav-bg)] backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <BrandMark size="sm" />
          <div className="min-w-0">
            <div className="text-sm font-semibold tracking-tight text-[color:var(--foreground-strong)]">
              EDCritix
            </div>
            <div className="truncate text-xs text-[color:var(--muted)]">Emergency medicine evidence briefing</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          <Link
            href="/"
            className="rounded-md px-3 py-2 text-sm font-medium text-[color:var(--muted-soft)] transition hover:bg-[color:var(--surface-subtle)] hover:text-[color:var(--foreground-strong)]"
          >
            Today
          </Link>
          <Link
            href="/archive"
            className="rounded-md px-3 py-2 text-sm font-medium text-[color:var(--muted-soft)] transition hover:bg-[color:var(--surface-subtle)] hover:text-[color:var(--foreground-strong)]"
          >
            Archive
          </Link>
          <Link
            href="/sources"
            className="rounded-md px-3 py-2 text-sm font-medium text-[color:var(--muted-soft)] transition hover:bg-[color:var(--surface-subtle)] hover:text-[color:var(--foreground-strong)]"
          >
            Sources
          </Link>
          <Link
            href="/topics"
            className="rounded-md px-3 py-2 text-sm font-medium text-[color:var(--muted-soft)] transition hover:bg-[color:var(--surface-subtle)] hover:text-[color:var(--foreground-strong)]"
          >
            Topics
          </Link>
          <Link
            href="/methodology"
            className="rounded-md px-3 py-2 text-sm font-medium text-[color:var(--muted-soft)] transition hover:bg-[color:var(--surface-subtle)] hover:text-[color:var(--foreground-strong)]"
          >
            Methods
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/archive"
            className="inline-flex h-9 items-center justify-center rounded-md border border-[color:var(--button-muted-border)] bg-[color:var(--button-muted-bg)] px-3 text-xs font-medium text-[color:var(--button-muted-text)] transition hover:bg-[color:var(--surface-subtle)] md:hidden"
          >
            Archive
          </Link>
          <EditorialVisibilityToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
