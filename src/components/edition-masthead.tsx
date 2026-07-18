import Link from "next/link";
import { formatDateTime, sourceCatalogSummary } from "@/lib/feed";

const metaLabel = "text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-faint)]";
const linkButton =
  "inline-flex h-10 items-center justify-center rounded-md border px-3 text-sm font-medium transition";

export function EditionMasthead({
  editionLabel,
  sourceWindowDays,
  articleCount,
  updatedAt,
  previousHref,
  nextHref,
  isCurrent,
}: {
  editionLabel: string;
  sourceWindowDays?: number | null;
  articleCount: number;
  updatedAt?: string | null;
  previousHref?: string | null;
  nextHref?: string | null;
  isCurrent: boolean;
}) {
  return (
    <section className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-sm sm:p-6 lg:p-7">
      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
        <div>
          <div className={metaLabel}>EDCritix Daily</div>
          <h1 className="mt-2 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-[color:var(--foreground-strong)] sm:text-4xl">
            Today&apos;s most practice-relevant EM updates
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[color:var(--muted-soft)]">
            A ranked emergency medicine reading queue from journals, guidelines, consensus updates, and FOAMed sources. Start with the top clinical signals, then drill into source-linked summaries when something matters to your practice.
          </p>
        </div>

        <div className="rounded-md border border-[color:var(--border)] bg-[color:var(--surface-subtle)] p-4">
          <div className={metaLabel}>Current edition</div>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-[color:var(--muted)]">Date</dt>
              <dd className="mt-1 font-semibold text-[color:var(--foreground-strong)]">{editionLabel}</dd>
            </div>
            <div>
              <dt className="text-[color:var(--muted)]">Articles</dt>
              <dd className="mt-1 font-semibold text-[color:var(--foreground-strong)]">{articleCount}</dd>
            </div>
            <div>
              <dt className="text-[color:var(--muted)]">Window</dt>
              <dd className="mt-1 font-semibold text-[color:var(--foreground-strong)]">
                {sourceWindowDays ? `${sourceWindowDays} days` : "Latest"}
              </dd>
            </div>
            <div>
              <dt className="text-[color:var(--muted)]">Sources</dt>
              <dd className="mt-1 font-semibold text-[color:var(--foreground-strong)]">
                {sourceCatalogSummary.online}/{sourceCatalogSummary.total} online
              </dd>
            </div>
          </dl>
          <div className="mt-3 border-t border-[color:var(--border)] pt-3 text-xs leading-5 text-[color:var(--muted)]">
            Updated {formatDateTime(updatedAt ?? null)}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-2 border-y border-[color:var(--border)] py-3 text-sm text-[color:var(--muted-soft)] sm:grid-cols-3">
        <div><span className="font-semibold text-[color:var(--foreground-strong)]">AI-assisted scan.</span> Summaries help decide what to read.</div>
        <div><span className="font-semibold text-[color:var(--foreground-strong)]">Source linked.</span> Original articles remain the authority.</div>
        <div><span className="font-semibold text-[color:var(--foreground-strong)]">Clinical caution.</span> Use local policy and judgment.</div>
      </div>

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
    </section>
  );
}
