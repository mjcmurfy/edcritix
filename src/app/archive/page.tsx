import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { currentEditionDate, editionArchive, getEditionHref } from "@/lib/feed";

function excerpt(text: string, length = 180) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= length) return normalized;
  return `${normalized.slice(0, length).trim()}...`;
}

export default function ArchivePage() {
  return (
    <PageShell>
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-8 pt-4 sm:px-6 lg:px-8 lg:pb-12">
        <section className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-sm sm:p-6 lg:p-7">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-faint)]">
            Archive
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[color:var(--foreground-strong)] sm:text-4xl">
            Previous EDCritix editions
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[color:var(--muted-soft)]">
            Daily briefing history, newest first. Each edition preserves the ranked reading queue and editorial synthesis from that day.
          </p>
        </section>

        <section className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] shadow-sm">
          <div className="divide-y divide-[color:var(--border)]">
            {editionArchive.map((edition) => {
              const href = getEditionHref(edition.date);
              const isCurrent = edition.date === currentEditionDate;
              const displayTitle = edition.headline ?? edition.label;
              return (
                <Link
                  key={edition.date}
                  href={href}
                  className="group grid gap-3 px-4 py-5 transition hover:bg-[color:var(--surface-subtle)] sm:grid-cols-[9rem_1fr_7rem] sm:px-5 lg:px-6"
                >
                  <div>
                    <div className="font-semibold text-[color:var(--foreground-strong)]">{edition.label}</div>
                    {isCurrent ? (
                      <div className="mt-2 inline-flex rounded-md border border-[color:var(--button-border)] bg-[color:var(--button-bg)] px-2 py-1 text-xs font-medium text-[color:var(--button-text)]">
                        Current
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold leading-snug text-[color:var(--foreground-strong)] group-hover:text-[color:var(--accent)]">
                      {displayTitle}
                    </h2>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-[color:var(--muted-soft)]">
                      {excerpt(edition.summary)}
                    </p>
                  </div>

                  <div className="text-sm text-[color:var(--muted)] sm:text-right">
                    <div className="font-semibold text-[color:var(--foreground-strong)]">
                      {edition.articleCount ?? edition.articles.length}
                    </div>
                    <div>articles</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
