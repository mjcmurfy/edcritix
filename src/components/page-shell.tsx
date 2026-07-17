import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { TopNav } from "@/components/top-nav";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen text-[color:var(--foreground)]">
      <TopNav />
      {children}
      <SiteFooter />
    </div>
  );
}
