import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import {
  articles,
  getArticleBottomLine,
  getArticleHref,
  getArticleTopics,
  type Article,
} from "@/lib/feed";

function buildTopicGroups() {
  const groups = new Map<string, Article[]>();

  for (const article of articles) {
    for (const topic of getArticleTopics(article)) {
      groups.set(topic, [...(groups.get(topic) ?? []), article]);
    }
  }

  return [...groups.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));
}

export default function TopicsPage() {
  const groups = buildTopicGroups();

  return (
    <PageShell>
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-8 pt-4 sm:px-6 lg:px-8 lg:pb-12">
        <section className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-sm sm:p-6 lg:p-7">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-faint)]">
            Topics
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[color:var(--foreground-strong)] sm:text-4xl">
            Browse today&apos;s edition by clinical area
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[color:var(--muted-soft)]">
            A topic-first view of the current reading queue for clinicians who arrive with a specific area in mind.
          </p>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          {groups.map(([topic, topicArticles]) => {
            const lead = topicArticles[0];

            return (
              <article key={topic} className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-sm sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-lg font-semibold tracking-tight text-[color:var(--foreground-strong)]">
                    {topic}
                  </h2>
                  <span className="rounded-md border border-[color:var(--pill-border)] bg-[color:var(--pill-bg)] px-2 py-1 text-xs text-[color:var(--pill-muted-text)]">
                    {topicArticles.length}
                  </span>
                </div>

                {lead ? (
                  <Link href={getArticleHref(lead)} className="group mt-4 block">
                    <div className="text-sm font-semibold leading-snug text-[color:var(--foreground-strong)] group-hover:text-[color:var(--accent)]">
                      {lead.title}
                    </div>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-[color:var(--muted-soft)]">
                      {getArticleBottomLine(lead)}
                    </p>
                    <div className="mt-3 text-xs text-[color:var(--muted)]">
                      {lead.source} / {lead.published}
                    </div>
                  </Link>
                ) : null}
              </article>
            );
          })}
        </section>
      </main>
    </PageShell>
  );
}
