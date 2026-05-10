import { feedMeta, formatDateTime } from "@/lib/feed";

export function SiteFooter() {
  const updatedAt = feedMeta.editorialGeneratedAt ?? feedMeta.generatedAt;

  return (
    <footer className="mt-14 border-t border-[color:var(--border)]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-6 py-8 text-sm text-[color:var(--muted)] sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--muted-faint)]">
            EDCritix
          </div>
          <div className="mt-2">Defibrillating the Data. The front page for Emergency Medicine.</div>
        </div>
        <div className="lg:text-right">
          <div>Updated {formatDateTime(updatedAt)}</div>
          <div className="mt-1">AI-summarised and ranked daily from the latest emergency medicine sources.</div>
        </div>
      </div>
    </footer>
  );
}
