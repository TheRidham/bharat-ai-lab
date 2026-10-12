CREATE TABLE public.business_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_name TEXT NOT NULL,
  business_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_type TEXT NOT NULL,
  service_area TEXT NOT NULL,
  website TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.business_inquiries TO anon, authenticated;
GRANT ALL ON public.business_inquiries TO service_role;
ALTER TABLE public.business_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a valid business inquiry"
  ON public.business_inquiries FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(trim(contact_name)) BETWEEN 2 AND 120
    AND length(trim(business_name)) BETWEEN 2 AND 160
    AND length(trim(email)) BETWEEN 3 AND 254
    AND email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    AND length(trim(phone)) BETWEEN 7 AND 24
    AND business_type IN ('healthcare', 'legal', 'home-services', 'other')
    AND length(trim(service_area)) BETWEEN 2 AND 140
    AND (website IS NULL OR length(trim(website)) <= 300)
  );