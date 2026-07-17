"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getArticleBottomLine, getArticleTopics, type Article, type ImpactLevel } from "@/lib/feed";

const impactOptions: Array<ImpactLevel | "all"> = [
  "all",
  "Practice-changing",
  "High-yield",
  "Worth watching",
  "Background",
];

type ArchiveExplorerProps = {
  articles: Article[];
  topics: string[];
  sources: string[];
};

export function ArchiveExplorer({
  articles,
  topics,
  sources,
}: ArchiveExplorerProps) {
  const [query, setQuery] = useState("");
  const [impact, setImpact] = useState<ImpactLevel | "all">("all");
  const [topic, setTopic] = useState("all");
  const [source, setSource] = useState("all");
  const [sort, setSort] = useState<"relevance" | "newest">("relevance");

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const results = articles.filter((article) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          article.title,
          article.source,
          article.topic,
          article.takeaway,
          article.shortSummary,
          article.summary,
          getArticleBottomLine(article),
          ...getArticleTopics(article),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesImpact = impact === "all" || article.impact === impact;
      const matchesTopic =
        topic === "all" ||
        article.topic === topic ||
        getArticleTopics(article).includes(topic);
      const matchesSource = source === "all" || article.source === source;

      return matchesQuery && matchesImpact && matchesTopic && matchesSource;
    });

    return [...results].sort((a, b) => {
      if (sort === "newest") {
        return (Date.parse(b.publishedAt ?? "") || 0) - (Date.parse(a.publishedAt ?? "") || 0);
      }

      return (b.score ?? 0) - (a.score ?? 0);
    });
  }, [articles, impact, query, sort, source, topic]);

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_20px_45px_rgba(15,23,42,0.06)] sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[1.8fr_repeat(4,minmax(0,1fr))]">
          <label className="block">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Search
            </div>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Topic, journal, title, takeaway"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:bg-white"
            />
          </label>

          <label className="block">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Impact
            </div>
            <select
              value={impact}
              onChange={(event) => setImpact(event.target.value as ImpactLevel | "all")}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-400 focus:bg-white"
            >
              {impactOptions.map((option) => (
                <option key={option} value={option}>
                  {option === "all" ? "All impact levels" : option}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Topic
            </div>
            <select
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-400 focus:bg-white"
            >
              <option value="all">All topics</option>
              {topics.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Source
            </div>
            <select
              value={source}
              onChange={(event) => setSource(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-400 focus:bg-white"
            >
              <option value="all">All sources</option>
              {sources.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Sort
            </div>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as "relevance" | "newest")}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-400 focus:bg-white"
            >
              <option value="relevance">Highest editorial relevance</option>
              <option value="newest">Newest first</option>
            </select>
          </label>
        </div>
      </section>

      <div className="flex items-center justify-between gap-3 text-sm text-slate-600">
        <div>
          <span className="font-semibold text-slate-950">{filtered.length}</span> results
        </div>
        {(query || impact !== "all" || topic !== "all" || source !== "all") && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setImpact("all");
              setTopic("all");
              setSource("all");
              setSort("relevance");
            }}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="space-y-4">
        {filtered.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="block rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_16px_35px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(15,23,42,0.08)]"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                {article.source}
              </span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                {article.topic}
              </span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                {article.impact}
              </span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                {article.published}
              </span>
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                  {article.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{article.shortSummary}</p>
              </div>
              <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-teal-700">
                  Quick read
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-700">{getArticleBottomLine(article)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
