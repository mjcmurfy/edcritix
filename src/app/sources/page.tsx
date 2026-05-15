import { PageShell } from "@/components/page-shell";
import { sourceCatalog, sourceCatalogSummary } from "@/lib/feed";

const tagBaseClass = "rounded-full border px-2.5 py-0.5 text-[11px] leading-5";

const qualityTone: Record<string, string> = {
  core: "border-[color:var(--button-border)] bg-[color:var(--button-bg)] text-[color:var(--button-text)]",
  standard: "border-[color:var(--toggle-button-border)] bg-[color:var(--toggle-button-bg)] text-[color:var(--toggle-button-text)]",
  selective: "border-[color:var(--pill-border)] bg-[color:var(--pill-bg)] text-[color:var(--pill-text)]",
};

const statusTone: Record<string, string> = {
  online: "border-[color:var(--toggle-button-border)] bg-[color:var(--toggle-button-bg)] text-[color:var(--toggle-button-text)]",
  offline: "border-rose-400/25 bg-rose-400/12 text-rose-700 dark:text-rose-200",
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
    "emj-ahead": "Emergency Medicine Journal (EMJ)",
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
      if (part === "foamed") return "FoamED";
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

export default function SourcesPage() {
  const sources = [...sourceCatalog].sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority;
    if (b.itemsKept !== a.itemsKept) return b.itemsKept - a.itemsKept;
    return a.name.localeCompare(b.name);
  });

  return (
    <PageShell>
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-7 px-5 pb-6 pt-3 sm:gap-9 sm:px-8 sm:pb-8 sm:pt-4 lg:px-10 lg:pb-12 lg:pt-5">
        <section className="rounded-[30px] border border-[color:var(--hero-badge-border)] bg-[image:var(--hero-surface)] px-5 py-5 shadow-[0_24px_70px_rgba(2,12,27,0.22)] sm:px-7 sm:py-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="inline-flex items-center rounded-full border border-[color:var(--archive-pill-border)] bg-[color:var(--archive-pill-bg)] px-4 py-2 text-[1.2rem] font-semibold tracking-tight text-[color:var(--hero-title)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm sm:px-5 sm:text-[1.45rem]">
              Sources
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[color:var(--hero-body)] sm:text-[15px]">
              EDCritix ingests data from EM journals, FoamED sources, society feeds, and other emergency medicine resources from the live source list below.
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[20px] border border-[color:var(--hero-card-border)] bg-[color:var(--hero-card-bg)] px-4 py-3 backdrop-blur-sm">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--hero-card-label)]">Coverage</div>
              <div className="mt-1 text-sm font-medium leading-tight text-[color:var(--hero-card-text)]">{sourceCatalogSummary.total} Sources</div>
            </div>
            <div className="rounded-[20px] border border-[color:var(--hero-card-border)] bg-[color:var(--hero-card-bg)] px-4 py-3 backdrop-blur-sm">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--hero-card-label)]">Status</div>
              <div className="mt-1 text-sm font-medium leading-tight text-[color:var(--hero-card-text)]">{sourceCatalogSummary.online} Online{sourceCatalogSummary.offline ? ` · ${sourceCatalogSummary.offline} Offline` : ""}</div>
            </div>
            <div className="rounded-[20px] border border-[color:var(--hero-card-border)] bg-[color:var(--hero-card-bg)] px-4 py-3 backdrop-blur-sm">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--hero-card-label)]">Quality mix</div>
              <div className="mt-1 text-sm font-medium leading-tight text-[color:var(--hero-card-text)]">{sourceCatalogSummary.core} Core-tier</div>
            </div>
            <div className="rounded-[20px] border border-[color:var(--hero-card-border)] bg-[color:var(--hero-card-bg)] px-4 py-3 backdrop-blur-sm">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--hero-card-label)]">Supporting</div>
              <div className="mt-1 text-sm font-medium leading-tight text-[color:var(--hero-card-text)]">{sourceCatalogSummary.standard + sourceCatalogSummary.selective} Standard / Selective</div>
            </div>
          </div>
        </section>

        <section className="grid gap-3">
          {sources.map((source) => (
            <article
              key={source.id}
              className="rounded-[24px] border border-[color:var(--border)] bg-[color:var(--panel)] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.12)]"
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base font-semibold tracking-tight text-[color:var(--foreground-strong)] sm:text-lg">
                      {displaySourceName(source)}
                    </h2>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[color:var(--muted)]">
                      <span className={`${tagBaseClass} ${statusTone[source.status] ?? statusTone.online}`}>
                        {labelStatus(source.status)}
                      </span>
                      <span className={`${tagBaseClass} ${qualityTone[source.qualityTier] ?? qualityTone.standard}`}>
                        {labelQualityTier(source.qualityTier)}
                      </span>
                      <span className={`${tagBaseClass} border-[color:var(--pill-border)] bg-[color:var(--pill-bg)] text-[color:var(--pill-text)]`}>
                        {displaySourceCategory(source)}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 self-start text-right text-xs leading-5 text-[color:var(--muted)]">
                    <div>{source.itemsKept} kept</div>
                    <div>{source.itemsSeen} seen</div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </PageShell>
  );
}
