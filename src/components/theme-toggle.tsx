"use client";

import { useState } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "edcritix-theme";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";

  const saved = window.localStorage.getItem(STORAGE_KEY);
  const initial = saved === "light" || saved === "dark" ? saved : "light";
  applyTheme(initial);
  return initial;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-9 items-center justify-center rounded-md border border-[color:var(--button-muted-border)] bg-[color:var(--button-muted-bg)] px-3 text-xs font-medium text-[color:var(--button-muted-text)] transition hover:bg-[color:var(--surface-subtle)]"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
