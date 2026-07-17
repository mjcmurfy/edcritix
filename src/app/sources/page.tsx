import { PageShell } from "@/components/page-shell";
import { sourceCatalog, sourceCatalogSummary } from "@/lib/feed";

const tagBaseClass = "rounded-md border px-2 py-1 text-xs leading-none";

const qualityTone: Record<string, string> = {
  core: "border-[color:var(--button-border)] bg-[color:var(--button-bg)] text-[color:var(--button-text)]",
  standard: "border-[color:var(--toggle-button-border)] bg-[color:var(--toggle-button-bg)] text-[color:var(--toggle-button-text)]",
  selective: "border-[color:var(--pill-border)] bg-[color:var(--pill-bg)] text-[color:var(--pill-text)]",
};

const statusTone: Record<string, string> = {
  online: "border-[color:var(--impact-practice-border)] bg-[color:var(--impact-practice-bg)] text-[color:var(--impact-practice-text)]",
  offline: "border-rose-300 bg-rose-50 text-rose-700",
};

function labelQualityTier(value: string) {
  if (value === "core") return "Core tier";
  if (value === "standard") return "Standard";
  return "Selective";
}

function labelStatus(value: string) {
  return value === "online" ? "Online" : "Offline";
}

function displaySourceName(source: { id: string; name: string }) {
  const expandedNames: Record<string, string> = {
    "emj-current": "Emergency Medicine Journal (EMJ)",
    "emj-ahead": "Emergency Medicine Journal (EMJ) Ahead of Print",
    "pubmed-ajem": "American Journal of Emergency Medicine (AJEM)",
    "pubmed-sjtrem": "Scandinavian Journal of Trauma, Resuscitation and Emergency Medicine (SJTREM)",
    "pubmed-westjem": "Western Journal of Emergency Medicine (WestJEM)",
    "pubmed-cjem": "Canadian Journal of Emergency Medicine (CJEM)",
    "pubmed-jacep-open": "Journal of the American College of Emergency Physicians Open (JACEP Open)",
  };

  return expandedNames[source.id] ?? source.name;
}

function displaySourceCategory(source: { id: string; category: string }) {
  if (source.id === "pocus-journal") return "Journal";

  const normalized = source.category.trim().toLowerCase();
  if (normalized === "pubmed-journal") return "Journal";

  return normalized
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => {
      if (part === "foamed") return "FOAMed";
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

function sourceBucket(source: { category: string; id: string }) {
  const category = source.category.toLowerCase();
  if (category.includes("journal") || source.id === "pocus-journal") return "Journals";
  if (category.includes("foamed") || category.includes("podcast")) return "FOAMed";
  if (category.includes("society") || category.includes("news")) return "Society / News";
  return "Other EM sources";
}

export default function SourcesPage() {
  const sources = [...sourceCatalog].sort((a, b) => {
    const bucketCompare = sourceBucket(a).localeCompare(sourceBucket(b));
    if (bucketCompare !== 0) return bucketCompare;
    if (b.priority !== a.priority) return b.priority - a.priority;
    if (b.itemsKept !== a.itemsKept) return b.itemsKept - a.itemsKept;
    return displaySourceName(a).localeCompare(displaySourceName(b));
  });

  const grouped = sources.reduce<Record<string, typeof sources>>((acc, source) => {
    const bucket = sourceBucket(source);
    acc[bucket] = acc[bucket] ?? [];
    acc[bucket].push(source);
    return acc;
  }, {});

  return (
    <PageShell>
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-8 pt-4 sm:px-6 lg:px-8 lg:pb-12">
        <section className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-sm sm:p-6 lg:p-7">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-faint)]">
            Source registry
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[color:var(--foreground-strong)] sm:text-4xl">
            What EDCritix scans
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[color:var(--muted-soft)]">
            The registry shows the live source list behind each edition. “Seen” is the number of feed items inspected in the latest source pass; “kept” is the subset retained for ranking after relevance filtering and deduplication.
          </p>

          <dl className="mt-5 grid gap-3 sm:grid-cols-4">
            <div className="rounded-md border border-[color:var(--border)] bg-[color:var(--surface-subtle)] p-3">
              <dt className="text-xs text-[color:var(--muted)]">Coverage</dt>
              <dd className="mt-1 text-xl font-semibold text-[color:var(--foreground-strong)]">{sourceCatalogSummary.total}</dd>
            </div>
            <div className="rounded-md border border-[color:var(--border)] bg-[color:var(--surface-subtle)] p-3">
              <dt className="text-xs text-[color:var(--muted)]">Online</dt>
              <dd className="mt-1 text-xl font-semibold text-[color:var(--foreground-strong)]">{sourceCatalogSummary.online}</dd>
            </div>
            <div className="rounded-md border border-[color:var(--border)] bg-[color:var(--surface-subtle)] p-3">
              <dt className="text-xs text-[color:var(--muted)]">Core tier</dt>
              <dd className="mt-1 text-xl font-semibold text-[color:var(--foreground-strong)]">{sourceCatalogSummary.core}</dd>
            </div>
            <div className="rounded-md border border-[color:var(--border)] bg-[color:var(--surface-subtle)] p-3">
              <dt className="text-xs text-[color:var(--muted)]">Supporting</dt>
              <dd className="mt-1 text-xl font-semibold text-[color:var(--foreground-strong)]">
                {sourceCatalogSummary.standard + sourceCatalogSummary.selective}
              </dd>
            </div>
          </dl>
        </section>

        {Object.entries(grouped).map(([bucket, bucketSources]) => (
          <section key={bucket} className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] shadow-sm">
            <div className="border-b border-[color:var(--border)] px-4 py-3 sm:px-5">
              <h2 className="text-lg font-semibold tracking-tight text-[color:var(--foreground-strong)]">{bucket}</h2>
              <div className="mt-1 text-sm text-[color:var(--muted)]">{bucketSources.length} sources</div>
            </div>

            <div className="divide-y divide-[color:var(--border)]">
              {bucketSources.map((source) => (
                <article key={source.id} className="grid gap-3 px-4 py-4 sm:grid-cols-[1fr_12rem] sm:px-5">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold tracking-tight text-[color:var(--foreground-strong)]">
                        {displaySourceName(source)}
                      </h3>
                      <span className={`${tagBaseClass} ${statusTone[source.status] ?? statusTone.online}`}>
                        {labelStatus(source.status)}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[color:var(--muted)]">
                      <span className={`${tagBaseClass} ${qualityTone[source.qualityTier] ?? qualityTone.standard}`}>
                        {labelQualityTier(source.qualityTier)}
                      </span>
                      <span className={`${tagBaseClass} border-[color:var(--pill-border)] bg-[color:var(--pill-bg)] text-[color:var(--pill-text)]`}>
                        {displaySourceCategory(source)}
                      </span>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${tagBaseClass} border-[color:var(--button-muted-border)] bg-[color:var(--button-muted-bg)] font-medium text-[color:var(--button-muted-text)] hover:bg-[color:var(--surface-subtle)]`}
                      >
                        Open feed
                      </a>
                    </div>
                  </div>

                  <dl className="grid grid-cols-2 gap-3 text-sm sm:text-right">
                    <div>
                      <dt className="text-[color:var(--muted)]">Kept</dt>
                      <dd className="mt-1 font-semibold text-[color:var(--foreground-strong)]">{source.itemsKept}</dd>
                    </div>
                    <div>
                      <dt className="text-[color:var(--muted)]">Seen</dt>
                      <dd className="mt-1 font-semibold text-[color:var(--foreground-strong)]">{source.itemsSeen}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
    </PageShell>
  );
}
