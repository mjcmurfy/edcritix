import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { currentEditionDate, editionArchive, getEditionHref, formatDateTime } from "@/lib/feed";

export default function ArchivePage() {
  return (
    <PageShell>
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-7 px-5 pb-6 pt-3 sm:gap-9 sm:px-8 sm:pb-8 sm:pt-4 lg:px-10 lg:pb-12 lg:pt-5">
        <section className="rounded-[34px] border border-[color:var(--hero-badge-border)] bg-[linear-gradient(155deg,rgba(17,24,39,0.92),rgba(8,15,27,0.84))] px-5 py-6 shadow-[0_30px_90px_rgba(2,12,27,0.28)] sm:px-7 sm:py-7 lg:px-8 lg:py-8">
          <div className="max-w-3xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-200/75">Edition archive</div>
            <h1 className="mt-3 text-[1.9rem] font-semibold tracking-tight text-white sm:text-[2.4rem]">
              Browse past EDCritix editions
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-200 sm:text-[15px]">
              Move back through recent editions, reopen the editor note, and compare how the top reads changed from day to day.
            </p>
          </div>
        </section>

        <section className="grid gap-4">
          {editionArchive.map((edition) => {
            const href = getEditionHref(edition.date);
            const isCurrent = edition.date === currentEditionDate;
            return (
              <Link
                key={edition.date}
                href={href}
                className="group rounded-[28px] border border-[color:var(--border)] bg-[color:var(--panel)] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.12)] transition hover:border-[color:var(--hero-badge-border)] hover:bg-[color:var(--panel-strong)]"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[color:var(--muted)]">
                      <span className="rounded-full border border-[color:var(--pill-border)] bg-[color:var(--pill-bg)] px-3 py-1 text-[color:var(--pill-text)]">
                        {edition.label}
                      </span>
                      {isCurrent ? (
                        <span className="rounded-full border border-[color:var(--button-border)] bg-[color:var(--button-bg)] px-3 py-1 text-[color:var(--button-text)]">
                          Current
                        </span>
                      ) : null}
                    </div>
                    <h2 className="mt-3 text-xl font-semibold tracking-tight text-[color:var(--foreground-strong)] transition group-hover:text-white sm:text-2xl">
                      {edition.headline}
                    </h2>
                    <p className="mt-3 max-w-[54rem] text-sm leading-7 text-[color:var(--muted-soft)]">
                      {edition.summary}
                    </p>
                  </div>

                  <div className="shrink-0 text-sm text-[color:var(--muted)] sm:text-right">
                    <div>{edition.articleCount ?? edition.articles.length} reads</div>
                    <div className="mt-1">Updated {formatDateTime(edition.editorialGeneratedAt ?? edition.generatedAt ?? null)}</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      </main>
    </PageShell>
  );
}
