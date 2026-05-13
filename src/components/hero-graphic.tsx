import Link from "next/link";
import type { Article, FeedMeta, Stat } from "@/lib/mock-data";

const impactClasses: Record<Article["impact"], string> = {
  "Practice-changing": "border-emerald-300/20 bg-emerald-400/10 text-emerald-100",
  "High-yield": "border-cyan-300/20 bg-cyan-400/10 text-cyan-100",
  "Worth watching": "border-amber-300/20 bg-amber-400/10 text-amber-100",
  Background: "border-white/10 bg-white/10 text-slate-200",
};

function formatUpdateLabel(iso: string | null) {
  if (!iso) return "Update pending";

  return new Intl.DateTimeFormat("en-NZ", {
    timeZone: "Pacific/Auckland",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function HeroGraphic({
  articles,
  stats,
  feedMeta,
}: {
  articles: Article[];
  stats: Stat[];
  feedMeta: FeedMeta;
}) {
  const [lead, ...rest] = articles;
  const nextReads = rest.slice(0, 3);
  const sourceCounts = articles.reduce<Record<string, number>>((acc, article) => {
    acc[article.source] = (acc[article.source] ?? 0) + 1;
    return acc;
  }, {});
  const topSources = Object.entries(sourceCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  if (!lead) {
    return null;
  }

  return (
    <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(12,20,34,0.84),rgba(15,23,42,0.72))] p-6 shadow-[0_24px_80px_rgba(2,12,27,0.28)] backdrop-blur-xl">
      <div className="flex flex-col gap-4 border-b border-white/8 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.34em] text-cyan-300/70">
            Signal box
          </div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            What to read next
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Live feed, ranked. Open the lead read or skim the next few items.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
          <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-emerald-200">
            Updated {formatUpdateLabel(feedMeta.editorialGeneratedAt ?? feedMeta.generatedAt)}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
            {feedMeta.sourceWindowDays}-day scan
          </span>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-4">
          <Link
            href={`/articles/${lead.slug}`}
            className="group block rounded-[24px] border border-white/10 bg-white/[0.05] p-5 transition hover:border-cyan-300/30 hover:bg-white/[0.08]"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className={`rounded-full border px-3 py-1 ${impactClasses[lead.impact]}`}>
                {lead.impact}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">
                {lead.source}
              </span>
              <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-slate-400">
                {lead.published}
              </span>
            </div>

            <div className="mt-4 text-sm text-slate-400">Lead read</div>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white transition group-hover:text-cyan-100">
              {lead.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{lead.whyItMatters}</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[18px] border border-white/8 bg-slate-900/45 p-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.26em] text-cyan-300/65">
                  Signal
                </div>
                <p className="mt-2 text-sm text-white">{lead.evidenceSignal}</p>
              </div>
              <div className="rounded-[18px] border border-white/8 bg-slate-900/45 p-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.26em] text-cyan-300/65">
                  Angle
                </div>
                <p className="mt-2 text-sm text-slate-300 line-clamp-3">{lead.editorialAngle}</p>
              </div>
            </div>

            <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan-200">
              Open analysis
              <span aria-hidden="true" className="transition group-hover:translate-x-1">
                →
              </span>
            </div>
          </Link>

          <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="text-sm font-medium text-white">Queue</div>
              <Link href="/briefing" className="text-sm text-cyan-200 hover:text-cyan-100">
                Open full briefing
              </Link>
            </div>
            <div className="space-y-3">
              {nextReads.map((article, index) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="group flex gap-4 rounded-[18px] border border-white/8 bg-slate-900/45 p-4 transition hover:border-cyan-300/25 hover:bg-slate-900/65"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-slate-300">
                    {index + 2}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <span>{article.source}</span>
                      <span>•</span>
                      <span>{article.published}</span>
                    </div>
                    <div className="mt-1 text-sm font-semibold text-white transition group-hover:text-cyan-100">
                      {article.title}
                    </div>
                    <div className="mt-1 text-sm text-slate-300 line-clamp-2">
                      {article.whyItMatters}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4">
                <div className="text-2xl font-semibold tracking-tight text-white">{stat.value}</div>
                <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4">
            <div className="text-sm font-medium text-white">Top sources in this batch</div>
            <div className="mt-3 space-y-3">
              {topSources.map(([source, count]) => (
                <div key={source} className="rounded-[16px] border border-white/8 bg-slate-900/40 p-3">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <div className="text-slate-200">{source}</div>
                    <div className="text-slate-400">{count}</div>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
                    <div className="h-full rounded-full bg-cyan-300" style={{ width: `${(count / articles.length) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {feedMeta.notes ? (
            <div className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4">
              <div className="text-sm font-medium text-white">Editorial note</div>
              <p className="mt-2 text-sm leading-7 text-slate-300">{feedMeta.notes}</p>
              <div className="mt-3 text-xs text-slate-500">
                Source pass {formatUpdateLabel(feedMeta.sourceGeneratedAt)}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
