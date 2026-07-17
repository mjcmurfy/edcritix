"use client";

import Link from "next/link";
import { PracticeSignalControl } from "@/components/practice-signal-control";
import {
  getArticleBottomLine,
  getArticleHref,
  getArticleRankLabel,
  getArticleTopics,
  getEvidenceLabel,
  getImpactDescription,
  getSourceAccessLabel,
  type Article,
} from "@/lib/feed";
import { useState, type ReactNode } from "react";

const impactClasses: Record<Article["impact"], string> = {
  "Practice-changing": "border-[color:var(--impact-practice-border)] bg-[color:var(--impact-practice-bg)] text-[color:var(--impact-practice-text)]",
  "High-yield": "border-[color:var(--impact-high-border)] bg-[color:var(--impact-high-bg)] text-[color:var(--impact-high-text)]",
  "Worth watching": "border-[color:var(--impact-watch-border)] bg-[color:var(--impact-watch-bg)] text-[color:var(--impact-watch-text)]",
  Background: "border-[color:var(--impact-background-border)] bg-[color:var(--impact-background-bg)] text-[color:var(--impact-background-text)]",
};

const actionButton =
  "inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm font-medium transition";

function cleanSummary(text: string) {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const seen = new Set<string>();
  const deduped = paragraphs.filter((paragraph) => {
    const normalized = paragraph.replace(/\s+/g, " ").toLowerCase();
    if (seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });

  return deduped.length ? deduped : [text.trim()];
}

function MetaChip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-1 text-xs leading-none ${className}`}>
      {children}
    </span>
  );
}

export function DailyEditorialCard({ article, index }: { article: Article; index: number }) {
  return <DailyEditorialCardInner article={article} index={index} compact={false} />;
}

export function DailyEditorialCardInner({
  article,
  index,
  compact = false,
}: {
  article: Article;
  index: number;
  compact?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(!compact);
  const topics = getArticleTopics(article);

  return (
    <article className="grid gap-4 px-4 py-5 transition hover:bg-[color:var(--surface-subtle)] sm:grid-cols-[4.5rem_1fr] sm:px-5 lg:px-6">
      <div className="flex items-start gap-2 sm:block">
        <div className="font-mono text-sm font-semibold text-[color:var(--accent)]">
          {getArticleRankLabel(index)}
        </div>
        <div className="text-xs text-[color:var(--muted)] sm:mt-1">
          {getImpactDescription(article.impact)}
        </div>
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-1.5">
          <MetaChip className="border-[color:var(--pill-border)] bg-[color:var(--pill-bg)] text-[color:var(--pill-text)]">
            {article.source}
          </MetaChip>
          <MetaChip className={impactClasses[article.impact]}>{article.impact}</MetaChip>
          <MetaChip className="border-[color:var(--pill-border)] bg-[color:var(--pill-bg)] text-[color:var(--pill-muted-text)]">
            {article.published}
          </MetaChip>
          <MetaChip className="border-[color:var(--pill-border)] bg-[color:var(--pill-bg)] text-[color:var(--pill-muted-text)]">
            {getEvidenceLabel(article)}
          </MetaChip>
          {article.confidence ? (
            <MetaChip className="border-[color:var(--pill-border)] bg-[color:var(--pill-bg)] text-[color:var(--pill-muted-text)]">
              Summary confidence: {article.confidence}
            </MetaChip>
          ) : null}
        </div>

        <h3 className="mt-3 max-w-4xl text-lg font-semibold leading-snug tracking-tight text-[color:var(--foreground-strong)] sm:text-xl">
          <Link href={getArticleHref(article)} className="hover:text-[color:var(--accent)]">
            {article.title}
          </Link>
        </h3>

        <div className="mt-3 border-l-4 border-[color:var(--accent-border)] pl-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--section-label-text)]">
            Clinical takeaway
          </div>
          <p className="mt-1 max-w-4xl text-sm leading-6 text-[color:var(--muted-soft)]">
            {getArticleBottomLine(article)}
          </p>
        </div>

        {isExpanded ? (
          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_18rem]">
            <section>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--muted-faint)]">
                Article summary
              </div>
              <div className="mt-2 grid gap-3 text-sm leading-6 text-[color:var(--muted-soft)]">
                {cleanSummary(article.summary || article.shortSummary).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <aside className="border-t border-[color:var(--border)] pt-4 text-sm lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--muted-faint)]">
                Provenance
              </div>
              <dl className="mt-2 grid gap-2 text-sm">
                <div>
                  <dt className="text-[color:var(--muted)]">Original source</dt>
                  <dd className="font-medium text-[color:var(--foreground-strong)]">{article.source}</dd>
                </div>
                <div>
                  <dt className="text-[color:var(--muted)]">Access layer</dt>
                  <dd className="font-medium text-[color:var(--foreground-strong)]">{getSourceAccessLabel(article)}</dd>
                </div>
                <div>
                  <dt className="text-[color:var(--muted)]">Topics</dt>
                  <dd className="font-medium text-[color:var(--foreground-strong)]">{topics.join(", ")}</dd>
                </div>
              </dl>
            </aside>
          </div>
        ) : null}

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <PracticeSignalControl slug={article.slug} />

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setIsExpanded((value) => !value)}
              aria-label={isExpanded ? `Collapse ${article.title}` : `Expand ${article.title}`}
              className={`${actionButton} border-[color:var(--button-muted-border)] bg-[color:var(--button-muted-bg)] text-[color:var(--button-muted-text)] hover:bg-[color:var(--surface-subtle)]`}
            >
              {isExpanded ? "Less detail" : "More detail"}
            </button>
            <Link
              href={getArticleHref(article)}
              className={`${actionButton} border-[color:var(--button-muted-border)] bg-[color:var(--button-muted-bg)] text-[color:var(--button-muted-text)] hover:bg-[color:var(--surface-subtle)]`}
            >
              Open analysis
            </Link>
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#ffffff" }}
              className={`${actionButton} border-[color:var(--button-border)] bg-[color:var(--button-bg)] text-white hover:opacity-90`}
            >
              Source
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
