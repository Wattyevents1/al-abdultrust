import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type CauseOverride = {
  slug: string;
  title: string | null;
  category: string | null;
  description: string | null;
  image: string | null;
  highlights: { stat: string; label: string }[] | null;
  faqs: { q: string; a: string }[] | null;
  gallery: string[] | null;
};

const OverrideSchema = z.object({
  slug: z.string().trim().min(1).max(120),
  title: z.string().trim().max(200).nullable().optional(),
  category: z.string().trim().max(120).nullable().optional(),
  description: z.string().trim().max(8000).nullable().optional(),
  image: z.string().trim().max(2000).nullable().optional(),
  highlights: z
    .array(z.object({ stat: z.string().max(60), label: z.string().max(160) }))
    .max(12)
    .nullable()
    .optional(),
  faqs: z
    .array(z.object({ q: z.string().max(300), a: z.string().max(3000) }))
    .max(20)
    .nullable()
    .optional(),
  gallery: z.array(z.string().max(2000)).max(24).nullable().optional(),
});

async function publicClient() {
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_PUBLISHABLE_KEY"] || process.env["SUPABASE_ANON_KEY"]!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

export const getCauseOverrides = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const supabase = await publicClient();
    const { data, error } = await supabase
      .from("cause_overrides")
      .select("slug,title,category,description,image,highlights,faqs,gallery");
    if (error) return { overrides: [] as CauseOverride[] };
    return { overrides: (data || []) as CauseOverride[] };
  } catch {
    return { overrides: [] as CauseOverride[] };
  }
});

async function assertAdmin(context: unknown) {
  const { supabase, userId } = context as { supabase: any; userId: string };
  const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId);
  const isAdmin = (data || []).some((r: { role: string }) => r.role === "admin");
  if (!isAdmin) throw new Error("Forbidden: admin only");
}

export const saveCauseOverride = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => OverrideSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("cause_overrides").upsert(
      {
        slug: data.slug,
        title: data.title ?? null,
        category: data.category ?? null,
        description: data.description ?? null,
        image: data.image ?? null,
        highlights: data.highlights ?? null,
        faqs: data.faqs ?? null,
        gallery: data.gallery ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" },
    );
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const resetCauseOverride = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ slug: z.string().trim().min(1).max(120) }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("cause_overrides").delete().eq("slug", data.slug);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
