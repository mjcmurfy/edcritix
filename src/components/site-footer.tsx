import Link from "next/link";
import { feedMeta, formatDateTime, sourceCatalogSummary } from "@/lib/feed";

export function SiteFooter() {
  const updatedAt = feedMeta.editorialGeneratedAt ?? feedMeta.generatedAt;

  return (
    <footer className="mt-10 border-t border-[color:var(--border)] bg-[color:var(--surface)]">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 text-sm text-[color:var(--muted)] sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold text-[color:var(--foreground-strong)]">
            EDCritix
          </div>
          <p className="mt-2 leading-6">
            AI-assisted emergency medicine current-awareness. Summaries are for education and triage of reading, not a substitute for the original source or local clinical policy.
          </p>
        </div>

        <div className="space-y-2 lg:text-right">
          <div>Updated {formatDateTime(updatedAt)}</div>
          <div>{sourceCatalogSummary.total} sources monitored · {sourceCatalogSummary.online} online</div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link href="/sources" className="font-medium text-[color:var(--inline-link-text)] hover:underline">
              Sources
            </Link>
            <Link href="/methodology" className="font-medium text-[color:var(--inline-link-text)] hover:underline">
              Methods
            </Link>
            <Link href="/archive" className="font-medium text-[color:var(--inline-link-text)] hover:underline">
              Archive
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
