import { notFound } from "next/navigation";
import { EditionPageView } from "@/components/edition-page-view";
import { editionArchive, getEditionByDate, getEditionHref, getEditionNeighbors } from "@/lib/feed";

export function generateStaticParams() {
  return editionArchive.slice(1).map((edition) => ({ date: edition.date }));
}

export default async function ArchiveEditionPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const edition = getEditionByDate(date);

  if (!edition) {
    notFound();
  }

  const neighbors = getEditionNeighbors(date);

  return (
    <EditionPageView
      edition={edition}
      previousHref={neighbors.previous ? getEditionHref(neighbors.previous.date) : null}
      nextHref={neighbors.next ? getEditionHref(neighbors.next.date) : null}
      isCurrent={false}
    />
  );
}
