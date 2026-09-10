import { causes, type Cause } from "@/data/causes";
import type { CauseOverride } from "@/lib/content.functions";

function pick<T>(value: T | null | undefined, fallback: T): T {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "string" && value.trim() === "") return fallback;
  if (Array.isArray(value) && value.length === 0) return fallback;
  return value;
}

export function mergeCauses(overrides: CauseOverride[] | undefined | null): Cause[] {
  const map = new Map((overrides || []).map((o) => [o.slug, o]));
  return causes.map((c) => {
    const o = map.get(c.slug);
    if (!o) return c;
    return {
      ...c,
      title: pick(o.title, c.title),
      category: pick(o.category, c.category),
      description: pick(o.description, c.description),
      image: pick(o.image, c.image),
      highlights: pick(o.highlights, c.highlights),
      faqs: pick(o.faqs, c.faqs),
      gallery: pick(o.gallery, c.gallery),
    };
  });
}
