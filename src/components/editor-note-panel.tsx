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
    <section className="rounded-[34px] border border-[color:var(--border)] bg-[color:var(--panel)] px-5 py-5 shadow-[0_24px_70px_rgba(0,0,0,0.16)] backdrop-blur-sm sm:px-6 sm:py-6 lg:px-8 lg:py-7">
      <div className="max-w-4xl">
        <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--muted-faint)]">
          {label ?? "Edition note"}
        </div>
        <h2 className="mt-2 text-[1.65rem] font-semibold tracking-tight text-[color:var(--foreground-strong)] sm:text-[2rem] lg:text-[2.2rem] lg:leading-[1.08]">
          {headline}
        </h2>
      </div>

      <div className="mx-auto mt-4 w-full max-w-[52rem] text-left text-sm leading-6 text-[color:var(--muted-soft)] sm:mt-5 sm:text-base sm:leading-7">
        {splitParagraphs(summary).map((paragraph, index) => (
          <p key={index} className={index === 0 ? "" : "mt-4"}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
