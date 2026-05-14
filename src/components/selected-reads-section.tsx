"use client";

import { useState } from "react";
import { DailyEditorialCardInner } from "@/components/daily-editorial-card";
import type { Article } from "@/lib/feed";

export function SelectedReadsSection({ articles }: { articles: Article[] }) {
  const [compact, setCompact] = useState(false);
  const toggleTextClass = compact
    ? "text-[color:var(--action-expand-text)]"
    : "text-[color:var(--action-collapse-text)]";

  return (
    <section>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[color:var(--muted-faint)]">
            Selected reads
          </div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[color:var(--foreground-strong)] sm:text-3xl">
            {`${articles.length} Articles in today's edition`}
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setCompact((value) => !value)}
          className={`inline-flex items-center justify-center rounded-full border border-[color:var(--toggle-button-border)] bg-[color:var(--toggle-button-bg)] px-4 py-2 text-sm font-medium shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition hover:opacity-90 sm:self-auto ${toggleTextClass}`}
        >
          {compact ? "Expand all" : "Collapse all"}
        </button>
      </div>

      <div className="space-y-5">
        {articles.map((article, index) => (
          <DailyEditorialCardInner key={article.slug} article={article} index={index} compact={compact} />
        ))}
      </div>
    </section>
  );
}
