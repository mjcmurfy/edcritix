"use client";

import type { Article } from "@/lib/feed";
import { useEffect, useState, type ReactNode } from "react";

const impactClasses: Record<Article["impact"], string> = {
  "Practice-changing": "border-[color:var(--impact-practice-border)] bg-[color:var(--impact-practice-bg)] text-[color:var(--impact-practice-text)]",
  "High-yield": "border-[color:var(--impact-high-border)] bg-[color:var(--impact-high-bg)] text-[color:var(--impact-high-text)]",
  "Worth watching": "border-[color:var(--impact-watch-border)] bg-[color:var(--impact-watch-bg)] text-[color:var(--impact-watch-text)]",
  Background: "border-[color:var(--impact-background-border)] bg-[color:var(--impact-background-bg)] text-[color:var(--impact-background-text)]",
};

function MobileExpandableText({
  text,
  mobileLines,
  desktopClassName,
  minExpandableChars = 260,
}: {
  text: string;
  mobileLines: string;
  desktopClassName: string;
  minExpandableChars?: number;
}) {
  const trimmed = text.trim();
  const isExpandable = trimmed.length > minExpandableChars;

  return (
    <>
      <p className={`hidden sm:block ${desktopClassName}`}>{trimmed}</p>
      {isExpandable ? (
        <details className="group sm:hidden">
          <summary className="list-none cursor-pointer [&::-webkit-details-marker]:hidden">
            <p className={`${desktopClassName} ${mobileLines} group-open:line-clamp-none`}>{trimmed}</p>
            <div className="mt-2 text-[11px] font-medium text-[color:var(--inline-link-text)]">
              <span className="group-open:hidden">Show more</span>
              <span className="hidden group-open:inline">Show less</span>
            </div>
          </summary>
        </details>
      ) : (
        <p className={`sm:hidden ${desktopClassName}`}>{trimmed}</p>
      )}
    </>
  );
}

function MetaPill({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`rounded-full border px-2.5 py-1 sm:px-3 ${className}`}>{children}</span>;
}

function displaySource(source: string) {
  return source.replace(/^PubMed RSS:\s*/i, "");
}

export function DailyEditorialCard({ article, index }: { article: Article; index: number }) {
  return <DailyEditorialCardInner article={article} index={index} compact={false} />;
}

export function DailyEditorialCardInner({
  article,
  index,
  compact = false,
}: {
  article: Article;
  index: number;
  compact?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(!compact);

  useEffect(() => {
    setIsExpanded(!compact);
  }, [compact]);

  return (
    <article className="rounded-[26px] border border-[color:var(--border)] bg-[color:var(--panel)] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.12)] backdrop-blur-sm sm:rounded-[30px] sm:p-6">
      <div>
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] sm:gap-2 sm:text-xs">
          <MetaPill className="border-[color:var(--number-pill-border)] bg-[color:var(--number-pill-bg)] font-extrabold text-[color:var(--number-pill-text)] shadow-[0_6px_18px_rgba(0,0,0,0.12)]">
            {String(index + 1).padStart(2, "0")}
          </MetaPill>
          <MetaPill className="border-[color:var(--pill-border)] bg-[color:var(--pill-bg)] text-[color:var(--pill-text)]">
            {article.published}
          </MetaPill>
          <MetaPill className={impactClasses[article.impact]}>{article.impact}</MetaPill>
          <MetaPill className="border-[color:var(--pill-border)] bg-[color:var(--pill-bg)] text-[color:var(--pill-muted-text)]">{article.topic}</MetaPill>
          {article.confidence ? (
            <MetaPill className="border-[color:var(--pill-border)] bg-[color:var(--pill-bg)] text-[color:var(--pill-muted-text)]">
              Confidence: {article.confidence}
            </MetaPill>
          ) : null}
          <MetaPill className="border-[color:var(--pill-border)] bg-[color:var(--pill-bg)] text-[color:var(--pill-text)]">
            Source: {displaySource(article.source)}
          </MetaPill>
        </div>

        <h2 className="mt-3 max-w-4xl text-[1.02rem] font-semibold leading-snug tracking-tight text-[color:var(--foreground-strong)] sm:mt-4 sm:text-[1.5rem] sm:leading-[1.16]">
          {article.title}
        </h2>

        {isExpanded ? (
          <>
            <div className="mt-4 rounded-[20px] border border-[color:var(--border)] bg-[color:var(--panel-muted)] p-3.5 sm:mt-5 sm:rounded-[22px] sm:p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--section-label-text)] sm:text-[11px] sm:tracking-[0.28em]">
                Editorial summary
              </div>
              <div className="mt-2 max-w-3xl">
                <MobileExpandableText
                  text={article.summary}
                  mobileLines="line-clamp-4"
                  desktopClassName="text-sm leading-6 text-[color:var(--muted-soft)] sm:text-base sm:leading-7"
                />
              </div>
            </div>

            <div className="mt-3 sm:mt-4">
              <div className="rounded-[20px] border border-[color:var(--border)] bg-[color:var(--panel-muted-strong)] p-3 sm:rounded-[22px] sm:p-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--section-label-text)] sm:text-[11px] sm:tracking-[0.28em]">
                  Clinical takeaway
                </div>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-[color:var(--muted-soft)] sm:text-base sm:leading-7">{article.takeaway}</p>
              </div>
            </div>
          </>
        ) : null}

        <div className={`mt-4 flex flex-row items-center justify-end gap-2 sm:gap-4 ${isExpanded ? "sm:mt-5" : "sm:mt-4"}`}>
          <button
            type="button"
            onClick={() => setIsExpanded((value) => !value)}
            aria-label={isExpanded ? `Collapse ${article.title}` : `Expand ${article.title}`}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[color:var(--toggle-button-border)] bg-[color:var(--toggle-button-bg)] text-sm font-medium text-[color:var(--toggle-button-text)] shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition hover:opacity-90 sm:h-auto sm:w-auto sm:px-4 sm:py-2"
          >
            <span className="sm:hidden" aria-hidden>{isExpanded ? "▴" : "▾"}</span>
            <span className="hidden sm:inline">{isExpanded ? "Collapse" : "Expand"}</span>
          </button>
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-full border border-[color:var(--button-border)] bg-[color:var(--button-bg)] px-3.5 text-sm font-medium text-[color:var(--button-text)] transition hover:opacity-90 sm:h-auto sm:px-4 sm:py-2"
          >
            <span className="sm:hidden">Source</span>
            <span className="hidden sm:inline">Open source</span>
          </a>
        </div>
      </div>
    </article>
  );
}
