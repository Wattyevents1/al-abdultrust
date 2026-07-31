import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/causes", label: "Projects" },
  { to: "/volunteer", label: "Volunteer" },
  { to: "/events", label: "Events" },
  { to: "/blog", label: "Blog" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
  { to: "/legal", label: "Legal" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-gold/25 py-2 shadow-[0_8px_30px_-24px_rgba(6,78,59,0.6)]" : "py-5"
      }`}
    >
      <div className="container-wide flex items-center justify-between gap-4">
        <Logo />
        <nav className="hidden lg:flex items-center gap-6">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="relative py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-foreground/70 transition-colors hover:text-accent after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:scale-x-100"
              activeProps={{ className: "text-accent after:scale-x-100" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <Button
            asChild
            size="sm"
            className="rounded-full bg-accent px-6 text-[11px] font-extrabold uppercase tracking-[0.16em] text-accent-foreground shadow-lg shadow-accent/20 transition-all hover:bg-primary hover:shadow-xl active:scale-[0.97]"
          >
            <Link to="/causes">Donate</Link>
          </Button>
        </div>
        <button
          className="lg:hidden grid h-11 w-11 place-items-center rounded-full border border-gold/40 text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden glass border-t border-gold/25 mt-3">
          <div className="container-wide py-5 flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] transition-colors hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-3 h-12 rounded-full bg-accent text-accent-foreground hover:bg-primary">
              <Link to="/causes" onClick={() => setOpen(false)}>Donate Now</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
