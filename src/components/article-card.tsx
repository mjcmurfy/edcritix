import Link from "next/link";
import type { Article } from "@/lib/feed";

const impactClasses: Record<Article["impact"], string> = {
  "Practice-changing": "border-emerald-200 bg-emerald-50 text-emerald-900",
  "High-yield": "border-sky-200 bg-sky-50 text-sky-900",
  "Worth watching": "border-amber-200 bg-amber-50 text-amber-900",
  Background: "border-slate-200 bg-slate-100 text-slate-700",
};

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="rounded-[28px] border border-white/55 bg-white/82 p-6 shadow-[0_20px_45px_rgba(15,23,42,0.1)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/88 hover:shadow-[0_24px_50px_rgba(15,23,42,0.14)]">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full border border-slate-200/80 bg-white/78 px-3 py-1 text-slate-700">
          {article.source}
        </span>
        <span className={`rounded-full border px-3 py-1 ${impactClasses[article.impact]}`}>
          {article.impact}
        </span>
        <span className="rounded-full border border-slate-200/80 bg-white/78 px-3 py-1 text-slate-600">
          {article.sourceAccess}
        </span>
      </div>

      <div className="mt-5">
        <h3 className="text-xl font-semibold tracking-tight text-slate-950">
          {article.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{article.shortSummary}</p>
      </div>

      <div className="mt-5 rounded-[22px] border border-slate-200/70 bg-slate-50/88 p-4">
        <div className="text-[11px] font-semibold uppercase tracking-[0.26em] text-teal-700">
          Bottom line
        </div>
        <p className="mt-2 text-sm leading-7 text-slate-700">{article.bottomLine}</p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs text-slate-600">
          {article.topic}
        </div>
        <Link
          href={`/articles/${article.slug}`}
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Read analysis
        </Link>
      </div>
    </article>
  );
}
