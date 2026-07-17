"use client";

import { useMemo, useState } from "react";
import { DailyEditorialCardInner } from "@/components/daily-editorial-card";
import type { Article, ImpactLevel } from "@/lib/feed";

const impactFilters: Array<ImpactLevel | "all"> = [
  "all",
  "Practice-changing",
  "High-yield",
  "Worth watching",
  "Background",
];

export function SelectedReadsSection({
  articles,
  heading,
  label,
}: {
  articles: Article[];
  heading?: string;
  label?: string;
}) {
  const [compact, setCompact] = useState(false);
  const [query, setQuery] = useState("");
  const [impact, setImpact] = useState<ImpactLevel | "all">("all");
  const isFiltered = query.trim() !== "" || impact !== "all";

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesImpact = impact === "all" || article.impact === impact;
      const matchesQuery =
        !normalizedQuery ||
        [
          article.title,
          article.source,
          article.topic,
          article.takeaway,
          article.shortSummary,
          article.summary,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesImpact && matchesQuery;
    });
  }, [articles, impact, query]);

  return (
    <section className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] shadow-sm">
      <div className="border-b border-[color:var(--border)] px-4 py-4 sm:px-5 lg:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            {label ? (
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-faint)]">
                {label}
              </div>
            ) : null}
            <h2 className={`${label ? "mt-1 " : ""}text-2xl font-semibold tracking-tight text-[color:var(--foreground-strong)]`}>
              {heading ?? `${articles.length} articles in today's edition`}
            </h2>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              {filtered.length} shown from {articles.length}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sr-only" htmlFor="article-search">
              Search articles
            </label>
            <input
              id="article-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title, source, topic"
              className="h-10 min-w-0 rounded-md border border-[color:var(--border)] bg-[color:var(--surface-subtle)] px-3 text-sm text-[color:var(--foreground-strong)] outline-none placeholder:text-[color:var(--muted-faint)] focus:border-[color:var(--accent)] sm:w-64"
            />
            <button
              type="button"
              onClick={() => setCompact((value) => !value)}
              className="inline-flex h-10 items-center justify-center rounded-md border border-[color:var(--toggle-button-border)] bg-[color:var(--toggle-button-bg)] px-3 text-sm font-medium text-[color:var(--toggle-button-text)] transition hover:bg-[color:var(--surface-subtle)]"
            >
              {compact ? "Expand all" : "Collapse all"}
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {impactFilters.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setImpact(option)}
              className={`rounded-md border px-3 py-1.5 text-sm font-medium transition ${
                impact === option
                  ? "border-[color:var(--button-border)] bg-[color:var(--button-bg)] text-[color:var(--button-text)]"
                  : "border-[color:var(--button-muted-border)] bg-[color:var(--button-muted-bg)] text-[color:var(--button-muted-text)] hover:bg-[color:var(--surface-subtle)]"
              }`}
            >
              {option === "all" ? "All" : option}
            </button>
          ))}

          {isFiltered ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setImpact("all");
              }}
              className="rounded-md border border-[color:var(--button-muted-border)] bg-[color:var(--button-muted-bg)] px-3 py-1.5 text-sm font-medium text-[color:var(--button-muted-text)] transition hover:bg-[color:var(--surface-subtle)]"
            >
              Clear
            </button>
          ) : null}
        </div>
      </div>

      <div className="divide-y divide-[color:var(--border)]">
        {filtered.map((article) => {
          const originalIndex = articles.findIndex((candidate) => candidate.slug === article.slug);

          return (
            <DailyEditorialCardInner
              key={`${article.slug}-${compact ? "compact" : "expanded"}`}
              article={article}
              index={originalIndex >= 0 ? originalIndex : 0}
              compact={compact}
            />
          );
        })}

        {filtered.length === 0 ? (
          <div className="px-4 py-10 text-sm text-[color:var(--muted)] sm:px-5 lg:px-6">
            No articles match the current filters.
          </div>
        ) : null}
      </div>
    </section>
  );
}
