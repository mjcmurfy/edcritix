"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "edcritix-editorial-visible";

type Visibility = "shown" | "hidden";

function applyVisibility(next: Visibility) {
  document.documentElement.dataset.editorial = next;
}

export function EditorialVisibilityToggle() {
  const [visibility, setVisibility] = useState<Visibility>("shown");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const initial: Visibility = saved === "hidden" ? "hidden" : "shown";
    setVisibility(initial);
    applyVisibility(initial);
  }, []);

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
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--pill-bg)] text-sm text-[color:var(--pill-text)] transition hover:opacity-90"
    >
      <span aria-hidden>{isShown ? "👁️" : "🙈"}</span>
    </button>
  );
}
