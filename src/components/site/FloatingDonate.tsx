import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

export function FloatingDonate() {
  return (
    <Link
      to="/causes"
      aria-label="Donate to Al-Abdul Trust"
      className="fixed bottom-5 right-5 z-40 flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-primary-foreground shadow-[0_18px_40px_-18px_rgba(6,78,59,0.9)] ring-1 ring-gold/40 transition-all hover:bg-accent hover:scale-[1.03] active:scale-[0.98] lg:bottom-8 lg:right-8"
    >
      <Heart className="h-4 w-4 fill-gold text-gold" />
      Donate
    </Link>
  );
}
