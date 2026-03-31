-- SQL para crear la tabla site_settings en Supabase
-- Ejecuta este script en el SQL Editor de Supabase

CREATE TABLE IF NOT EXISTS site_settings (
  id BIGINT PRIMARY KEY DEFAULT 1,
  sitemap_excluded_routes TEXT[] DEFAULT ARRAY[]::TEXT[],
  robots_custom_content TEXT DEFAULT '',
  llm_custom_content TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT only_one_row CHECK (id = 1)
);

-- Enable RLS if needed
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Política: Solo admin puede leer/escribir (authenticated users)
CREATE POLICY "Permite lectura a admin" 
ON site_settings 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Permite escritura a admin" 
ON site_settings 
FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Permite insertar a admin" 
ON site_settings 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- Insert fila inicial
INSERT INTO site_settings (id, sitemap_excluded_routes, robots_custom_content, llm_custom_content)
VALUES (
  1,
  ARRAY[]::TEXT[],
  '',
  ''
)
ON CONFLICT (id) DO NOTHING;

-- Crear tabla global_scripts si no existe (para asegurar que existe)
CREATE TABLE IF NOT EXISTS global_scripts (
  id BIGINT PRIMARY KEY DEFAULT 1,
  gtm_id TEXT DEFAULT '',
  gsc_id TEXT DEFAULT '',
  pixel_id TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla page_seo si no existe (para asegurar que existe)
CREATE TABLE IF NOT EXISTS page_seo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  robots TEXT DEFAULT 'index, follow',
  canonical TEXT DEFAULT '',
  keywords TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insertar configuraciones SEO por defecto para las rutas principales
INSERT INTO page_seo (route, title, description, robots, keywords)
VALUES 
  ('/', 'Agencia IA | Automatización de Ventas con Inteligencia Artificial', 'Soluciones de automatización de ventas mediante IA. Chatbots, Lead Generation y CRM inteligente para empresas en Colombia.', 'index, follow', 'IA, automatización, ventas, chatbots, lead generation, CRM, inteligencia artificial'),
  ('/servicios', 'Servicios de Automatización IA | Agencia IA', 'Descubre nuestros servicios: Chatbots IA, Lead Generation automática, Automatización de procesos y CRM inteligente.', 'index, follow', 'servicios IA, automatización, chatbots, lead generation, CRM'),
  ('/work', 'Portafolio | Casos de Éxito | Agencia IA', 'Revisa nuestros casos de éxito en automatización de ventas. Proyectos reales con resultados medibles.', 'index, follow', 'casos de éxito, portafolio, proyectos IA'),
  ('/nosotros', 'Sobre Nosotros | Agencia IA', 'Conoce nuestro equipo, valores y experiencia en automatización de ventas con inteligencia artificial.', 'index, follow', 'sobre nosotros, equipo, agencia IA'),
  ('/contacto', 'Contacto | Agencia IA', 'Contáctanos para una consultoría gratuita sobre automatización de ventas. Ubicaciones en Bogotá, Cali y Medellín.', 'index, follow', 'contacto, consultoría, asesoría IA'),
  ('/automatizacion-ventas-bogota', 'Automatización de Ventas Bogotá | Agencia IA', 'Soluciones de automatización IA para empresas en Bogotá. Aumenta ventas con chatbots y lead generation.', 'index, follow', 'automatización Bogotá, ventas Bogotá, IA Colombia'),
  ('/automatizacion-ventas-cali', 'Automatización de Ventas Cali | Agencia IA', 'Especialización en automatización de ventas para empresas en Cali. E-commerce y ventas B2C.', 'index, follow', 'automatización Cali, ventas Cali, e-commerce'),
  ('/automatizacion-ventas-medellin', 'Automatización de Ventas Medellín | Agencia IA', 'Soluciones IA para startups y empresas tech en Medellín. Automatización rápida y efectiva.', 'index, follow', 'automatización Medellín, startups, IA Medellín')
ON CONFLICT (route) DO NOTHING;

-- Opcional: Crear función para actualizar el updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear triggers para actualizar updated_at
DROP TRIGGER IF EXISTS update_site_settings_updated_at on site_settings;
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE on site_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_page_seo_updated_at on page_seo;
CREATE TRIGGER update_page_seo_updated_at BEFORE UPDATE on page_seo
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_global_scripts_updated_at on global_scripts;
CREATE TRIGGER update_global_scripts_updated_at BEFORE UPDATE on global_scripts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
