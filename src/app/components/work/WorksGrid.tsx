'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '@/app/components/ProjectCard';
import { getWorkPosts } from '@/actions/workActions';

type Category = 'all' | 'software' | 'iot' | 'industrial';

interface WorkPost {
  id?: string;
  title: string;
  description: string;
  media_type: 'image' | 'video';
  media_url: string;
  media_poster?: string;
  social_url?: string;
  technologies: string[];
  links: { label: string; url: string }[];
  position: number;
  is_active: boolean;
  category?: Category;
}

const TABS: { key: Category; label: string; emoji: string; color: string; active: string }[] = [
  { key: 'all',        label: 'Todo',         emoji: '✦',  color: 'border-white/20 text-gray-400 hover:border-white/40 hover:text-white',        active: 'border-white text-white bg-white/10' },
  { key: 'software',   label: 'IA & Software', emoji: '🤖', color: 'border-cyan-500/30 text-cyan-500/60 hover:border-cyan-400 hover:text-cyan-300',  active: 'border-cyan-400 text-cyan-300 bg-cyan-950/40' },
  { key: 'iot',        label: 'IoT & Hardware', emoji: '📡', color: 'border-emerald-500/30 text-emerald-500/60 hover:border-emerald-400 hover:text-emerald-300', active: 'border-emerald-400 text-emerald-300 bg-emerald-950/40' },
  { key: 'industrial', label: 'Industrial',    emoji: '⚙️', color: 'border-orange-500/30 text-orange-500/60 hover:border-orange-400 hover:text-orange-300',   active: 'border-orange-400 text-orange-300 bg-orange-950/40' },
];

const DEFAULT_PROJECTS: WorkPost[] = [
  {
    title: "Domótica Integral para Hogares y Edificios",
    description: "Diseño e implementación de sistemas residenciales y comerciales inteligentes. Permite el control unificado de iluminación, climatización, seguridad y consumo de energía desde una única interfaz intuitiva o asistentes de voz.",
    media_type: "image",
    media_url: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80",
    technologies: ["ESP32", "Home Assistant", "Zigbee", "MQTT", "Node-RED"],
    links: [{ label: "Cotizar Solución", url: "/contacto" }],
    category: "iot",
    position: 1,
    is_active: true
  },
  {
    title: "Sistemas de Apertura Automática de Puertas y Portones",
    description: "Sistemas automatizados de acceso mediante motores inteligentes de alta potencia. Integración con sensores de proximidad, reconocimiento de placas vehiculares (LPR) y apertura remota desde smartphone.",
    media_type: "image",
    media_url: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=1200&q=80",
    technologies: ["Arduino Industrial", "Motores de Alto Torque", "Sensores Infrarrojos", "Wi-Fi Control"],
    links: [{ label: "Cotizar Solución", url: "/contacto" }],
    category: "iot",
    position: 2,
    is_active: true
  },
  {
    title: "Control de Iluminación Inteligente",
    description: "Automatización de sistemas de iluminación comercial y residencial. Escenarios programados, control de intensidad (dimming) y apagado/encendido automático basado en sensores de presencia e iluminación natural para eficiencia energética.",
    media_type: "image",
    media_url: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=1200&q=80",
    technologies: ["Zigbee", "Dimmers Digitales", "Sensores PIR", "ESP8266"],
    links: [{ label: "Cotizar Solución", url: "/contacto" }],
    category: "iot",
    position: 3,
    is_active: true
  },
  {
    title: "Riego Automático Inteligente para Jardines",
    description: "Sistema de irrigación automatizado y eficiente. Ajusta el flujo y los tiempos de riego basándose en lecturas en tiempo real de la humedad del suelo y la integración de pronósticos climáticos vía API.",
    media_type: "image",
    media_url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80",
    technologies: ["ESP32", "Electroválvulas Solenoides", "Sensores de Humedad", "OpenWeatherMap API"],
    links: [{ label: "Cotizar Solución", url: "/contacto" }],
    category: "iot",
    position: 4,
    is_active: true
  },
  {
    title: "Automatización de Persianas y Cortinas",
    description: "Control automático de persianas, cortinas y toldos. Programable por horarios, temperatura interna o incidencia solar (LDR) para optimizar el consumo de aire acondicionado y calefacción.",
    media_type: "image",
    media_url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    technologies: ["Motores NEMA", "ESP32", "Sensores DS18B20", "LDRs"],
    links: [{ label: "Cotizar Solución", url: "/contacto" }],
    category: "iot",
    position: 5,
    is_active: true
  },
  {
    title: "Telemetría y Gestión de Consumo Energético",
    description: "Monitoreo en tiempo real del consumo eléctrico de plantas industriales, oficinas o residencias. Permite identificar consumos fantasmas, picos de corriente y proyectar el costo de la factura mensual.",
    media_type: "image",
    media_url: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
    technologies: ["Sensores SCT-013", "ESP32", "Modbus RTU", "Grafana", "InfluxDB"],
    links: [{ label: "Cotizar Solución", url: "/contacto" }],
    category: "industrial",
    position: 6,
    is_active: true
  },
  {
    title: "Control y Climatización de Piscinas y Spas",
    description: "Automatización integral para el mantenimiento del agua. Control automático del ciclo de filtrado, encendido de calefacción, iluminación LED subacuática y lectura en tiempo real de niveles químicos.",
    media_type: "image",
    media_url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80",
    technologies: ["Arduino", "Sensores de pH y ORP", "Sensores de Temperatura", "Módulos de Relé"],
    links: [{ label: "Cotizar Solución", url: "/contacto" }],
    category: "iot",
    position: 7,
    is_active: true
  },
  {
    title: "Monitoreo y Telemetría de Tanques de Agua",
    description: "Sistema de medición de nivel de agua por ultrasonido. Envía alertas de nivel crítico, automatiza el llenado inteligente y previene el desabastecimiento de agua en conjuntos residenciales o empresas.",
    media_type: "image",
    media_url: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1200&q=80",
    technologies: ["Sensor Ultrasónico", "LoRaWAN", "ESP32", "Dashboard en la Nube"],
    links: [{ label: "Cotizar Solución", url: "/contacto" }],
    category: "industrial",
    position: 8,
    is_active: true
  },
  {
    title: "Sistemas de Alarmas y Seguridad Inteligente",
    description: "Alarma perimetral conectada y autónoma. Envía notificaciones de intrusión en tiempo real, activa sirenas locales y cuenta con un sistema de respaldo de energía para seguir operando sin electricidad.",
    media_type: "image",
    media_url: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80",
    technologies: ["Sensores PIR", "Módulos GSM", "ESP32", "Baterías LiPo Backup"],
    links: [{ label: "Cotizar Solución", url: "/contacto" }],
    category: "iot",
    position: 9,
    is_active: true
  },
  {
    title: "Control de Acceso Seguro (Biometría, RFID y QR)",
    description: "Terminales de acceso físico para control de personal y seguridad de instalaciones. Integración con lectores de huellas dactilares, tarjetas de proximidad RFID y lectura rápida de códigos QR para visitantes.",
    media_type: "image",
    media_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    technologies: ["Lector Huella FPM10A", "RFID RC522", "Cámara Lectura QR", "Supabase Database"],
    links: [{ label: "Cotizar Solución", url: "/contacto" }],
    category: "industrial",
    position: 10,
    is_active: true
  },
  {
    title: "Automatización de Bombas de Agua y Presión",
    description: "Tableros de control automático de motores y bombas de agua. Cuenta con protección por sobrecarga térmica, alternancia automática en sistemas multibomba y arranque basado en demanda.",
    media_type: "image",
    media_url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    technologies: ["Arduino Industrial", "Presostatos Electrónicos", "Contactores Eléctricos", "Sensores de Flujo"],
    links: [{ label: "Cotizar Solución", url: "/contacto" }],
    category: "industrial",
    position: 11,
    is_active: true
  }
];

export default function WorksGrid() {
  const [posts, setPosts] = useState<WorkPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Category>('all');

  useEffect(() => {
    getWorkPosts()
      .then((data) => {
        if (data && data.length > 0) {
          setPosts(data);
        } else {
          setPosts(DEFAULT_PROJECTS);
        }
      })
      .catch(() => {
        setPosts(DEFAULT_PROJECTS);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() =>
    activeTab === 'all' ? posts : posts.filter((p) => (p.category || 'software') === activeTab),
    [posts, activeTab]
  );

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-mono text-sm tracking-widest">CARGANDO PROYECTOS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">

      {/* ── Tabs de filtro ── */}
      <div className="flex-shrink-0 flex items-center gap-2 pt-24 pb-4 px-2 overflow-x-auto scrollbar-none">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          const count = tab.key === 'all' ? posts.length : posts.filter((p) => (p.category || 'software') === tab.key).length;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-mono font-semibold uppercase tracking-widest transition-all duration-200 ${
                isActive ? tab.active : tab.color
              }`}
            >
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
              {count > 0 && (
                <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${isActive ? 'bg-white/20' : 'bg-white/5'}`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Grid de proyectos ── */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="text-5xl mb-4">🚀</div>
              <p className="text-gray-500 font-mono text-sm">Próximamente proyectos en esta categoría.</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex-1 snap-y snap-mandatory overflow-y-scroll scrollbar-none"
          >
            {filtered.map((post, idx) => (
              <ProjectCard
                key={post.id || idx}
                title={post.title}
                description={post.description}
                media={{
                  type: post.media_type,
                  src: post.media_url,
                  poster: post.media_poster || undefined,
                }}
                social_url={post.social_url || undefined}
                technologies={post.technologies}
                links={post.links}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

