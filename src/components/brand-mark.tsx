type BrandMarkProps = {
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-16 w-16",
};

export function BrandMark({ size = "md" }: BrandMarkProps) {
  return (
    <div
      className={`relative ${sizeClasses[size]} overflow-hidden rounded-md border border-[color:var(--accent-border)] bg-[color:var(--surface)] shadow-sm`}
      aria-hidden="true"
    >
      <div className="absolute inset-x-2 top-1/2 h-px -translate-y-1/2 bg-[color:var(--border)]" />
      <svg
        viewBox="0 0 44 44"
        className="absolute inset-0 h-full w-full text-[color:var(--accent)]"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      >
        <path d="M6 23h8l3-7 6 17 5-13 3 3h7" />
      </svg>
    </div>
  );
}
