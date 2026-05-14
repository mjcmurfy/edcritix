import { EditionPageView } from "@/components/edition-page-view";
import { currentEdition, getEditionHref, getEditionNeighbors } from "@/lib/feed";

export default function Home() {
  const neighbors = getEditionNeighbors(currentEdition.date);

  return (
    <EditionPageView
      edition={currentEdition}
      previousHref={neighbors.previous ? getEditionHref(neighbors.previous.date) : null}
      nextHref={neighbors.next ? getEditionHref(neighbors.next.date) : null}
      isCurrent
    />
  );
}
