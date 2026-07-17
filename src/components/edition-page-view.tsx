import { DailyBriefingOverview } from "@/components/daily-briefing-overview";
import { EditionMasthead } from "@/components/edition-masthead";
import { EditorNotePanel } from "@/components/editor-note-panel";
import { PageShell } from "@/components/page-shell";
import { SelectedReadsSection } from "@/components/selected-reads-section";
import type { Edition } from "@/lib/feed";

export function EditionPageView({
  edition,
  previousHref,
  nextHref,
  isCurrent,
}: {
  edition: Edition;
  previousHref?: string | null;
  nextHref?: string | null;
  isCurrent: boolean;
}) {
  const summary = edition.summary?.trim() || "No daily editorial is available for this edition yet.";

  return (
    <PageShell>
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-6 pt-4 sm:px-6 sm:pb-8 lg:px-8 lg:pb-10">
        <EditionMasthead
          editionLabel={edition.label}
          sourceWindowDays={edition.sourceWindowDays ?? null}
          articleCount={edition.articleCount ?? edition.articles.length}
          updatedAt={edition.editorialGeneratedAt ?? edition.generatedAt ?? null}
          previousHref={previousHref}
          nextHref={nextHref}
          isCurrent={isCurrent}
        />

        <DailyBriefingOverview edition={edition} />

        <EditorNotePanel label="Daily Editorial" headline={edition.headline} summary={summary} />

        <SelectedReadsSection
          articles={edition.articles}
          label={isCurrent ? undefined : "Selected reads"}
          heading={
            isCurrent
              ? `Today's top ${edition.articles.length} Articles`
              : `${edition.articles.length} Articles in the ${edition.label} edition`
          }
        />
      </main>
    </PageShell>
  );
}
