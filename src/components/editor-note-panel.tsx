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
}: {
  label?: string;
  headline: string;
  summary: string;
}) {
  return (
    <section
      data-editorial-panel="true"
      className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-5 shadow-sm sm:px-5 lg:px-6"
    >
      <div className="max-w-4xl">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-faint)]">
          {label ?? "Edition note"}
        </div>
        <h2 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-[color:var(--foreground-strong)] sm:text-3xl">
          {headline}
        </h2>
      </div>

      <div className="mt-4 grid max-w-4xl gap-4 text-sm leading-6 text-[color:var(--muted-soft)] sm:text-base sm:leading-7">
        {splitParagraphs(summary).map((paragraph, index) => (
          <p key={index}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
