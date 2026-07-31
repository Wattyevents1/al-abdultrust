export function PageHero({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 12% 0%, color-mix(in oklab, var(--gold) 24%, transparent) 0%, transparent 70%), radial-gradient(50% 60% at 92% 100%, color-mix(in oklab, var(--accent) 18%, transparent) 0%, transparent 70%)",
        }}
      />
      <div
        className="container-wide relative max-w-4xl"
        style={{ animation: "var(--animate-fade-up)" }}
      >
        {eyebrow && (
          <p className="mb-5 inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.24em] text-gold">
            <span className="h-px w-8 bg-gold" />
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-primary md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="measure mt-6 text-lg leading-relaxed text-foreground/75">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
