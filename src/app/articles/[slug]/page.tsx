import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import {
  formatDate,
  getAllArticles,
  getArticleBottomLine,
  getArticleBySlug,
  getArticleHref,
  getArticleTopics,
  getDisplayProvenance,
  getEvidenceLabel,
  getImpactDescription,
  getRelatedArticles,
  getSourceAccessLabel,
} from "@/lib/feed";

function splitParagraphs(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function uniqueParagraphs(text: string) {
  const seen = new Set<string>();

  return splitParagraphs(text).filter((paragraph) => {
    const normalized = paragraph.replace(/\s+/g, " ").toLowerCase();
    if (seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
}

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = getRelatedArticles(article);
  const paragraphs = uniqueParagraphs(article.summary || article.shortSummary);
  const topics = getArticleTopics(article);

  return (
    <PageShell>
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-8 pt-4 sm:px-6 lg:px-8 lg:pb-12">
        <nav className="text-sm text-[color:var(--muted)]" aria-label="Breadcrumb">
          <Link href="/" className="font-medium text-[color:var(--inline-link-text)] hover:underline">
            Today
          </Link>
          <span aria-hidden="true"> / </span>
          <span>Article analysis</span>
        </nav>

        <article className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] shadow-sm">
          <header className="border-b border-[color:var(--border)] px-4 py-5 sm:px-6 lg:px-7">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-md border border-[color:var(--impact-practice-border)] bg-[color:var(--impact-practice-bg)] px-2 py-1 font-medium text-[color:var(--impact-practice-text)]">
                {getImpactDescription(article.impact)}
              </span>
              <span className="rounded-md border border-[color:var(--pill-border)] bg-[color:var(--pill-bg)] px-2 py-1 text-[color:var(--pill-text)]">
                {article.impact}
              </span>
              <span className="rounded-md border border-[color:var(--pill-border)] bg-[color:var(--pill-bg)] px-2 py-1 text-[color:var(--pill-muted-text)]">
                {getEvidenceLabel(article)}
              </span>
            </div>

            <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-[color:var(--foreground-strong)] sm:text-4xl">
              {article.title}
            </h1>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[color:var(--muted)]">
              <span>{article.source}</span>
              <span>{article.publishedAt ? formatDate(article.publishedAt) : article.published}</span>
              <span>{topics.join(", ")}</span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#ffffff" }}
                className="inline-flex h-10 items-center justify-center rounded-md border border-[color:var(--button-border)] bg-[color:var(--button-bg)] px-3 text-sm font-medium text-white hover:opacity-90"
              >
                Open original source
              </a>
              <Link
                href="/"
                className="inline-flex h-10 items-center justify-center rounded-md border border-[color:var(--button-muted-border)] bg-[color:var(--button-muted-bg)] px-3 text-sm font-medium text-[color:var(--button-muted-text)] hover:bg-[color:var(--surface-subtle)]"
              >
                Back to daily edition
              </Link>
            </div>
          </header>

          <div className="grid gap-6 px-4 py-5 sm:px-6 lg:grid-cols-[1fr_20rem] lg:px-7">
            <div className="space-y-6">
              <section className="border-l-4 border-[color:var(--accent-border)] pl-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--section-label-text)]">
                  Clinical takeaway
                </div>
                <p className="mt-2 text-base leading-7 text-[color:var(--foreground-strong)]">
                  {getArticleBottomLine(article)}
                </p>
              </section>

              <section>
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-faint)]">
                  EDCritix summary
                </div>
                <div className="mt-3 grid gap-4 text-base leading-7 text-[color:var(--muted-soft)]">
                  {paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-5 border-t border-[color:var(--border)] pt-5 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
              <section>
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-faint)]">
                  Source profile
                </div>
                <dl className="mt-3 grid gap-3 text-sm">
                  <div>
                    <dt className="text-[color:var(--muted)]">Source</dt>
                    <dd className="font-semibold text-[color:var(--foreground-strong)]">{article.source}</dd>
                  </div>
                  <div>
                    <dt className="text-[color:var(--muted)]">Access layer</dt>
                    <dd className="font-semibold text-[color:var(--foreground-strong)]">{getSourceAccessLabel(article)}</dd>
                  </div>
                  <div>
                    <dt className="text-[color:var(--muted)]">Summary confidence</dt>
                    <dd className="font-semibold text-[color:var(--foreground-strong)]">{article.confidence ?? "Not stated"}</dd>
                  </div>
                </dl>
              </section>

              <section>
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-faint)]">
                  Provenance note
                </div>
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted-soft)]">
                  {getDisplayProvenance(article)}
                </p>
              </section>

              {related.length ? (
                <section>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-faint)]">
                    Related reads
                  </div>
                  <div className="mt-3 grid gap-3">
                    {related.map((relatedArticle) => (
                      <Link
                        key={relatedArticle.slug}
                        href={getArticleHref(relatedArticle)}
                        className="block rounded-md border border-[color:var(--border)] bg-[color:var(--surface-subtle)] p-3 text-sm hover:border-[color:var(--accent-border)]"
                      >
                        <div className="font-medium leading-snug text-[color:var(--foreground-strong)]">
                          {relatedArticle.title}
                        </div>
                        <div className="mt-1 text-xs text-[color:var(--muted)]">
                          {relatedArticle.source} / {relatedArticle.published}
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}
            </aside>
          </div>
        </article>
      </main>
    </PageShell>
  );
}
