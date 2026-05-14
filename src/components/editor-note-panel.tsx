"use client";

import { useEffect, useState } from "react";
import { formatDateTime } from "@/lib/feed";

const STORAGE_KEY = "edcritix-editor-note-collapsed";

function splitParagraphs(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function EditorNotePanel({
  label,
  headline,
  summary,
  updatedAt,
}: {
  label?: string;
  headline: string;
  summary: string;
  updatedAt: string | null;
}) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      setCollapsed(window.localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      // noop
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, collapsed ? "1" : "0");
    } catch {
      // noop
    }
  }, [collapsed]);

  return (
    <section className="rounded-[34px] border border-[color:var(--border)] bg-[color:var(--panel)] px-5 py-5 shadow-[0_24px_70px_rgba(0,0,0,0.16)] backdrop-blur-sm sm:px-6 sm:py-6 lg:px-8 lg:py-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-4xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--muted-faint)]">
            {label ?? "Edition note"}
          </div>
          <h2 className="mt-2 text-[1.65rem] font-semibold tracking-tight text-[color:var(--foreground-strong)] sm:text-[2rem] lg:text-[2.2rem] lg:leading-[1.08]">
            {headline}
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-medium shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition hover:opacity-90 ${collapsed ? "border-[color:var(--toggle-button-border)] bg-[color:var(--toggle-button-bg)] text-[color:var(--action-expand-text)]" : "border-[color:var(--toggle-button-border)] bg-[color:var(--toggle-button-bg)] text-[color:var(--action-collapse-text)]"}`}
          aria-label={collapsed ? "Show editor note" : "Hide editor note"}
        >
          {collapsed ? "Show note" : "Hide note"}
        </button>
      </div>

      {collapsed ? (
        <p className="mt-4 text-sm text-[color:var(--muted)]">
          Editorial note hidden. Use Show note if you want the edition commentary back.
        </p>
      ) : (
        <>
          <div className="mx-auto mt-4 w-full max-w-[52rem] text-left text-sm leading-6 text-[color:var(--muted-soft)] sm:mt-5 sm:text-base sm:leading-7">
            {splitParagraphs(summary).map((paragraph, index) => (
              <p key={index} className={index === 0 ? "" : "mt-4"}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-[color:var(--muted)]">
            <span className="rounded-full border border-[color:var(--border)] bg-[color:var(--pill-bg)] px-4 py-2">
              Updated {formatDateTime(updatedAt)}
            </span>
          </div>
        </>
      )}
    </section>
  );
}
