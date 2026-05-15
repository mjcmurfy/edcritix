"use client";

import { useEffect, useMemo, useState } from "react";
import type { PracticeSignalState, PracticeVote } from "@/lib/practice-signal";

const STORAGE_KEY = "edcritix-practice-signal-voter-id";
const buttonBase =
  "inline-flex h-10 items-center justify-center rounded-full border px-3.5 text-sm font-medium leading-none shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition hover:opacity-90";
const activeTone = "border-[color:var(--button-border)] bg-[color:var(--button-bg)] text-[color:var(--button-text)]";
const neutralTone = "border-[color:var(--toggle-button-border)] bg-[color:var(--toggle-button-bg)] text-[color:var(--toggle-button-text)]";
const mutedTone = "border-[color:var(--pill-border)] bg-[color:var(--pill-bg)] text-[color:var(--pill-muted-text)]";
const iconPillClass = `${buttonBase} h-10 w-14 px-0`;

function getOrCreateVoterId() {
  const existing = window.localStorage.getItem(STORAGE_KEY);
  if (existing) return existing;

  const created = window.crypto?.randomUUID?.() ?? `voter-${Math.random().toString(36).slice(2)}-${Date.now()}`;
  window.localStorage.setItem(STORAGE_KEY, created);
  return created;
}

function CountPill({ label, count, active = false }: { label: string; count: number; active?: boolean }) {
  return (
    <span className={`${buttonBase} ${active ? activeTone : mutedTone}`}>
      {label} {count}
    </span>
  );
}

function EcgIcon() {
  return (
    <svg aria-hidden viewBox="0 0 28 20" className="h-5 w-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 10h4.5l2-4 3 8 3-6 2 2h9.5" />
    </svg>
  );
}

function SignalLabelIcon() {
  return (
    <span className={`${iconPillClass} ${mutedTone}`} aria-label="Practice Signal" title="Practice Signal">
      <EcgIcon />
    </span>
  );
}

export function PracticeSignalControl({ slug }: { slug: string }) {
  const [voterId, setVoterId] = useState<string | null>(null);
  const [state, setState] = useState<PracticeSignalState | null>(null);
  const [pendingVote, setPendingVote] = useState<PracticeVote | null>(null);

  useEffect(() => {
    const id = getOrCreateVoterId();
    setVoterId(id);
  }, []);

  useEffect(() => {
    const resolvedVoterId = voterId;
    if (!resolvedVoterId) return;
    const currentVoterId: string = resolvedVoterId;

    let cancelled = false;

    async function load() {
      const response = await fetch(`/api/practice-signal?slug=${encodeURIComponent(slug)}&voterId=${encodeURIComponent(currentVoterId)}`, {
        cache: "no-store",
      });
      const next = (await response.json()) as PracticeSignalState;
      if (!cancelled) setState(next);
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [slug, voterId]);

  const isSubmitting = pendingVote !== null;
  const voted = Boolean(state?.userVote);
  const unavailable = state?.available === false;

  const practiceSignalSummary = useMemo(() => {
    if (!state) return null;
    return (
      <div className="flex flex-wrap items-center gap-2">
        <SignalLabelIcon />
        <CountPill label="👍" count={state.up} active={state.userVote === "up"} />
        <CountPill label="👎" count={state.down} active={state.userVote === "down"} />
      </div>
    );
  }, [state]);

  async function submitVote(vote: PracticeVote) {
    if (!voterId || isSubmitting) return;
    setPendingVote(vote);
    try {
      const response = await fetch("/api/practice-signal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, vote, voterId }),
      });
      const next = (await response.json()) as PracticeSignalState;
      setState(next);
    } finally {
      setPendingVote(null);
    }
  }

  if (!state) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <SignalLabelIcon />
        <div className={`${buttonBase} ${mutedTone}`}>Loading…</div>
      </div>
    );
  }

  if (unavailable) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <SignalLabelIcon />
        <div className={`${buttonBase} ${mutedTone}`}>Unavailable</div>
      </div>
    );
  }

  if (voted) {
    return practiceSignalSummary;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <SignalLabelIcon />
      <button
        type="button"
        onClick={() => void submitVote("up")}
        disabled={isSubmitting}
        className={`${buttonBase} ${neutralTone} disabled:opacity-60`}
      >
        👍 Useful
      </button>
      <button
        type="button"
        onClick={() => void submitVote("down")}
        disabled={isSubmitting}
        className={`${buttonBase} ${mutedTone} disabled:opacity-60`}
      >
        👎 Not useful
      </button>
    </div>
  );
}
