import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, RotateCcw, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { causes as baseCauses, type Cause } from "@/data/causes";
import { allPhotos } from "@/data/photos";
import { mergeCauses } from "@/lib/merge-causes";
import { getCauseOverrides, saveCauseOverride, resetCauseOverride } from "@/lib/content.functions";

type Draft = Pick<Cause, "title" | "category" | "description" | "image" | "highlights" | "faqs" | "gallery">;

export function ProjectEditor() {
  const fetchOverrides = useServerFn(getCauseOverrides);
  const save = useServerFn(saveCauseOverride);
  const reset = useServerFn(resetCauseOverride);

  const query = useQuery({
    queryKey: ["cause-overrides"],
    queryFn: () => fetchOverrides(),
  });

  const merged = useMemo(() => mergeCauses(query.data?.overrides), [query.data]);
  const [slug, setSlug] = useState(baseCauses[0].slug);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);

  const current = merged.find((c) => c.slug === slug) || merged[0];

  useEffect(() => {
    if (!current) return;
    setDraft({
      title: current.title,
      category: current.category,
      description: current.description,
      image: current.image,
      highlights: current.highlights.map((h) => ({ ...h })),
      faqs: current.faqs.map((f) => ({ ...f })),
      gallery: [...current.gallery],
    });
  }, [slug, query.data]); // eslint-disable-line react-hooks/exhaustive-deps

  if (query.isLoading || !draft || !current) {
    return <Card className="p-6 text-muted-foreground">Loading project details…</Card>;
  }

  function set<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((d) => (d ? { ...d, [key]: value } : d));
  }

  async function onSave() {
    if (!draft) return;
    setSaving(true);
    try {
      await save({
        data: {
          slug,
          title: draft.title,
          category: draft.category,
          description: draft.description,
          image: draft.image,
          highlights: draft.highlights.filter((h) => h.stat.trim() || h.label.trim()),
          faqs: draft.faqs.filter((f) => f.q.trim() || f.a.trim()),
          gallery: draft.gallery.filter(Boolean),
        },
      });
      toast.success("Project details saved. The website is updated.");
      await query.refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save");
    } finally {
      setSaving(false);
    }
  }

  async function onReset() {
    setSaving(true);
    try {
      await reset({ data: { slug } });
      toast.success("Reverted to the original details.");
      await query.refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not revert");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-6">
      <Card className="p-3 h-fit lg:sticky lg:top-6">
        <p className="px-2 py-1 text-xs uppercase tracking-wider text-muted-foreground">Projects</p>
        <div className="mt-1 space-y-1">
          {merged.map((c) => (
            <button
              key={c.slug}
              onClick={() => setSlug(c.slug)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                c.slug === slug ? "bg-secondary font-semibold text-primary" : "hover:bg-secondary/60"
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
      </Card>

      <div className="space-y-6">
        <Card className="p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-xl font-bold text-primary">Edit details</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onReset} disabled={saving} className="gap-2">
                <RotateCcw className="h-4 w-4" /> Revert
              </Button>
              <Button size="sm" onClick={onSave} disabled={saving} className="gap-2">
                <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save changes"}
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input value={draft.title} onChange={(e) => set("title", e.target.value)} />
            </div>
            <div>
              <Label>Category</Label>
              <Input value={draft.category} onChange={(e) => set("category", e.target.value)} />
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea rows={7} value={draft.description} onChange={(e) => set("description", e.target.value)} />
          </div>

          <div>
            <Label>Main photo</Label>
            <Input value={draft.image} onChange={(e) => set("image", e.target.value)} placeholder="Image address" />
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {allPhotos.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => set("image", p)}
                  className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 ${
                    draft.image === p ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img src={p} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-primary">Impact highlights</h3>
            <Button
              size="sm"
              variant="outline"
              className="gap-1"
              onClick={() => set("highlights", [...draft.highlights, { stat: "", label: "" }])}
            >
              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>
          {draft.highlights.map((h, i) => (
            <div key={i} className="grid grid-cols-[110px_1fr_auto] gap-2 items-center">
              <Input
                value={h.stat}
                placeholder="500+"
                onChange={(e) => {
                  const next = [...draft.highlights];
                  next[i] = { ...next[i], stat: e.target.value };
                  set("highlights", next);
                }}
              />
              <Input
                value={h.label}
                placeholder="People served"
                onChange={(e) => {
                  const next = [...draft.highlights];
                  next[i] = { ...next[i], label: e.target.value };
                  set("highlights", next);
                }}
              />
              <Button
                size="icon"
                variant="ghost"
                onClick={() => set("highlights", draft.highlights.filter((_, x) => x !== i))}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-primary">Questions and answers</h3>
            <Button
              size="sm"
              variant="outline"
              className="gap-1"
              onClick={() => set("faqs", [...draft.faqs, { q: "", a: "" }])}
            >
              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>
          {draft.faqs.map((f, i) => (
            <div key={i} className="space-y-2 rounded-lg border p-3">
              <div className="flex gap-2">
                <Input
                  value={f.q}
                  placeholder="Question"
                  onChange={(e) => {
                    const next = [...draft.faqs];
                    next[i] = { ...next[i], q: e.target.value };
                    set("faqs", next);
                  }}
                />
                <Button size="icon" variant="ghost" onClick={() => set("faqs", draft.faqs.filter((_, x) => x !== i))}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <Textarea
                rows={3}
                value={f.a}
                placeholder="Answer"
                onChange={(e) => {
                  const next = [...draft.faqs];
                  next[i] = { ...next[i], a: e.target.value };
                  set("faqs", next);
                }}
              />
            </div>
          ))}
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="font-semibold text-primary">Gallery photos</h3>
          <p className="text-xs text-muted-foreground">Tap a photo to add or remove it from this project.</p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {allPhotos.map((p) => {
              const on = draft.gallery.includes(p);
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() =>
                    set("gallery", on ? draft.gallery.filter((g) => g !== p) : [...draft.gallery, p])
                  }
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
                    on ? "border-primary" : "border-transparent opacity-70"
                  }`}
                >
                  <img src={p} alt="" className="h-full w-full object-cover" />
                </button>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
