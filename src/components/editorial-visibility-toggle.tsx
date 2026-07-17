"use client";

import { useState } from "react";

const STORAGE_KEY = "edcritix-editorial-visible";

type Visibility = "shown" | "hidden";

function applyVisibility(next: Visibility) {
  document.documentElement.dataset.editorial = next;
}

function getInitialVisibility(): Visibility {
  if (typeof window === "undefined") return "shown";

  const saved = window.localStorage.getItem(STORAGE_KEY);
  const initial: Visibility = saved === "hidden" ? "hidden" : "shown";
  applyVisibility(initial);
  return initial;
}

export function EditorialVisibilityToggle() {
  const [visibility, setVisibility] = useState<Visibility>(getInitialVisibility);

  function toggleVisibility() {
    const next: Visibility = visibility === "shown" ? "hidden" : "shown";
    setVisibility(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    applyVisibility(next);
  }

  const isShown = visibility === "shown";

  return (
    <button
      type="button"
      onClick={toggleVisibility}
      aria-label={isShown ? "Hide daily editorial" : "Show daily editorial"}
      className="inline-flex h-9 items-center justify-center rounded-md border border-[color:var(--button-muted-border)] bg-[color:var(--button-muted-bg)] px-3 text-xs font-medium text-[color:var(--button-muted-text)] transition hover:bg-[color:var(--surface-subtle)]"
    >
      <span className="hidden sm:inline">{isShown ? "Hide editorial" : "Show editorial"}</span>
      <span className="sm:hidden">{isShown ? "Hide" : "Show"}</span>
    </button>
  );
}
