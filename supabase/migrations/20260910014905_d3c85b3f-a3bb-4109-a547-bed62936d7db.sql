CREATE TABLE public.cause_overrides (
  slug TEXT PRIMARY KEY,
  title TEXT,
  category TEXT,
  description TEXT,
  image TEXT,
  highlights JSONB,
  faqs JSONB,
  gallery JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.cause_overrides TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cause_overrides TO authenticated;
GRANT ALL ON public.cause_overrides TO service_role;

ALTER TABLE public.cause_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read project content"
ON public.cause_overrides FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admins can manage project content"
ON public.cause_overrides FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$
LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_cause_overrides_updated_at
BEFORE UPDATE ON public.cause_overrides
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();