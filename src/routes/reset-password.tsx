import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({
  component: ResetPasswordPage,
  head: () => ({
    meta: [
      { title: "Choose a new password | Al-Abdul Trust" },
      { name: "description", content: "Set a new password for your Al-Abdul Trust admin account." },
      { property: "og:title", content: "Choose a new password | Al-Abdul Trust" },
      { property: "og:description", content: "Set a new password for your Al-Abdul Trust admin account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("The two passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("Password updated. You are now signed in.");
      navigate({ to: "/admin" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update the password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteLayout>
      <section className="py-24">
        <div className="container-narrow max-w-md">
          <Card className="p-8">
            <h1 className="font-display text-3xl font-bold text-primary text-center">
              Choose a new password
            </h1>
            {!ready ? (
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Open this page from the reset link in your email, then set your new password here.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="password">New password</Label>
                  <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
                </div>
                <div>
                  <Label htmlFor="confirm">Confirm new password</Label>
                  <Input id="confirm" type="password" required minLength={6} value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password" />
                </div>
                <Button type="submit" disabled={loading} className="w-full rounded-full h-11">
                  {loading ? "Saving…" : "Save new password"}
                </Button>
              </form>
            )}
            <p className="mt-6 text-center text-xs text-muted-foreground">
              <Link to="/auth" className="hover:text-primary">Back to sign in</Link>
            </p>
          </Card>
        </div>
      </section>
    </SiteLayout>
  );
}
