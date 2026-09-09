import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { useState } from "react";
import { X } from "lucide-react";
import { allPhotos } from "@/data/photos";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Al-Abdul Trust Charity Organisation" },
      { name: "description", content: "Photos and stories from our programs across Africa." },
      { property: "og:title", content: "Al-Abdul Trust Gallery" },
      { property: "og:description", content: "See the impact, in pictures." },
    ],
  }),
  component: Gallery,
});

const photos = allPhotos;

function Gallery() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <SiteLayout>
      <PageHero eyebrow="Moments of impact" title="Gallery" subtitle="A look inside our work, the smiles, the labor, the love." />
      <section className="py-20">
        <div className="container-narrow">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [&>*]:mb-4">
            {photos.map((src, i) => (
              <button key={i} onClick={() => setOpen(src)} className="block w-full overflow-hidden rounded-xl group">
                <img src={src} alt={`Gallery ${i}`} loading="lazy" className="w-full transition duration-500 group-hover:scale-105" />
              </button>
            ))}
          </div>
        </div>
      </section>
      {open && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur grid place-items-center p-6 animate-in fade-in" onClick={() => setOpen(null)}>
          <button className="absolute top-6 right-6 text-white/80 hover:text-white"><X className="h-7 w-7" /></button>
          <img src={open} className="max-h-[90vh] max-w-[95vw] rounded-xl shadow-2xl" alt="Lightbox" />
        </div>
      )}
    </SiteLayout>
  );
}
