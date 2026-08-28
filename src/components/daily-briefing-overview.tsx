import Link from "next/link";
import {
  getArticleBottomLine,
  getArticleHref,
  getArticleRankLabel,
  getEvidenceLabel,
  getImpactDescription,
  type Edition,
} from "@/lib/feed";

const metaLabel = "text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-faint)]";

export function DailyBriefingOverview({ edition }: { edition: Edition }) {
  const leadSignals = edition.articles.slice(0, 3);

  return (
    <section className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] shadow-sm">
      <div className="border-b border-[color:var(--border)] px-4 py-3 sm:px-5">
        <div className={metaLabel}>Five-minute scan</div>
        <h2 className="mt-1 text-xl font-semibold tracking-tight text-[color:var(--foreground-strong)]">
          Top clinical signals
        </h2>
      </div>

      <div className="divide-y divide-[color:var(--border)]">
        {leadSignals.map((article, index) => (
          <Link
            href={getArticleHref(article)}
            key={article.slug}
            className="group grid gap-3 px-4 py-4 transition hover:bg-[color:var(--surface-subtle)] sm:grid-cols-[4.5rem_1fr] sm:px-5"
          >
            <div className="flex items-start gap-2 sm:block">
              <div className="font-mono text-sm font-semibold text-[color:var(--accent)]">
                {getArticleRankLabel(index)}
              </div>
              <div className="text-xs text-[color:var(--muted)] sm:mt-1">
                {getImpactDescription(article.impact)}
              </div>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[color:var(--muted)]">
                <span>{article.source}</span>
                <span aria-hidden="true">/</span>
                <span>{article.published}</span>
                <span aria-hidden="true">/</span>
                <span>{getEvidenceLabel(article)}</span>
              </div>
              <h3 className="mt-1 text-base font-semibold leading-snug text-[color:var(--foreground-strong)] group-hover:text-[color:var(--accent)]">
                {article.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-[color:var(--muted-soft)]">
                {getArticleBottomLine(article)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
