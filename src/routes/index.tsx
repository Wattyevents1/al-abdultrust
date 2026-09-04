import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-children.jpg";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/site/Counter";
import { causes } from "@/data/causes";
import { ArrowRight, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Al-Abdul Trust CHARITY ORGANISATION — Serving Humanity in Uganda" },
      { name: "description", content: "Al-Abdul Trust is a registered Ugandan charity building water wells, orphanages and schools, and feeding families in need. Donate or volunteer today." },
      { property: "og:title", content: "Al-Abdul Trust CHARITY ORGANISATION" },
      { property: "og:description", content: "Water wells, orphan care, schools and food relief across Uganda. Serving humanity, together." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const stats = [
  { label: "Children supported", value: 1200, suffix: "+" },
  { label: "Meals distributed", value: 300000, suffix: "+" },
  { label: "Communities reached", value: 180, suffix: "" },
  { label: "Active volunteers", value: 40, suffix: "" },
];

const stories = [
  {
    slug: "water-wells",
    eyebrow: "Safe water access",
    title: ["Deep wells,", "brighter futures."],
    body: "Our boreholes bring clean water straight into the heart of a village — cutting waterborne illness, easing the daily burden on mothers, and freeing girls to sit in a classroom instead of walking for miles.",
    cta: "Explore water projects",
  },
  {
    slug: "orphan-care",
    eyebrow: "Orphan care",
    title: ["A sanctuary", "of belonging."],
    body: "More than shelter: our orphan programmes provide school fees, nourishing meals, medical care and steady mentorship, so every child grows up knowing they are held by a family.",
    cta: "See our orphan care",
  },
  {
    slug: "school-construction",
    eyebrow: "Education",
    title: ["Classrooms built", "to last generations."],
    body: "We build and rehabilitate schools with proper roofing, desks, latrines and safe water points — then work with local teachers so the building keeps serving long after the ribbon is cut.",
    cta: "See our schools",
  },
  {
    slug: "food-provision",
    eyebrow: "Food & urgent appeals",
    title: ["A full plate,", "restored dignity."],
    body: "From monthly family food parcels to emergency response after floods and drought, we deliver food where it is needed most — quietly, respectfully, and directly into the hands of families.",
    cta: "Support food relief",
  },
] as const;

const news = [
  { title: "300th well opened in the northern districts", date: "Mar 2026", excerpt: "A new borehole brings clean water to 4,000 people." },
  { title: "Annual fundraiser supports 2,500 pupils", date: "Feb 2026", excerpt: "Generous donors funded school fees and materials." },
  { title: "Emergency food response after flooding", date: "Jan 2026", excerpt: "Food convoys reach displaced families within days." },
];

const partners = ["UNICEF", "Red Cross", "WHO", "Oxfam", "USAID", "Save the Children", "World Vision", "Care"];

function HomePage() {
  const byslug = (s: string) => causes.find((c) => c.slug === s)!;

  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1440px]">
        {/* HERO */}
        <section className="px-6 lg:px-16 pt-10 pb-24 lg:pt-16 lg:pb-32">
          <div className="grid lg:grid-cols-12 gap-14 lg:gap-12 items-center">
            <Reveal className="lg:col-span-7">
              <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-warm" /> Registered Ugandan charity • NCD/122/2026
              </span>
              <h1 className="mt-8 font-display text-[3.25rem] leading-[0.9] tracking-tight font-bold text-primary sm:text-7xl lg:text-[100px] lg:leading-[0.85]">
                Nurturing <span className="text-warm">Hope</span>
                <br className="hidden sm:block" /> in Uganda.
              </h1>
              <p className="mt-8 max-w-xl text-lg sm:text-xl lg:text-2xl leading-relaxed text-foreground/75">
                Al-Abdul Trust is a Ugandan charity dedicated to sustainable relief — clean water, orphan care, schools and food for families who need it most.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild size="lg" className="h-14 rounded-full bg-primary px-9 text-base font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5 hover:bg-primary/90">
                  <Link to="/causes">Donate Now <Heart className="ml-1 h-4 w-4 fill-current" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 rounded-full border-2 border-primary px-9 text-base font-semibold text-primary hover:bg-primary hover:text-primary-foreground">
                  <Link to="/volunteer">Join the Team</Link>
                </Button>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-5" delay={120}>
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden rounded-[3rem] rotate-2 shadow-[var(--shadow-elegant)] bg-muted">
                  <img
                    src={heroImg}
                    alt="Children smiling outside their community school in Uganda"
                    width={1920}
                    height={1280}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] hover:scale-105"
                  />
                </div>
                <div className="absolute -bottom-8 -left-4 sm:-left-8 flex h-32 w-32 sm:h-40 sm:w-40 -rotate-6 items-center justify-center rounded-full bg-warm text-center font-display font-bold leading-tight text-warm-foreground shadow-[var(--shadow-glow)]">
                  SERVING
                  <br />
                  HUMANITY
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* IMPACT */}
        <Reveal className="px-6 lg:px-16 pt-8 pb-24 lg:pb-32">
          <div className="rounded-[2.5rem] bg-primary px-8 py-16 text-primary-foreground sm:px-12 lg:px-16 lg:py-20">
            <div className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-12">
              {stats.map((s) => (
                <div key={s.label} className="border-l border-primary-foreground/20 pl-5 sm:pl-6">
                  <span className="block font-display text-4xl font-bold sm:text-5xl">
                    <Counter end={s.value} suffix={s.suffix} />
                  </span>
                  <span className="mt-2 block text-[0.7rem] uppercase tracking-[0.2em] text-primary-foreground/70">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ZIGZAG STORIES */}
        <section className="px-6 lg:px-16 space-y-28 lg:space-y-40 pb-28 lg:pb-36">
          {stories.map((s, i) => {
            const cause = byslug(s.slug);
            const flip = i % 2 === 1;
            return (
              <Reveal
                key={s.slug}
                className={`flex flex-col items-center gap-12 lg:gap-20 ${flip ? "lg:flex-row-reverse" : "lg:flex-row"}`}
              >
                <div className="relative w-full lg:w-1/2">
                  {!flip && (
                    <div className="absolute -top-6 -left-6 z-10 hidden h-24 w-24 rounded-full border-4 border-primary bg-background lg:block" />
                  )}
                  <div className={`overflow-hidden rounded-[2.5rem] shadow-[var(--shadow-elegant)] bg-muted ${flip ? "aspect-[4/5]" : "aspect-video"}`}>
                    <img
                      src={cause.image}
                      alt={cause.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.2s] hover:scale-105"
                    />
                  </div>
                </div>

                <div className="w-full space-y-7 lg:w-1/2">
                  <span className="eyebrow inline-block rounded-full bg-warm/10 px-4 py-1.5 italic text-warm">
                    {s.eyebrow}
                  </span>
                  <h2 className="font-display text-4xl font-bold leading-tight text-primary sm:text-5xl">
                    {s.title[0]}
                    <br />
                    {s.title[1]}
                  </h2>
                  <div className="h-px w-16 bg-border" />
                  <p className="text-lg leading-relaxed text-foreground/70">{s.body}</p>
                  <Link
                    to="/causes/$slug"
                    params={{ slug: s.slug }}
                    className="group inline-flex items-center gap-3 font-display text-sm font-bold uppercase tracking-wider text-primary"
                  >
                    {s.cta}
                    <span className="h-[2px] w-10 bg-primary transition-all group-hover:w-16" />
                  </Link>
                </div>
              </Reveal>
            );
          })}

          <Reveal className="text-center">
            <Button asChild variant="ghost" className="rounded-full font-display text-base font-semibold text-primary">
              <Link to="/causes">View all nine projects <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </Reveal>
        </section>

        {/* EDITORIAL QUOTE */}
        <Reveal className="border-y border-border bg-secondary/50 px-6 py-24 lg:px-16 lg:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="font-display text-6xl leading-none text-warm">&ldquo;</div>
            <blockquote className="mt-4 font-display text-2xl font-light italic leading-snug text-primary sm:text-3xl lg:text-4xl">
              Al-Abdul Trust didn&rsquo;t just give us food; they gave us the tools to rebuild our
              community. My children now go to school with full stomachs and full hearts.
            </blockquote>
            <div className="mt-10 flex items-center gap-4">
              <div className="h-[2px] w-12 bg-warm" />
              <p className="font-display text-sm font-bold uppercase tracking-wider">Community elder, Luwero District</p>
            </div>
          </div>
        </Reveal>

        {/* PARTNERS */}
        <section className="overflow-hidden py-16">
          <p className="eyebrow mb-8 text-center text-muted-foreground">Working alongside</p>
          <div className="relative overflow-hidden">
            <div className="flex gap-14 whitespace-nowrap" style={{ animation: "var(--animate-marquee)" }}>
              {[...partners, ...partners].map((p, i) => (
                <span key={i} className="font-display text-2xl tracking-wide text-muted-foreground/60">{p}</span>
              ))}
            </div>
          </div>
        </section>

        {/* NEWS */}
        <section className="px-6 lg:px-16 py-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-warm">From the field</p>
              <h2 className="mt-3 font-display text-4xl font-bold text-primary sm:text-5xl">Stories &amp; updates</h2>
            </div>
            <Link to="/blog" className="group inline-flex items-center gap-3 font-display text-sm font-bold uppercase tracking-wider text-primary">
              All news <span className="h-[2px] w-10 bg-primary transition-all group-hover:w-16" />
            </Link>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border md:grid-cols-3">
            {news.map((n, i) => (
              <Reveal key={n.title} delay={i * 90} className="bg-background p-8 transition-colors hover:bg-secondary/50">
                <p className="eyebrow text-warm">{n.date}</p>
                <h3 className="mt-4 font-display text-xl font-semibold text-primary">{n.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{n.excerpt}</p>
                <Link to="/blog" className="mt-6 inline-flex items-center text-sm font-semibold text-primary hover:text-warm">
                  Read more <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="px-6 lg:px-16 pb-28">
          <Reveal>
            <div className="relative overflow-hidden rounded-[3rem] p-12 text-center lg:p-24" style={{ background: "var(--ink)" }}>
              <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/30" />
              <div className="relative z-10">
                <h2 className="font-display text-4xl font-bold tracking-tight text-background lg:text-6xl">Follow the journey.</h2>
                <p className="mx-auto mt-6 max-w-lg text-lg text-background/60">
                  Receive stories of impact and project updates directly in your inbox.
                </p>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="mx-auto mt-10 flex max-w-xl flex-col gap-3 rounded-[2.5rem] border border-background/10 bg-background/10 p-2 sm:flex-row"
                >
                  <label className="sr-only" htmlFor="newsletter-email">Email address</label>
                  <Input
                    id="newsletter-email"
                    type="email"
                    placeholder="Your email address"
                    className="h-14 flex-1 border-0 bg-transparent px-6 text-background placeholder:text-background/40 focus-visible:ring-0"
                  />
                  <Button type="submit" className="h-14 rounded-full bg-warm px-10 font-display font-semibold text-warm-foreground hover:bg-warm/90">
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </SiteLayout>
  );
}
