export function PageHero({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: "var(--primary)" }}
    >
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/15" />

      <div className="container-narrow relative text-center text-white" style={{ animation: "var(--animate-fade-up)" }}>
        {eyebrow && <p className="text-sm uppercase tracking-[0.3em] text-gold mb-4">{eyebrow}</p>}
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
        {subtitle && <p className="text-lg text-white/80 max-w-2xl mx-auto">{subtitle}</p>}
      </div>
    </section>
  );
}
