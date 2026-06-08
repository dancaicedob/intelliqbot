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

-- ============================================================
-- MIGRACIÓN: Añadir campo category a work_posts
-- Ejecuta esto en el SQL Editor de Supabase si la tabla ya existe
-- ============================================================

ALTER TABLE work_posts
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'software'
CHECK (category IN ('software', 'iot', 'industrial'));

-- Índice opcional para filtrar por categoría
CREATE INDEX IF NOT EXISTS work_posts_category_idx ON work_posts (category);

-- ============================================================
-- INSERT DE PROYECTOS POR DEFECTO (DEMO/AUTOMATIZACIÓN)
-- Ejecuta esto si quieres poblar inicialmente tu base de datos
-- ============================================================

INSERT INTO work_posts (title, description, media_type, media_url, technologies, links, position, is_active, category)
VALUES 
(
  'Domótica Integral para Hogares y Edificios',
  'Diseño e implementación de sistemas residenciales y comerciales inteligentes. Permite el control unificado de iluminación, climatización, seguridad y consumo de energía desde una única interfaz intuitiva o asistentes de voz.',
  'image',
  'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
  ARRAY['ESP32', 'Home Assistant', 'Zigbee', 'MQTT', 'Node-RED'],
  '[{"label": "Cotizar Solución", "url": "/contacto"}]'::jsonb,
  1,
  true,
  'iot'
),
(
  'Sistemas de Apertura Automática de Puertas y Portones',
  'Sistemas automatizados de acceso mediante motores inteligentes de alta potencia. Integración con sensores de proximidad, reconocimiento de placas vehiculares (LPR) y apertura remota desde smartphone.',
  'image',
  'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=1200&q=80',
  ARRAY['Arduino Industrial', 'Motores de Alto Torque', 'Sensores Infrarrojos', 'Wi-Fi Control'],
  '[{"label": "Cotizar Solución", "url": "/contacto"}]'::jsonb,
  2,
  true,
  'iot'
),
(
  'Control de Iluminación Inteligente',
  'Automatización de sistemas de iluminación comercial y residencial. Escenarios programados, control de intensidad (dimming) y apagado/encendido automático basado en sensores de presencia e iluminación natural para eficiencia energética.',
  'image',
  'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=1200&q=80',
  ARRAY['Zigbee', 'Dimmers Digitales', 'Sensores PIR', 'ESP8266'],
  '[{"label": "Cotizar Solución", "url": "/contacto"}]'::jsonb,
  3,
  true,
  'iot'
),
(
  'Riego Automático Inteligente para Jardines',
  'Sistema de irrigación automatizado y eficiente. Ajusta el flujo y los tiempos de riego basándose en lecturas en tiempo real de la humedad del suelo y la integración de pronósticos climáticos vía API.',
  'image',
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80',
  ARRAY['ESP32', 'Electroválvulas Solenoides', 'Sensores de Humedad', 'OpenWeatherMap API'],
  '[{"label": "Cotizar Solución", "url": "/contacto"}]'::jsonb,
  4,
  true,
  'iot'
),
(
  'Automatización de Persianas y Cortinas',
  'Control automático de persianas, cortinas y toldos. Programable por horarios, temperatura interna o incidencia solar (LDR) para optimizar el consumo de aire acondicionado y calefacción.',
  'image',
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
  ARRAY['Motores NEMA', 'ESP32', 'Sensores DS18B20', 'LDRs'],
  '[{"label": "Cotizar Solución", "url": "/contacto"}]'::jsonb,
  5,
  true,
  'iot'
),
(
  'Telemetría y Gestión de Consumo Energético',
  'Monitoreo en tiempo real del consumo eléctrico de plantas industriales, oficinas o residencias. Permite identificar consumos fantasmas, picos de corriente y proyectar el costo de la factura mensual.',
  'image',
  'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
  ARRAY['Sensores SCT-013', 'ESP32', 'Modbus RTU', 'Grafana', 'InfluxDB'],
  '[{"label": "Cotizar Solución", "url": "/contacto"}]'::jsonb,
  6,
  true,
  'industrial'
),
(
  'Control y Climatización de Piscinas y Spas',
  'Automatización integral para el mantenimiento del agua. Control automático del ciclo de filtrado, encendido de calefacción, iluminación LED subacuática y lectura en tiempo real de niveles químicos.',
  'image',
  'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
  ARRAY['Arduino', 'Sensores de pH y ORP', 'Sensores de Temperatura', 'Módulos de Relé'],
  '[{"label": "Cotizar Solución", "url": "/contacto"}]'::jsonb,
  7,
  true,
  'iot'
),
(
  'Monitoreo y Telemetría de Tanques de Agua',
  'Sistema de medición de nivel de agua por ultrasonido. Envía alertas de nivel crítico, automatiza el llenado inteligente y previene el desabastecimiento de agua en conjuntos residenciales o empresas.',
  'image',
  'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1200&q=80',
  ARRAY['Sensor Ultrasónico', 'LoRaWAN', 'ESP32', 'Dashboard en la Nube'],
  '[{"label": "Cotizar Solución", "url": "/contacto"}]'::jsonb,
  8,
  true,
  'industrial'
),
(
  'Sistemas de Alarmas y Seguridad Inteligente',
  'Alarma perimetral conectada y autónoma. Envía notificaciones de intrusión en tiempo real, activa sirenas locales y cuenta con un sistema de respaldo de energía para seguir operando sin electricidad.',
  'image',
  'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80',
  ARRAY['Sensores PIR', 'Módulos GSM', 'ESP32', 'Baterías LiPo Backup'],
  '[{"label": "Cotizar Solución", "url": "/contacto"}]'::jsonb,
  9,
  true,
  'iot'
),
(
  'Control de Acceso Seguro (Biometría, RFID y QR)',
  'Terminales de acceso físico para control de personal y seguridad de instalaciones. Integración con lectores de huellas dactilares, tarjetas de proximidad RFID y lectura rápida de códigos QR para visitantes.',
  'image',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
  ARRAY['Lector Huella FPM10A', 'RFID RC522', 'Cámara Lectura QR', 'Supabase Database'],
  '[{"label": "Cotizar Solución", "url": "/contacto"}]'::jsonb,
  10,
  true,
  'industrial'
),
(
  'Automatización de Bombas de Agua y Presión',
  'Tableros de control automático de motores y bombas de agua. Cuenta con protección por sobrecarga térmica, alternancia automática en sistemas multibomba y arranque basado en demanda.',
  'image',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
  ARRAY['Arduino Industrial', 'Presostatos Electrónicos', 'Contactores Eléctricos', 'Sensores de Flujo'],
  '[{"label": "Cotizar Solución", "url": "/contacto"}]'::jsonb,
  11,
  true,
  'industrial'
)
ON CONFLICT DO NOTHING;
