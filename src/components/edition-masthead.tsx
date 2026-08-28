import Link from "next/link";
import { formatDateTime, sourceCatalogSummary } from "@/lib/feed";

const metaLabel = "text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-faint)]";
const linkButton =
  "inline-flex h-10 items-center justify-center rounded-md border px-3 text-sm font-medium transition";

export function EditionMasthead({
  editionLabel,
  sourceWindowDays,
  articleCount,
  readFirstCount,
  highYieldCount,
  updatedAt,
  previousHref,
  nextHref,
  isCurrent,
}: {
  editionLabel: string;
  sourceWindowDays?: number | null;
  articleCount: number;
  readFirstCount: number;
  highYieldCount: number;
  updatedAt?: string | null;
  previousHref?: string | null;
  nextHref?: string | null;
  isCurrent: boolean;
}) {
  return (
    <section className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-sm sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[1.45fr_0.75fr] lg:items-start">
        <div>
          <div className={metaLabel}>EDCritix Daily</div>
          <h1 className="mt-1 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-[color:var(--foreground-strong)] sm:text-4xl">
            Defibrillating the Data
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[color:var(--muted-soft)] sm:text-base">
            EDCritix scans emergency medicine journals, new papers, selected guideline and consensus updates, and FOAMed resources, then ranks the most clinically useful reads for frontline practice with concise summaries, clinical takeaways, and links to the original source
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {previousHref ? (
              <Link
                href={previousHref}
                className={`${linkButton} border-[color:var(--button-muted-border)] bg-[color:var(--button-muted-bg)] text-[color:var(--button-muted-text)] hover:bg-[color:var(--surface-subtle)]`}
              >
                Previous edition
              </Link>
            ) : null}

            {!isCurrent ? (
              <Link
                href="/"
                className={`${linkButton} border-[color:var(--button-muted-border)] bg-[color:var(--button-muted-bg)] text-[color:var(--button-muted-text)] hover:bg-[color:var(--surface-subtle)]`}
              >
                Latest edition
              </Link>
            ) : null}

            <Link
              href="/archive"
              className={`${linkButton} border-[color:var(--button-muted-border)] bg-[color:var(--button-muted-bg)] text-[color:var(--button-muted-text)] hover:bg-[color:var(--surface-subtle)]`}
            >
              Browse archive
            </Link>

            <Link
              href="/sources"
              className={`${linkButton} border-[color:var(--button-muted-border)] bg-[color:var(--button-muted-bg)] text-[color:var(--button-muted-text)] hover:bg-[color:var(--surface-subtle)]`}
            >
              Source registry
            </Link>

            {nextHref ? (
              <Link
                href={nextHref}
                className={`${linkButton} border-[color:var(--button-muted-border)] bg-[color:var(--button-muted-bg)] text-[color:var(--button-muted-text)] hover:bg-[color:var(--surface-subtle)]`}
              >
                Next edition
              </Link>
            ) : null}
          </div>
        </div>

        <aside className="rounded-md border border-[color:var(--border)] bg-[color:var(--surface-subtle)] p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className={metaLabel}>{isCurrent ? "Current edition" : "Archived edition"}</div>
              <div className="mt-1 font-semibold tracking-tight text-[color:var(--foreground-strong)]">
                {editionLabel}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-semibold text-[color:var(--foreground-strong)]">{articleCount}</div>
              <div className="text-xs text-[color:var(--muted)]">Articles</div>
            </div>
          </div>

          <dl className="mt-3 grid grid-cols-3 border-y border-[color:var(--border)] py-2 text-sm">
            <div className="border-r border-[color:var(--border)] pr-2">
              <dt className="text-xs text-[color:var(--muted)]">Read first</dt>
              <dd className="mt-0.5 text-xl font-semibold text-[color:var(--foreground-strong)]">{readFirstCount}</dd>
            </div>
            <div className="border-r border-[color:var(--border)] px-2">
              <dt className="text-xs text-[color:var(--muted)]">High-yield</dt>
              <dd className="mt-0.5 text-xl font-semibold text-[color:var(--foreground-strong)]">{highYieldCount}</dd>
            </div>
            <div className="pl-2">
              <dt className="text-xs text-[color:var(--muted)]">Sources</dt>
              <dd className="mt-0.5 text-xl font-semibold text-[color:var(--foreground-strong)]">
                {sourceCatalogSummary.online}/{sourceCatalogSummary.total}
              </dd>
            </div>
          </dl>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs leading-5 text-[color:var(--muted)]">
            <span>{sourceWindowDays ? `${sourceWindowDays}-day window` : "Latest window"}</span>
            <span>Updated {formatDateTime(updatedAt ?? null)}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
