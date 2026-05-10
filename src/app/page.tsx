import { PageShell } from "@/components/page-shell";
import { SelectedReadsSection } from "@/components/selected-reads-section";
import { briefing, dailyEditorial, feedMeta, formatDateTime } from "@/lib/feed";

const editorialItems = dailyEditorial;

function shortenEditorial(text: string) {
  return text.trim();
}

function splitEditorialParagraphs(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export default function Home() {
  const updatedAt = feedMeta.editorialGeneratedAt ?? feedMeta.generatedAt;
  const editorialText = shortenEditorial(briefing.editorialSummary ?? briefing.summary);

  return (
    <PageShell>
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-7 px-5 pb-6 pt-3 sm:gap-12 sm:px-8 sm:pb-8 sm:pt-4 lg:px-10 lg:pb-12 lg:pt-5">
        <section className="pt-0 text-center">
          <div className="mx-auto w-full max-w-5xl">
            <div className="flex w-full flex-col items-center rounded-[28px] border border-[color:var(--hero-badge-border)] bg-[color:var(--hero-badge-bg)] px-6 py-4 text-[color:var(--hero-badge-text)] shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:px-8 sm:py-5">
              <div className="whitespace-nowrap text-[17px] font-extrabold uppercase tracking-[0.16em] sm:text-[1.4rem] sm:tracking-[0.24em]">
                Defibrillating the Data
              </div>
              <div className="mt-1.5 text-center text-[15px] font-medium tracking-tight text-[color:var(--muted)] sm:text-lg">
                The front page for Emergency Medicine
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[34px] border border-[color:var(--border)] bg-[color:var(--panel)] px-5 py-5 shadow-[0_24px_70px_rgba(0,0,0,0.16)] backdrop-blur-sm sm:px-6 sm:py-6 lg:px-8 lg:py-7">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-[1.7rem] font-semibold tracking-tight text-[color:var(--foreground-strong)] sm:text-[2.1rem] lg:text-[2.35rem] lg:leading-[1.08]">
              {briefing.editorialHeadline ?? briefing.headline}
            </h2>
            <div className="mx-auto mt-4 max-w-2xl text-left text-sm leading-6 text-[color:var(--muted-soft)] sm:mt-5 sm:text-base sm:leading-7">
              {splitEditorialParagraphs(editorialText).map((paragraph, index) => (
                <p key={index} className={index === 0 ? "" : "mt-4"}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-[color:var(--muted)]">
            <span className="rounded-full border border-[color:var(--border)] bg-[color:var(--pill-bg)] px-4 py-2">
              Updated {formatDateTime(updatedAt)}
            </span>
          </div>
        </section>

        <SelectedReadsSection articles={editorialItems} />
      </main>
    </PageShell>
  );
}
