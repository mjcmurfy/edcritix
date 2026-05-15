import Link from "next/link";
import { sourceCatalogSummary } from "@/lib/feed";

const navButtonBase =
  "inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-medium shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition hover:opacity-90";

export function EditionMasthead({
  editionLabel,
  sourceWindowDays,
  articleCount,
  previousHref,
  nextHref,
  isCurrent,
}: {
  editionLabel: string;
  sourceWindowDays?: number | null;
  articleCount: number;
  previousHref?: string | null;
  nextHref?: string | null;
  isCurrent: boolean;
}) {
  return (
    <section className="relative overflow-hidden rounded-[34px] border border-[color:var(--hero-badge-border)] bg-[image:var(--hero-surface)] px-5 py-6 shadow-[0_30px_90px_rgba(2,12,27,0.28)] sm:px-7 sm:py-7 lg:px-8 lg:py-8">
      <div className="pointer-events-none absolute inset-0 bg-[image:var(--hero-glow)]" />
      <div className="pointer-events-none absolute inset-[1px] rounded-[33px] border border-white/6" />

      <div className="relative">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-4xl">
            <h1 className="whitespace-nowrap text-[1.12rem] font-extrabold uppercase tracking-[0.08em] text-[color:var(--hero-title)] sm:text-[1.45rem] sm:tracking-[0.1em] lg:text-[1.8rem] xl:text-[2.05rem]">
              Defibrillating the Data
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[color:var(--hero-body)] sm:text-[15px]">
              EDCritix scans new emergency medicine papers, guidelines, and FOAMed resources, ranks and sorts them into the most clinically useful articles for frontline practice, and provides concise summaries, clinical takeaways, and links to the original source.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:w-[25rem] xl:grid-cols-1">
            <div className="rounded-[20px] border border-[color:var(--hero-card-border)] bg-[color:var(--hero-card-bg)] px-4 py-3 backdrop-blur-sm">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--hero-card-label)]">Edition</div>
              <div className="mt-1 text-base font-semibold leading-tight text-[color:var(--hero-card-text)]">{editionLabel}</div>
            </div>
            <div className="rounded-[20px] border border-[color:var(--hero-card-border)] bg-[color:var(--hero-card-bg)] px-4 py-3 backdrop-blur-sm">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--hero-card-label)]">Scope</div>
              <div className="mt-1 text-sm font-medium leading-tight text-[color:var(--hero-card-text)]">
                Top {articleCount} Articles{sourceWindowDays ? ` · Last ${sourceWindowDays}-days` : ""}
              </div>
            </div>
            <Link
              href="/sources"
              className="rounded-[20px] border border-[color:var(--hero-card-border)] bg-[color:var(--hero-card-bg)] px-4 py-3 text-left backdrop-blur-sm transition hover:opacity-90"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--hero-card-label)]">Sources</div>
                  <div className="mt-1 text-sm font-medium leading-tight text-[color:var(--hero-card-text)]">
                    {sourceCatalogSummary.total} Total · {sourceCatalogSummary.online} Online{sourceCatalogSummary.offline ? ` · ${sourceCatalogSummary.offline} Offline` : ""}
                  </div>
                  <div className="mt-1 text-xs leading-tight text-[color:var(--hero-card-label)]">
                    {sourceCatalogSummary.core} Core-tier · {sourceCatalogSummary.standard + sourceCatalogSummary.selective} Supporting
                  </div>
                </div>
                <span className="pt-0.5 text-sm text-[color:var(--hero-card-label)]" aria-hidden>
                  ↗
                </span>
              </div>
            </Link>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {previousHref ? (
            <Link
              href={previousHref}
              className={`${navButtonBase} border-[color:var(--toggle-button-border)] bg-[color:var(--toggle-button-bg)] text-[color:var(--toggle-button-text)]`}
            >
              ← Previous edition
            </Link>
          ) : null}

          {!isCurrent ? (
            <Link
              href="/"
              className={`${navButtonBase} border-[color:var(--button-border)] bg-[color:var(--button-bg)] text-[color:var(--button-text)]`}
            >
              Latest edition
            </Link>
          ) : null}

          <Link
            href="/archive"
            className={`${navButtonBase} border-white/10 bg-white/6 text-slate-100`}
          >
            Browse archive
          </Link>

          {nextHref ? (
            <Link
              href={nextHref}
              className={`${navButtonBase} border-white/10 bg-white/6 text-slate-100`}
            >
              Next edition →
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
