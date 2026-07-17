import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { sourceCatalogSummary } from "@/lib/feed";

const sections = [
  {
    title: "What EDCritix is for",
    body: "EDCritix is a current-awareness tool for emergency medicine reading. It helps clinicians notice potentially relevant papers, guidelines, consensus updates, and FOAMed analysis without scanning every source manually.",
  },
  {
    title: "How items are ranked",
    body: "Ranking prioritises emergency medicine relevance, potential practice impact, recency, source quality, and whether the item has a clear bedside or systems implication. The result is a reading queue, not a guideline.",
  },
  {
    title: "How summaries should be used",
    body: "Summaries and takeaways are designed to help decide whether to open the original source. The original article, local policy, and clinical judgment remain authoritative.",
  },
  {
    title: "Known limitations",
    body: "Some items are summarised from abstract and metadata layers rather than full text. AI-assisted synthesis can miss nuance or produce malformed details, so clinically important claims should be checked against the source.",
  },
];

const labels = [
  ["Practice-changing", "Read first. Potentially important for bedside care or departmental process."],
  ["High-yield", "Worth scanning soon because the topic is common, consequential, or operationally useful."],
  ["Worth watching", "Interesting signal that may need corroboration or is less immediately actionable."],
  ["Background", "Useful context, lower immediate practice signal."],
];

export default function MethodologyPage() {
  return (
    <PageShell>
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-8 pt-4 sm:px-6 lg:px-8 lg:pb-12">
        <section className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-sm sm:p-6 lg:p-7">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-faint)]">
            Methods
          </div>
          <h1 className="mt-2 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-[color:var(--foreground-strong)] sm:text-4xl">
            How EDCritix turns a source scan into a clinical reading queue
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[color:var(--muted-soft)]">
            The site is intentionally transparent about source coverage, ranking labels, and limitations so first-time readers can judge whether a signal deserves their time.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/sources"
              className="rounded-md border border-[color:var(--button-border)] bg-[color:var(--button-bg)] px-3 py-2 text-sm font-medium text-[color:var(--button-text)] hover:opacity-90"
            >
              View sources
            </Link>
            <Link
              href="/"
              className="rounded-md border border-[color:var(--button-muted-border)] bg-[color:var(--button-muted-bg)] px-3 py-2 text-sm font-medium text-[color:var(--button-muted-text)] hover:bg-[color:var(--surface-subtle)]"
            >
              Today&apos;s edition
            </Link>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          {sections.map((section) => (
            <article key={section.title} className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-sm sm:p-5">
              <h2 className="text-lg font-semibold tracking-tight text-[color:var(--foreground-strong)]">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[color:var(--muted-soft)]">{section.body}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-5 lg:grid-cols-[1fr_20rem]">
          <div className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] shadow-sm">
            <div className="border-b border-[color:var(--border)] px-4 py-3 sm:px-5">
              <h2 className="text-lg font-semibold tracking-tight text-[color:var(--foreground-strong)]">
                Ranking labels
              </h2>
            </div>
            <div className="divide-y divide-[color:var(--border)]">
              {labels.map(([label, body]) => (
                <div key={label} className="grid gap-2 px-4 py-4 sm:grid-cols-[12rem_1fr] sm:px-5">
                  <div className="font-semibold text-[color:var(--foreground-strong)]">{label}</div>
                  <div className="text-sm leading-6 text-[color:var(--muted-soft)]">{body}</div>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-sm">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-faint)]">
              Current coverage
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-[color:var(--muted)]">Total sources</dt>
                <dd className="mt-1 text-2xl font-semibold text-[color:var(--foreground-strong)]">{sourceCatalogSummary.total}</dd>
              </div>
              <div>
                <dt className="text-[color:var(--muted)]">Online</dt>
                <dd className="mt-1 text-2xl font-semibold text-[color:var(--foreground-strong)]">{sourceCatalogSummary.online}</dd>
              </div>
              <div>
                <dt className="text-[color:var(--muted)]">Core tier</dt>
                <dd className="mt-1 text-2xl font-semibold text-[color:var(--foreground-strong)]">{sourceCatalogSummary.core}</dd>
              </div>
              <div>
                <dt className="text-[color:var(--muted)]">Supporting</dt>
                <dd className="mt-1 text-2xl font-semibold text-[color:var(--foreground-strong)]">
                  {sourceCatalogSummary.standard + sourceCatalogSummary.selective}
                </dd>
              </div>
            </dl>
          </aside>
        </section>
      </main>
    </PageShell>
  );
}
