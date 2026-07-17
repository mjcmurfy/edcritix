import Link from "next/link";
import {
  getArticleBottomLine,
  getArticleHref,
  getArticleRankLabel,
  getEvidenceLabel,
  getImpactCounts,
  getImpactDescription,
  sourceCatalogSummary,
  type Edition,
} from "@/lib/feed";

const metaLabel = "text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-faint)]";

export function DailyBriefingOverview({ edition }: { edition: Edition }) {
  const leadSignals = edition.articles.slice(0, 3);
  const impactCounts = getImpactCounts();

  return (
    <section className="grid gap-4 lg:grid-cols-[1fr_20rem]">
      <div className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] shadow-sm">
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
      </div>

      <aside className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-sm">
        <div className={metaLabel}>New here</div>
        <p className="mt-2 text-sm leading-6 text-[color:var(--muted-soft)]">
          Use EDCritix as a reading triage tool: scan the ranked queue, open the original source for decisions, and use Methods/Sources to inspect coverage.
        </p>

        <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-[color:var(--border)] pt-4 text-sm">
          <div>
            <dt className="text-[color:var(--muted)]">Read first</dt>
            <dd className="mt-1 text-lg font-semibold text-[color:var(--foreground-strong)]">
              {impactCounts["Practice-changing"]}
            </dd>
          </div>
          <div>
            <dt className="text-[color:var(--muted)]">High-yield</dt>
            <dd className="mt-1 text-lg font-semibold text-[color:var(--foreground-strong)]">
              {impactCounts["High-yield"]}
            </dd>
          </div>
          <div>
            <dt className="text-[color:var(--muted)]">Sources</dt>
            <dd className="mt-1 text-lg font-semibold text-[color:var(--foreground-strong)]">
              {sourceCatalogSummary.total}
            </dd>
          </div>
          <div>
            <dt className="text-[color:var(--muted)]">Online</dt>
            <dd className="mt-1 text-lg font-semibold text-[color:var(--foreground-strong)]">
              {sourceCatalogSummary.online}
            </dd>
          </div>
        </dl>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/methodology"
            className="rounded-md border border-[color:var(--button-muted-border)] bg-[color:var(--button-muted-bg)] px-3 py-2 text-sm font-medium text-[color:var(--button-muted-text)] hover:bg-[color:var(--surface-subtle)]"
          >
            How ranking works
          </Link>
          <Link
            href="/sources"
            className="rounded-md border border-[color:var(--button-muted-border)] bg-[color:var(--button-muted-bg)] px-3 py-2 text-sm font-medium text-[color:var(--button-muted-text)] hover:bg-[color:var(--surface-subtle)]"
          >
            Source registry
          </Link>
        </div>
      </aside>
    </section>
  );
}
