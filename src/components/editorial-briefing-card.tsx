import Link from "next/link";
import type { Article } from "@/lib/feed";

const impactClasses: Record<Article["impact"], string> = {
  "Practice-changing": "border-emerald-200 bg-emerald-50 text-emerald-900",
  "High-yield": "border-sky-200 bg-sky-50 text-sky-900",
  "Worth watching": "border-amber-200 bg-amber-50 text-amber-900",
  Background: "border-slate-200 bg-slate-100 text-slate-700",
};

export function EditorialBriefingCard({ article }: { article: Article }) {
  return (
    <details className="group rounded-[30px] border border-slate-200/70 bg-white/74 p-6 shadow-[0_20px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl open:shadow-[0_24px_55px_rgba(15,23,42,0.12)]">
      <summary className="list-none cursor-pointer">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full border border-slate-200/80 bg-white/65 px-3 py-1 text-slate-700">
                {article.source}
              </span>
              <span className={`rounded-full border px-3 py-1 ${impactClasses[article.impact]}`}>
                {article.impact}
              </span>
              <span className="rounded-full border border-slate-200/80 bg-white/65 px-3 py-1 text-slate-600">
                {article.published}
              </span>
              <span className="rounded-full border border-slate-200/80 bg-white/65 px-3 py-1 text-slate-600">
                {article.sourceAccess}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
                {article.title}
              </h3>
              <p className="mt-3 max-w-4xl text-base leading-8 text-slate-600">
                {article.shortSummary}
              </p>
            </div>

            <div className="rounded-[22px] border border-slate-200/70 bg-slate-50/82 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-700">
                Fast takeaway
              </div>
              <p className="mt-2 text-sm leading-7 text-slate-700">{article.takeaway}</p>
            </div>
          </div>

          <div className="hidden rounded-full border border-slate-200/80 bg-white/65 px-4 py-2 text-xs font-medium text-slate-600 md:block">
            Expand analysis
          </div>
        </div>
      </summary>

      <div className="mt-6 grid gap-5 border-t border-slate-200/70 pt-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          <section className="rounded-[24px] border border-slate-200/70 bg-slate-50/82 p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-700">
              Editorial summary
            </div>
            <p className="mt-3 text-base leading-8 text-slate-700">{article.summary}</p>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] border border-slate-200/70 bg-white/78 p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-700">
                Key findings
              </div>
              <ul className="mt-3 space-y-3 text-sm leading-7 text-slate-700">
                {article.keyFindings.map((finding) => (
                  <li key={finding} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-600" />
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[24px] border border-slate-200/70 bg-white/78 p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-700">
                Why it matters in the ED
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-700">{article.whyItMatters}</p>
              <div className="mt-4 rounded-2xl border border-slate-200/70 bg-slate-50/82 p-4 text-sm text-slate-700">
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Editorial angle
                </div>
                <p className="mt-2 leading-7">{article.editorialAngle}</p>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-4">
          <section className="rounded-[24px] border border-slate-200/70 bg-slate-50/82 p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-700">
              Evidence profile
            </div>
            <div className="mt-3 space-y-3 text-sm text-slate-700">
              <div>
                <div className="text-slate-500">Study design</div>
                <div className="mt-1 text-slate-950">{article.studyDesign}</div>
              </div>
              {article.sample ? (
                <div>
                  <div className="text-slate-500">Population / sample</div>
                  <div className="mt-1 text-slate-950">{article.sample}</div>
                </div>
              ) : null}
              <div>
                <div className="text-slate-500">Signal</div>
                <div className="mt-1 text-slate-950">{article.evidenceSignal}</div>
              </div>
              <div>
                <div className="text-slate-500">Reading priority</div>
                <div className="mt-1 text-slate-950">{article.readingPriority ?? "Review"}</div>
              </div>
            </div>
          </section>

          <section className="rounded-[24px] border border-slate-200/70 bg-slate-50/82 p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-700">
              Appraisal notes
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-700">{article.critique}</p>
            <div className="mt-4 rounded-2xl border border-slate-200/70 bg-white/78 p-4 text-sm text-slate-700">
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                Analysis basis
              </div>
              <p className="mt-2 leading-7">{article.analysisProvenance}</p>
            </div>
          </section>

          <section className="rounded-[24px] border border-slate-200/70 bg-slate-50/82 p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-700">
              Questions for practice
            </div>
            <ul className="mt-3 space-y-3 text-sm leading-7 text-slate-700">
              {article.questionsForPractice.map((question) => (
                <li key={question} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-600" />
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/articles/${article.slug}`}
              className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm text-white transition hover:bg-slate-800"
            >
              Open full analysis
            </Link>
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-slate-200/80 bg-white/72 px-4 py-2 text-sm text-slate-800 transition hover:bg-white/85"
            >
              Open source
            </a>
          </div>
        </div>
      </div>
    </details>
  );
}
