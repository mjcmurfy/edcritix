import Link from "next/link";
import { formatDateTime } from "@/lib/feed";

const navButtonBase =
  "inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-medium shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition hover:opacity-90";

export function EditionMasthead({
  editionLabel,
  updatedAt,
  sourceWindowDays,
  articleCount,
  previousHref,
  nextHref,
  isCurrent,
}: {
  editionLabel: string;
  updatedAt: string | null;
  sourceWindowDays?: number | null;
  articleCount: number;
  previousHref?: string | null;
  nextHref?: string | null;
  isCurrent: boolean;
}) {
  return (
    <section className="relative overflow-hidden rounded-[34px] border border-[color:var(--hero-badge-border)] bg-[linear-gradient(155deg,rgba(17,24,39,0.92),rgba(8,15,27,0.84))] px-5 py-6 shadow-[0_30px_90px_rgba(2,12,27,0.28)] sm:px-7 sm:py-7 lg:px-8 lg:py-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_85%_10%,rgba(45,212,191,0.14),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-[1px] rounded-[33px] border border-white/6" />

      <div className="relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-100/90">
              {isCurrent ? "Current edition" : "Archive edition"}
            </div>
            <h1 className="mt-4 text-[1.95rem] font-extrabold uppercase tracking-[0.16em] text-white sm:text-[2.4rem] sm:tracking-[0.22em]">
              Defibrillating the Data
            </h1>
            <p className="mt-2 text-base font-medium tracking-tight text-cyan-100/85 sm:text-lg">
              The front page for Emergency Medicine
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-200 sm:text-[15px]">
              EDCritix scans new emergency medicine papers, guidelines, and FOAMed, ranks the most clinically useful reads for frontline practice, and rewrites them into concise summaries with direct links to the original source.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:w-[25rem] lg:grid-cols-1">
            <div className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200/70">Edition</div>
              <div className="mt-2 text-lg font-semibold text-white">{editionLabel}</div>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200/70">Updated</div>
              <div className="mt-2 text-sm font-medium text-slate-100">{formatDateTime(updatedAt)}</div>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200/70">Edition scope</div>
              <div className="mt-2 text-sm font-medium text-slate-100">
                {articleCount} reads{sourceWindowDays ? ` · ${sourceWindowDays}-day scan` : ""}
              </div>
            </div>
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
