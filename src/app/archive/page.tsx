import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { currentEditionDate, editionArchive, getEditionHref } from "@/lib/feed";

export default function ArchivePage() {
  return (
    <PageShell>
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-7 px-5 pb-6 pt-3 sm:gap-9 sm:px-8 sm:pb-8 sm:pt-4 lg:px-10 lg:pb-12 lg:pt-5">
        <section className="rounded-[30px] border border-[color:var(--hero-badge-border)] bg-[image:var(--hero-surface)] px-5 py-4 shadow-[0_24px_70px_rgba(2,12,27,0.22)] sm:px-7 sm:py-5 lg:px-8">
          <h1 className="inline-flex items-center rounded-full border border-[color:var(--archive-pill-border)] bg-[color:var(--archive-pill-bg)] px-4 py-2 text-[1.2rem] font-semibold tracking-tight text-[color:var(--hero-title)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm sm:px-5 sm:text-[1.45rem]">
            EDCritix Archive
          </h1>
        </section>

        <section className="grid gap-4">
          {editionArchive.map((edition) => {
            const href = getEditionHref(edition.date);
            const isCurrent = edition.date === currentEditionDate;
            const displayTitle = edition.headline ?? edition.label;
            return (
              <Link
                key={edition.date}
                href={href}
                className="group rounded-[28px] border border-[color:var(--border)] bg-[color:var(--panel)] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.12)] transition hover:border-[color:var(--hero-badge-border)] hover:bg-[color:var(--panel-strong)]"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-4xl">
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
                    <h2 className="mt-3 text-lg font-semibold tracking-tight text-[color:var(--foreground-strong)] transition group-hover:text-[color:var(--hero-title)] sm:text-xl">
                      {displayTitle}
                    </h2>
                  </div>

                  <div className="shrink-0 text-sm text-[color:var(--muted)] sm:text-right">
                    <div>{edition.articleCount ?? edition.articles.length} Articles</div>
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
