# 🔧 Setup: Sistema Completo de Sitemap, Robots.txt y LLM.txt

Este documento explica cómo configurar y usar el sistema dinámico de sitemap, robots.txt y llm.txt.

## 📋 Requisitos Previos

- Proyecto Next.js configurado
- Supabase configurado (base de datos)
- Archivo `.env.local` con tus variables de entorno

## 🚀 Instalación Paso a Paso

### 1. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```
NEXT_PUBLIC_BASE_URL=https://tudominio.com
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
```

*(Reemplaza `tudominio.com` con tu dominio real)*

### 2. Crear Tablas en Supabase

1. Ve a tu dashboard de Supabase
2. Abre el **SQL Editor**
3. Copia y pega el contenido del archivo `SQL_SETUP.sql`
4. Ejecuta el script

Esto creará:
- Tabla `site_settings` (configuración del sitemap, robots.txt, llm.txt)
- Tabla `page_seo` (metadatos de cada página)
- Tabla `global_scripts` (GTM, GSC, pixels)

### 3. Archivos Creados/Modificados

**Nuevos archivos:**
- `src/config/publicRoutes.ts` - Rutas públicas del sitio
- `src/app/api/sitemap.xml/route.ts` - API del sitemap dinámico
- `src/app/api/robots.txt/route.ts` - API del robots.txt dinámico
- `src/app/api/llm.txt/route.ts` - API del llm.txt dinámico
- `src/app/admin/components/AdminSettings.tsx` - Panel de configuración
- `SQL_SETUP.sql` - Script de inicialización de BD
- `ADMIN_SETUP.md` - Este archivo

**Archivos modificados:**
- `src/actions/seoActions.ts` - Nuevas funciones para site settings
- `src/app/admin/page.tsx` - Nueva pestaña "Settings"
- `next.config.ts` - Rewrites para servir robots.txt y llm.txt
- `.env.example` - Nuevo NEXT_PUBLIC_BASE_URL
- `public/robots.txt` - Archivo robots.txt básico

## 📚 Cómo Usar

### Acceder al Panel de Settings

1. Ve a `/admin`
2. Ingresa la contraseña (la misma que usas para los otros paneles)
3. Haz clic en la pestaña **"Settings"**

### Gestionar Sitemap

En la pestaña **"Sitemap"**:
- Ves todas las rutas públicas del sitio
- Marca la checkbox para **excluir rutas** del sitemap
- Haz clic en **"Guardar Cambios"**

Las rutas se agregan automáticamente desde `src/config/publicRoutes.ts`.

**Agregar nuevas rutas al sitemap:**
1. Edita `src/config/publicRoutes.ts`
2. Agrega una nueva entrada en el array `publicRoutes`
3. Listo, aparecerá automáticamente en el panel de settings

```typescript
{
  path: '/mi-nueva-pagina',
  priority: 0.8,
  changefreq: 'monthly',
}
```

### Configurar Robots.txt

En la pestaña **"Robots.txt"**:
- El contenido predeterminado es optimizado automáticamente para:
  - Google, Bing, bots de redes sociales
  - Bots de IA (GPTBot, Claude, etc.)
  - Bloqueo de scrapers maliciosos
  - SEO Local para Colombia
  
- **Déjalo en blanco** para usar el automático
- **O personalízalo** con tu propio contenido
- Haz clic en **"Guardar Cambios"**

**Acceso:**
- `https://tudominio.com/robots.txt`
- `https://tudominio.com/api/robots.txt`

### Configurar LLM.txt

En la pestaña **"LLM.txt"**:
- Información para asistentes de IA (ChatGPT, Claude, Perplexity)
- Incluye automáticamente:
  - Sobre tu empresa
  - Servicios ofrecidos
  - Ubicaciones (SEO LOCAL)
  - Instrucciones para LLMs
  - Tecnologías usadas

- **Déjalo en blanco** para usar el automático
- **O personalízalo** según tus necesidades
- Haz clic en **"Guardar Cambios"**

**Acceso:**
- `https://tudominio.com/llm.txt`
- `https://tudominio.com/api/llm.txt`

**Uso en ChatGPT/Claude:**
En ChatGPT, puedes hacer cosas como:
> "Lee esta página: https://tudominio.com/llm.txt y luego responde mis preguntas sobre [tu empresa]"

## 🔗 URLs de Acceso

Una vez deployado:

| Recurso | URL | Actualización |
|---------|-----|---------------|
| Sitemap | `https://tudominio.com/api/sitemap.xml` | Automática (cada 24h) |
| Robots.txt | `https://tudominio.com/robots.txt` | Automática (cada 24h) |
| LLM.txt | `https://tudominio.com/llm.txt` | Automática (cada 24h) |
| Admin Settings | `https://tudominio.com/admin` | Inmediata |

## 🎯 Flujo de Actualización

```
1. Creas una nueva página en Next.js
   ↓
2. Editas src/config/publicRoutes.ts y la agregas
   ↓
3. Vas al Admin → Settings → Sitemap
   ↓
4. Aparece automáticamente en la lista
   ↓
5. Haces clic en "Guardar Cambios" (aunque no hayas excluido nada)
   ↓
6. Se actualiza inmediatamente en:
   - /api/sitemap.xml
   - /robots.txt
   - /llm.txt
```

## 🛠️ Troubleshooting

### Error: "Table site_settings does not exist"
**Solución:** Ejecuta el script `SQL_SETUP.sql` en Supabase

### El robots.txt no aparece en /robots.txt
**Solución:** 
- Verifica que el `next.config.ts` tenga los rewrites
- Rebuild el proyecto: `npm run build && npm start`
- Verifica que `NEXT_PUBLIC_BASE_URL` sea correcto en `.env.local`

### Los cambios no se guardan
**Solución:**
- Verifica que estés autenticado en el admin
- Comprueba la conexión a Supabase
- Revisa los logs de la consola

### El llm.txt o robots.txt contiene "undefined" o no tiene contenido
**Solución:**
- Asegúrate de que `NEXT_PUBLIC_BASE_URL` esté en las variables de entorno
- Recarga la página `/api/llm.txt` o `/api/robots.txt`

## 🔒 Seguridad

- Las tablas requieren autenticación en Supabase
- El admin requiere contraseña
- Los APIs (sitemap, robots, llm) son públicos (como debe ser)
- Los archivos no contienen información sensible

## 📝 Best Practices

1. **Sitemap:**
   - Mantén solo las rutas públicas
   - Excluye admin y APIs privadas
   - Ajusta prioridad según importancia

2. **Robots.txt:**
   - Mantén el predeterminado (está bien optimizado)
   - Solo personaliza si tienes requisitos especiales
   - Recuerda incluir `Sitemap: https://tudominio.com/api/sitemap.xml`

3. **LLM.txt:**
   - Mantén información actualizada
   - Incluye instrucciones claras sobre cómo contactarte
   - Revisa periódicamente que los URLs sean correctos

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs de Supabase
2. Verifica los errores en la consola del navegador (F12)
3. Comprueba que todas las variables de entorno sean correctas

## 🎉 ¡Listo!

Tu sistema de SEO está completamente configurado. Ahora:
- Los buscadores rastrearán correctamente tu sitio
- Los LLMs tendrán información clara sobre tu empresa
- Puedes gestionar todo desde el admin
- Todo se actua liza automáticamente

---

**Última actualización:** Marzo 2026
**Versión:** 1.0
