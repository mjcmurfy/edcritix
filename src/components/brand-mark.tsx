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
      className={`relative ${sizeClasses[size]} overflow-hidden rounded-2xl border border-teal-200 bg-white shadow-[0_14px_30px_rgba(15,23,42,0.08)]`}
    >
      <div className="absolute inset-[5px] rounded-[14px] bg-[radial-gradient(circle_at_28%_30%,rgba(45,212,191,0.35),transparent_34%),linear-gradient(180deg,#f0fdfa,#ecfeff)]" />
      <div className="absolute inset-x-2 top-1/2 h-px -translate-y-1/2 bg-teal-500/25" />
      <div className="absolute inset-y-2 left-1/2 w-px -translate-x-1/2 bg-sky-500/20" />
      <div className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-600 shadow-[0_0_0_5px_rgba(20,184,166,0.12)]" />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/80" />
    </div>
  );
}
