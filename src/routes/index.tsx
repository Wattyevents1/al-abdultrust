import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-children.jpg";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/site/Counter";
import { Reveal } from "@/components/site/Reveal";
import { causes } from "@/data/causes";
import { ArrowRight, Quote } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Al-Abdul Trust CHARITY ORGANISATION — Changing Lives Through Service" },
      { name: "description", content: "Join Al-Abdul Trust CHARITY ORGANISATION in delivering food, education, healthcare and clean water across Africa. Donate or volunteer today." },
      { property: "og:title", content: "Al-Abdul Trust CHARITY ORGANISATION" },
      { property: "og:description", content: "Changing lives through service and action." },
    ],
  }),
  component: HomePage,
});

const stats = [
  { label: "Children helped", value: 1200, suffix: "+" },
  { label: "Meals distributed", value: 300000, suffix: "+" },
  { label: "Communities reached", value: 180, suffix: "" },
  { label: "Volunteers worldwide", value: 40, suffix: "" },
];

const stories = [
  {
    slug: "water-wells",
    eyebrow: "Pure water, pure hearts",
    title: "A ripple of change that lasts a lifetime.",
    body: "Our deep boreholes end the daily walk for unsafe water. One well serves up to 500 people, cuts waterborne illness dramatically, and keeps girls in classrooms instead of at the riverbank — for two decades or more.",
    cta: "See the transformation",
  },
  {
    slug: "orphan-care",
    eyebrow: "Nurturing the future",
    title: "More than shelter — a place to belong.",
    body: "Sponsorship covers food, healthcare, schooling and the quiet dignity of being cared for by name. Every child is visited, tracked and supported until they can stand on their own.",
    cta: "Sponsor a child",
  },
  {
    slug: "food-provision",
    eyebrow: "Relief without delay",
    title: "Food on the table when it matters most.",
    body: "From monthly family food parcels to emergency appeals after floods and drought, our Kampala-based teams move fast because they already live in the communities they serve.",
    cta: "Support urgent appeals",
  },
];

const testimonial = {
  quote:
    "Al-Abdul Trust dug the well at the edge of our village. My daughters used to walk four hours before school. Now they arrive early, and nobody here has been sick from the water since.",
  name: "Amina Nakato",
  role: "Mother of four — Mubende District, Uganda",
};

const partners = ["UNICEF", "Red Cross", "WHO", "Oxfam", "USAID", "Save the Children", "World Vision", "Care"];

const news = [
  { title: "300th well opened in Kakuma region", date: "Mar 2026", excerpt: "A new well brings clean water to 4,000 people in northern Kenya." },
  { title: "Annual gala raises $1.2M for education", date: "Feb 2026", excerpt: "Generous donors funded scholarships for 2,500 girls across 6 countries." },
  { title: "Emergency response in Sudan", date: "Jan 2026", excerpt: "Mobile clinics and food convoys reach displaced families." },
];

function HomePage() {
  const storyCauses = stories
    .map((s) => ({ ...s, cause: causes.find((c) => c.slug === s.slug)! }))
    .filter((s) => s.cause);
  const [featured, ...rest] = causes.slice(0, 5);

  return (
    <SiteLayout>
      {/* EDITORIAL HERO */}
      <section className="relative overflow-hidden pt-6 pb-20 md:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(55% 45% at 8% 4%, color-mix(in oklab, var(--gold) 22%, transparent) 0%, transparent 70%), radial-gradient(45% 55% at 96% 90%, color-mix(in oklab, var(--accent) 16%, transparent) 0%, transparent 70%)",
          }}
        />
        <div className="container-wide relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div style={{ animation: "var(--animate-fade-up)" }}>
            <p className="inline-flex items-center gap-3 border-l-2 border-gold bg-gold/10 py-1.5 pl-3 pr-4 text-[11px] font-extrabold uppercase tracking-[0.2em] text-gold">
              Registered charity Uganda • NCD/122/2026
            </p>
            <h1 className="mt-8 font-display text-5xl leading-[1.03] tracking-tight text-primary md:text-7xl">
              Hope is a{" "}
              <span className="italic font-normal text-accent">living legacy.</span>
            </h1>
            <p className="measure mt-7 text-lg leading-relaxed text-foreground/75 md:text-xl">
              Al-Abdul Trust restores dignity through clean water, orphan care, food
              relief and education in the heart of Uganda — carried out by teams who
              live in the very communities they serve.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Button
                asChild
                size="lg"
                className="h-14 rounded-full bg-primary px-9 text-xs font-extrabold uppercase tracking-[0.18em] text-primary-foreground shadow-[0_20px_44px_-22px_rgba(6,78,59,0.95)] transition-all hover:bg-accent hover:-translate-y-0.5 active:translate-y-0"
              >
                <Link to="/causes">Support a project</Link>
              </Button>
              <Link
                to="/about"
                className="border-b-2 border-gold pb-1 text-xs font-extrabold uppercase tracking-[0.18em] text-primary transition-colors hover:text-gold"
              >
                Our story
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative ml-auto w-full max-w-md border border-gold/40 bg-card/60 p-3 md:p-4">
              <div className="overflow-hidden">
                <img
                  src={heroImg}
                  alt="A child smiling at golden hour in a Ugandan village"
                  width={1200}
                  height={1500}
                  className="aspect-[3/4] w-full object-cover shadow-2xl transition-transform duration-[1200ms] hover:scale-[1.04]"
                />
              </div>
            </div>
            <figure className="relative -mt-10 ml-0 max-w-sm bg-gold p-7 text-gold-foreground shadow-xl md:-ml-10 lg:-ml-16">
              <blockquote className="font-display text-xl italic leading-snug md:text-2xl">
                “The best charity is to give water to drink.”
              </blockquote>
              <figcaption className="mt-3 text-[10px] font-extrabold uppercase tracking-[0.2em] opacity-80">
                Prophet Muhammad ﷺ
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* IMPACT BAR */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container-wide grid grid-cols-2 gap-10 md:flex md:flex-wrap md:justify-between">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className="flex flex-col gap-2">
              <span className="font-display text-4xl font-light md:text-5xl">
                <Counter end={s.value} suffix={s.suffix} />
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gold">
                {s.label}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ZIGZAG STORIES */}
      {storyCauses.map((s, i) => (
        <section
          key={s.slug}
          className={`overflow-hidden py-24 md:py-32 ${i % 2 === 1 ? "bg-secondary/60" : ""}`}
        >
          <div className="container-wide grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <Reveal
              className={`relative ${i % 2 === 1 ? "lg:order-2" : ""}`}
            >
              <img
                src={s.cause.image}
                alt={s.cause.title}
                loading="lazy"
                className="relative z-10 aspect-video w-full object-cover shadow-2xl"
              />
              <span
                aria-hidden
                className={`absolute h-32 w-32 border-gold ${
                  i % 2 === 1
                    ? "-bottom-6 -right-6 border-b-2 border-r-2"
                    : "-top-6 -left-6 border-l-2 border-t-2"
                }`}
              />
            </Reveal>
            <Reveal delay={120} className={i % 2 === 1 ? "lg:order-1" : ""}>
              <h2 className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-gold">
                {s.eyebrow}
              </h2>
              <p className="mt-5 font-display text-4xl leading-tight text-primary md:text-5xl">
                {s.title}
              </p>
              <p className="measure mt-6 text-lg leading-relaxed text-foreground/70">
                {s.body}
              </p>
              <Link
                to="/causes/$slug"
                params={{ slug: s.slug }}
                className="group mt-8 inline-flex items-center gap-4 text-xs font-extrabold uppercase tracking-[0.18em] text-primary"
              >
                <span>{s.cta}</span>
                <span className="h-[2px] w-8 bg-gold transition-all duration-300 group-hover:w-14" />
              </Link>
            </Reveal>
          </div>
        </section>
      ))}

      {/* PROJECTS — asymmetric feature + list */}
      <section className="py-24 md:py-32">
        <div className="container-wide">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-gold">
                Where your giving goes
              </p>
              <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight text-primary md:text-5xl">
                Nine ongoing projects, one intention.
              </h2>
            </div>
            <Link
              to="/causes"
              className="group inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-primary hover:text-accent"
            >
              All projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
            <Reveal className="group">
              <Link to="/causes/$slug" params={{ slug: featured.slug }} className="block">
                <div className="overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover shadow-xl transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                  />
                </div>
                <p className="mt-6 text-[11px] font-extrabold uppercase tracking-[0.2em] text-accent">
                  {featured.category}
                </p>
                <h3 className="mt-3 font-display text-3xl text-primary md:text-4xl">
                  {featured.title}
                </h3>
                <p className="measure mt-4 line-clamp-3 leading-relaxed text-foreground/70">
                  {featured.description}
                </p>
                <div className="mt-6 max-w-md">
                  <Progress value={Math.round((featured.raised / featured.goal) * 100)} className="h-1.5" />
                  <div className="mt-3 flex justify-between text-sm">
                    <span className="font-bold text-primary">
                      ${featured.raised.toLocaleString()} raised
                    </span>
                    <span className="text-muted-foreground">
                      Goal ${featured.goal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>

            <div className="divide-y divide-border">
              {rest.map((c, i) => (
                <Reveal key={c.slug} delay={i * 80}>
                  <Link
                    to="/causes/$slug"
                    params={{ slug: c.slug }}
                    className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 py-6 first:pt-0"
                  >
                    <div className="min-w-0">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gold">
                        {c.category}
                      </p>
                      <h3 className="mt-2 font-display text-xl text-primary transition-colors group-hover:text-accent">
                        {c.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground/65">
                        {c.description}
                      </p>
                    </div>
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
                      <img
                        src={c.image}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="bg-primary py-24 text-primary-foreground md:py-32">
        <div className="container-wide grid gap-12 lg:grid-cols-[auto_1fr] lg:gap-20">
          <Quote className="h-14 w-14 shrink-0 text-gold" />
          <Reveal>
            <blockquote className="font-display text-3xl leading-[1.3] md:text-[42px] md:leading-[1.25]">
              “{testimonial.quote}”
            </blockquote>
            <div className="mt-10 flex items-center gap-4">
              <span className="h-px w-12 bg-gold" />
              <div>
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm text-primary-foreground/60">{testimonial.role}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="overflow-hidden border-b border-border py-14">
        <p className="container-wide mb-8 text-[10px] font-extrabold uppercase tracking-[0.24em] text-muted-foreground">
          Working alongside
        </p>
        <div className="relative overflow-hidden">
          <div className="flex gap-16 whitespace-nowrap" style={{ animation: "var(--animate-marquee)" }}>
            {[...partners, ...partners].map((p, i) => (
              <span key={i} className="font-display text-2xl tracking-wide text-muted-foreground/70">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNAL */}
      <section className="py-24 md:py-32">
        <div className="container-wide grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-gold">
              From the field
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-primary md:text-5xl">
              Dispatches &amp; updates
            </h2>
            <Link
              to="/blog"
              className="group mt-8 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-primary hover:text-accent"
            >
              Read the journal
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
          <div className="divide-y divide-border">
            {news.map((n, i) => (
              <Reveal key={n.title} delay={i * 90}>
                <Link to="/blog" className="group block py-7 first:pt-0">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-accent">
                    {n.date}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-primary transition-colors group-hover:text-accent">
                    {n.title}
                  </h3>
                  <p className="measure mt-2 leading-relaxed text-foreground/65">{n.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="pb-28">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-[28px] bg-accent px-8 py-14 text-accent-foreground md:px-16 md:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full"
              style={{ background: "color-mix(in oklab, var(--gold) 35%, transparent)" }}
            />
            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-end">
              <div>
                <h2 className="font-display text-4xl leading-tight md:text-5xl">
                  Walk with us.
                </h2>
                <p className="measure mt-4 text-accent-foreground/85">
                  Monthly stories from the field, project updates and simple ways to help —
                  never more than one email a month.
                </p>
              </div>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <Input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="h-14 rounded-full border-white/30 bg-white/15 px-6 text-accent-foreground placeholder:text-accent-foreground/60"
                />
                <Button
                  type="submit"
                  className="h-14 rounded-full bg-gold px-8 text-xs font-extrabold uppercase tracking-[0.18em] text-gold-foreground transition-transform hover:brightness-105 active:scale-[0.98]"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
