# 🏗️ Arquitectura: Sistema de SEO Dinámico

## Diagrama de Flujo

```
┌─────────────────────────────────────────────────────────────────┐
│                     TU SITIO AGENCIA IA                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  USUARIO FINAL / BUSCADORES / LLMs                             │
│         │           │              │                           │
│         ▼           ▼              ▼                           │
│  ┌────────────┐ ┌─────────┐ ┌──────────────┐                 │
│  │  Tu Sitio  │ │Buscadores│ │ ChatGPT    │                 │
│  │(públicas)  │ │(Google)  │ │ Claude     │                 │
│  └────────────┘ └─────────┘ │ Perplexity │                 │
│                  │            └──────────────┘                 │
│                  │                │                           │
│                  ▼                ▼                           │
│  ┌──────────────────────────────────────────────────┐         │
│  │   Next.js Routes (API Dinámicos)                 │         │
│  ├──────────────────────────────────────────────────┤         │
│  │ /robots.txt        ─────► /api/robots.txt/       │         │
│  │ /llm.txt           ─────► /api/llm.txt/          │         │
│  │ /api/sitemap.xml   ─────► /api/sitemap.xml/      │         │
│  ├──────────────────────────────────────────────────┤         │
│  │ (Rewrites automáticos en next.config.ts)         │         │
│  └──────────────────────────────────────────────────┘         │
│                       │                                       │
│                       ▼                                       │
│  ┌──────────────────────────────────────────────────┐         │
│  │   Funciones Server (seoActions.ts)               │         │
│  ├──────────────────────────────────────────────────┤         │
│  │ • getSiteSettings()      (Obtiene config)        │         │
│  │ • saveSiteSettings()     (Guarda config)         │         │
│  │ • getSeoConfigs()        (Datos de rutas)        │         │
│  │ • getGlobalScripts()     (Marketing tags)        │         │
│  └──────────────────────────────────────────────────┘         │
│                       │                                       │
│                       ▼                                       │
│  ┌──────────────────────────────────────────────────┐         │
│  │   BASE DE DATOS - Supabase (PostgreSQL)          │         │
│  ├──────────────────────────────────────────────────┤         │
│  │ Tabla: site_settings                             │         │
│  │  • id (1)                                        │         │
│  │  • sitemap_excluded_routes   []                  │         │
│  │  • robots_custom_content     ""                  │         │
│  │  • llm_custom_content        ""                  │         │
│  │                                                  │         │
│  │ Tabla: page_seo                                  │         │
│  │  • route, title, description, robots, etc.       │         │
│  │                                                  │         │
│  │ Tabla: global_scripts                            │         │
│  │  • gtm_id, gsc_id, pixel_id                      │         │
│  └──────────────────────────────────────────────────┘         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    ADMIN PANEL (Protegido)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Acceso: https://tudominio.com/admin (+ contraseña)            │
│                                                                 │
│  ┌─────────────────────────────────────────────────────┐       │
│  │ Pestañas:                                           │       │
│  ├─────────────────────────────────────────────────────┤       │
│  │ • Leads      → Tabla de prospectosformulario       │       │
│  │ • Citas      → Calendario y horarios               │       │
│  │ • SEO/Meta   → Títulos, descripciones por página   │       │
│  │ • Marketing  → GTM, GSC, Pixels                    │       │
│  │ • SETTINGS   → Nuevo: Sitemap, Robots, LLM ← ← ← │       │
│  └─────────────────────────────────────────────────────┘       │
│                    │                                           │
│                    ▼                                           │
│  ┌─────────────────────────────────────────────────────┐       │
│  │ AdminSettings Component (/admin/components/...)    │       │
│  ├─────────────────────────────────────────────────────┤       │
│  │ • Tab 1: Sitemap (Ver + Excluir rutas)            │       │
│  │ • Tab 2: Robots.txt (Personalizar / Auto)          │       │
│  │ • Tab 3: LLM.txt (Personalizar / Auto)             │       │
│  │ • Botón: Guardar Cambios (API call)                │       │
│  └─────────────────────────────────────────────────────┘       │
│                    │                                           │
│                    ▼                                           │
│  ┌─────────────────────────────────────────────────────┐       │
│  │ Guarda en Supabase > site_settings                 │       │
│  │ Invalida cache (revalidatePath)                     │       │
│  │ APIs dinámicos se actualizan al siguiente request   │       │
│  └─────────────────────────────────────────────────────┘       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

```

## Estructura de Archivos Creados/Modificados

```
proyecto/
├── 📄 .env.local                              ← Nuevo (crear manualmente)
│  └─ NEXT_PUBLIC_BASE_URL=https://...
│
├── 📄 .env.example                            ✏️ Modificado
│  └─ Agregado: NEXT_PUBLIC_BASE_URL
│
├── src/
│  ├── config/
│  │  └── 📄 publicRoutes.ts                  ✨ Nuevo
│  │     └─ Array de rutas públicas del sitio
│  │
│  ├── actions/
│  │  └── 📄 seoActions.ts                    ✏️ Modificado
│  │     └─ Agregadas: getSiteSettings(), saveSiteSettings()
│  │
│  ├── app/
│  │  ├── admin/
│  │  │  ├── 📄 page.tsx                      ✏️ Modificado
│  │  │  │  └─ Agregada pestaña: 'settings'
│  │  │  │  └─ Importado AdminSettings component
│  │  │  │
│  │  │  └── components/
│  │  │     └── 📄 AdminSettings.tsx          ✨ Nuevo
│  │  │        └─ Panel de configuración de SEO
│  │  │
│  │  ├── api/
│  │  │  ├── sitemap.xml/
│  │  │  │  └── 📄 route.ts                   ✏️ Existente
│  │  │  │
│  │  │  ├── robots.txt/
│  │  │  │  └── 📄 route.ts                   ✨ Nuevo
│  │  │  │     └─ GET → genera robots.txt dinámico
│  │  │  │
│  │  │  └── llm.txt/
│  │  │     └── 📄 route.ts                   ✨ Nuevo
│  │  │        └─ GET → genera llm.txt dinámico
│  │  │
│  │  └── layout.tsx, page.tsx, ...            (sin cambios)
│  │
│  └── lib/
│      └── (archivos de configuración)        (sin cambios)
│
├── public/
│  ├── 📄 robots.txt                           ✏️ Modificado
│  │  └─ Referencia a /api/robots.txt (dinámico)
│  │
│  └── (otros archivos estáticos)             (sin cambios)
│
├── 📄 next.config.ts                          ✏️ Modificado
│  └─ Agregadas reglas de rewrite para robots.txt y llm.txt
│
├── 📄 package.json                            (sin cambios)
│  └─ Ya tiene las dependencias necesarias
│
├── 📄 tsconfig.json                           (sin cambios)
│
├── 📄 SQL_SETUP.sql                           ✨ Nuevo
│  └─ Script SQL para crear tablas en Supabase
│
├── 📄 ADMIN_SETUP.md                          ✨ Nuevo
│  └─ Documentación completa del sistema
│
├── 📄 SETUP_CHECKLIST.md                      ✨ Nuevo
│  └─ Paso a paso de configuración
│
├── 📄 LLM_REFERENCE.txt                       ✨ Nuevo
│  └─ Contenido de ejemplo para llm.txt
│
└── 📄 ARCHITECTURE.md                         ✨ Nuevo
   └─ Este archivo (diagrama visual)

```

## Flujo de Datos - Ejemplo Práctico

### Agregar una Nueva Página

```
1. CREAR PÁGINA EN NEXT.JS
   ↓
   src/app/nueva-pagina/page.tsx ← creas el archivo
   ↓
2. AGREGAR A publicRoutes.ts
   ↓
   src/config/publicRoutes.ts ← agregas entrada:
   {
     path: '/nueva-pagina',
     priority: 0.8,
     changefreq: 'monthly'
   }
   ↓
3. SYNC CON ADMIN PANEL
   ↓
   Admin → Settings → Sitemap ← aparece automáticamente
   (sin hacer nada, está ahí)
   ↓
4. GUARDAR CAMBIOS
   ↓
   Botón "Guardar Cambios" en el admin
   ↓
5. APIS SE ACTUALIZAN AUTOMÁTICAMENTE
   ↓
   ✓ /api/sitemap.xml (incluye /nueva-pagina)
   ✓ /api/robots.txt (se regenera con timestamp)
   ✓ /llm.txt (se regenera con timestamp)
   ↓
6. LISTO
   Google, ChatGPT, etc. ven los cambios en el siguiente rastreo
   (caché de 24 horas)
```

### Excluir una Página del Sitemap

```
Admin Panel
    ↓
Settings → Sitemap
    ↓
Marcar checkbox ☑ "Excluir" en alguna página
    ↓
Guardar Cambios
    ↓
Información se guarda en: site_settings.sitemap_excluded_routes
    ↓
En próximo request a /api/sitemap.xml:
  • getSiteSettings() obtiene el array
  • publicRoutes se filtra automáticamente
  • XML se genera sin esa ruta
    ↓
LISTO - La ruta desaparece del sitemap
```

### Personalizar Robots.txt

```
Admin Panel
    ↓
Settings → Robots.txt
    ↓
(Opción 1) Dejas vacío = usa contenido automático optimizado
(Opción 2) Pegasmitu propio contenido = usa ese
    ↓
Guardar Cambios
    ↓
Se guarda en: site_settings.robots_custom_content = "..."
    ↓
En próximo GET a /api/robots.txt:
  • Si robots_custom_content está vacío → usa default optimizado
  • Si tiene contenido → lo usa tal cual
    ↓
LISTO - /robots.txt se actualiza automáticamente
```

## Caching y Performance

```
┌─────────────────────────────────────┐
│ Cliente solicitó /api/sitemap.xml   │
└──────────────┬──────────────────────┘
               │
               ▼
      ┌─────────────────────┐
      │ ¿Está en caché?      │
      │ (s-maxage=3600)      │
      └────────┬────┬────────┘
               │    │
              SÍ   NO
               │    │
               ▼    ▼
            Servir  GET BD
            caché   ↓
                  Generar XML
                    ↓
                  Servir + caché
                    (1 hora)

```

## Seguridad

```
PUBLIC (Sin Autenticación)
├─ /robots.txt
├─ /api/robots.txt
├─ /llm.txt
├─ /api/llm.txt
└─ /api/sitemap.xml
  (Esto es correcto - buscadores y LLMs necesitan acceso)

PRIVATE (Con Autenticación Supabase)
├─ TABLA: site_settings
├─ TABLA: page_seo
├─ TABLA: global_scripts
└─ Endpoint Admin: /admin (contraseña + servidor)

```

## Ventajas de esta Arquitectura

✅ **Dinámico:** Cambios reflejados inmediatamente (tras guardar)
✅ **Escalable:** Fácil agregar más opciones de configuración
✅ **Seguro:** Admin protegido, APIs públicas son read-only
✅ **Performante:** Caché de 24 horas en APIs
✅ **SEO Optimizado:** Incluye best practices (robots, local SEO)
✅ **Mantenible:** Config en base de datos, no hardcodeado
✅ **IA-Friendly:** LLM.txt específicamente para modelos de lenguaje
✅ **Colombia-First:** SEO local para las 3 ciudades

---

**Creado:** Marzo 2026
**Versión:** 1.0 - Producción Ready
