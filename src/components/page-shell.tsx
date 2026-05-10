import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { TopNav } from "@/components/top-nav";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden text-[color:var(--foreground)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ background: "linear-gradient(180deg, transparent, color-mix(in srgb, var(--foreground-strong) 4%, transparent) 50%, transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at top, var(--glow-primary), transparent 22%)" }}
      />
      <div className="relative z-10">
        <TopNav />
        {children}
        <SiteFooter />
      </div>
    </div>
  );
}
