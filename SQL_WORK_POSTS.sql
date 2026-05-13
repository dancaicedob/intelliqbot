-- ============================================================
-- SQL para crear la tabla work_posts en Supabase
-- Ejecuta este script en el SQL Editor de Supabase
-- ============================================================

CREATE TABLE IF NOT EXISTS work_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  media_url TEXT NOT NULL,
  media_poster TEXT DEFAULT '',       -- Miniatura para videos (opcional)
  social_url TEXT DEFAULT '',         -- URL de TikTok o Instagram para embed
  technologies TEXT[] DEFAULT ARRAY[]::TEXT[],
  links JSONB DEFAULT '[]'::JSONB,    -- [{ "label": "Demo", "url": "..." }]
  position INTEGER DEFAULT 0,         -- Orden de aparición
  is_active BOOLEAN DEFAULT TRUE,     -- Publicado o borrador
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índice para ordenar rápido
CREATE INDEX IF NOT EXISTS work_posts_position_idx ON work_posts (position ASC);

-- RLS
ALTER TABLE work_posts ENABLE ROW LEVEL SECURITY;

-- Política lectura pública (la página /work es pública)
CREATE POLICY "Lectura pública de work_posts"
ON work_posts FOR SELECT
TO anon, authenticated
USING (is_active = TRUE);

-- Política escritura solo para authenticated (admin)
CREATE POLICY "Escritura admin work_posts"
ON work_posts FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Trigger para updated_at automático
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_work_posts_updated_at ON work_posts;
CREATE TRIGGER update_work_posts_updated_at
  BEFORE UPDATE ON work_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- Bucket de Supabase Storage para media de /work
-- Ejecuta esto TAMBIÉN en el SQL Editor:
-- ============================================================

-- Crear el bucket (si falla, créalo manualmente en Storage > New bucket)
INSERT INTO storage.buckets (id, name, public)
VALUES ('work-media', 'work-media', TRUE)
ON CONFLICT (id) DO NOTHING;

-- Política de lectura pública para el bucket
CREATE POLICY "Lectura pública work-media"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'work-media');

-- Política de escritura para usuarios authenticated
CREATE POLICY "Escritura admin work-media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'work-media');

CREATE POLICY "Update admin work-media"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'work-media');

CREATE POLICY "Delete admin work-media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'work-media');
