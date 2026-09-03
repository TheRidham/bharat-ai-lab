CREATE TABLE public.expert_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  linkedin_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT INSERT ON public.expert_applications TO anon, authenticated;
GRANT ALL ON public.expert_applications TO service_role;
ALTER TABLE public.expert_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an expert application"
  ON public.expert_applications FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(trim(name)) > 0 AND length(name) <= 120
    AND length(trim(mobile)) BETWEEN 6 AND 20
    AND length(linkedin_url) <= 300
  );