-- ============================================================
-- Blog Schema
-- ============================================================

-- ---------- posts ----------

CREATE TABLE IF NOT EXISTS public.posts (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  content text,
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  CONSTRAINT posts_pkey PRIMARY KEY (id),
  CONSTRAINT posts_status_check CHECK (status IN ('draft', 'published'))
);

CREATE INDEX IF NOT EXISTS idx_posts_status ON public.posts (status);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts (created_at DESC);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Anonymous visitors read published posts only.
DROP POLICY IF EXISTS "Allow public read of published posts" ON public.posts;

CREATE POLICY "Allow public read of published posts"
  ON public.posts
  FOR SELECT
  TO anon
  USING (status = 'published');

-- Only admins may read drafts — there is no editor/author role yet, so
-- "authenticated" previously meant "any signed-up account, admin or not".
DROP POLICY IF EXISTS "Allow authenticated read" ON public.posts;

CREATE POLICY "Allow authenticated read"
  ON public.posts
  FOR SELECT
  TO authenticated
  USING (status = 'published' OR public.is_admin());

-- Writes require admin — same reasoning. public.is_admin() is defined in
-- the core schema (@plutocms/supabase), which always applies before any
-- layer schema.
DROP POLICY IF EXISTS "Allow authenticated insert" ON public.posts;

CREATE POLICY "Allow authenticated insert"
  ON public.posts
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Allow authenticated update" ON public.posts;

CREATE POLICY "Allow authenticated update"
  ON public.posts
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Allow authenticated delete" ON public.posts;

CREATE POLICY "Allow authenticated delete"
  ON public.posts
  FOR DELETE
  TO authenticated
  USING (public.is_admin());
