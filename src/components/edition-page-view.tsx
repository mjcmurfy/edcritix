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
  const updatedAt = edition.editorialGeneratedAt ?? edition.generatedAt ?? null;
  const summary = edition.summary?.trim() || "No editor note is available for this edition yet.";

  return (
    <PageShell>
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-7 px-5 pb-6 pt-3 sm:gap-9 sm:px-8 sm:pb-8 sm:pt-4 lg:px-10 lg:pb-12 lg:pt-5">
        <EditionMasthead
          editionLabel={edition.label}
          sourceWindowDays={edition.sourceWindowDays ?? null}
          articleCount={edition.articleCount ?? edition.articles.length}
          previousHref={previousHref}
          nextHref={nextHref}
          isCurrent={isCurrent}
        />

        <EditorNotePanel
          label={isCurrent ? "Daily Editorial" : "Edition note"}
          headline={edition.headline}
          summary={summary}
        />

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
