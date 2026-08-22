export default function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center animate-fade-up">
      <div className="mb-3 inline-flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-circuit tech-pulse-dot" />
        <p className="eyebrow">{eyebrow}</p>
        <span className="h-1.5 w-1.5 rounded-full bg-circuit tech-pulse-dot" />
      </div>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-ink-dim text-balance">{description}</p>
      )}
    </div>
  );
}

