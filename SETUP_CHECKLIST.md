# ✅ CHECKLIST DE SETUP - Sistema de SEO Global

Sigue estos pasos en orden para activar el sistema completo.

## 📋 PASO 1: Variables de Entorno
- [ ] Abre `.env.local` (o créalo si no existe)
- [ ] Agrega: `NEXT_PUBLIC_BASE_URL=https://tudominio.com`
- [ ] Reemplaza `tudominio.com` con tu dominio real
- [ ] Guarda el archivo

**Archivo:** `.env.local`

## 📋 PASO 2: Crear Tablas en Supabase
- [ ] Abre tu dashboard de Supabase
- [ ] Ve a **SQL Editor**
- [ ] Copia el contenido completo de `SQL_SETUP.sql`
- [ ] Pégalo en el editor
- [ ] Haz clic en **"Run"** (botón de play)
- [ ] Verifica que se ejecutó sin errores

**Archivo:** `SQL_SETUP.sql`
**Resultado esperado:** 8 primeras tablas/funciones creadas correctamente

## 📋 PASO 3: Agregar Rutas al Sitemap
- [ ] Abre `src/config/publicRoutes.ts`
- [ ] Verifica que todas tus rutas públicas estén listadas
- [ ] Si falta alguna, agrégala en el array `publicRoutes`
- [ ] Formato:
```typescript
{
  path: '/ruta',
  priority: 0.8,        // 0.0 a 1.0
  changefreq: 'monthly' // always, hourly, daily, weekly, monthly, yearly, never
}
```
- [ ] Guarda el archivo

**Archivo:** `src/config/publicRoutes.ts`

## 📋 PASO 4: Verificar Configuración
- [ ] Abre `next.config.ts`
- [ ] Verifica que tenga los `rewrites` para `/robots.txt` y `/llm.txt`
- [ ] Si no están, el archivo ya fue actualizado

**Archivo:** `next.config.ts`

## 📋 PASO 5: Actualizar Dominio en Archivos
- [ ] Abre `public/robots.txt`
- [ ] Busca y reemplaza `tudominio.com` con tu dominio real
- [ ] Guarda

**Archivo:** `public/robots.txt`

## 📋 PASO 6: Build y Deploy
- [ ] Terminal: `npm run build`
- [ ] Espera que termine sin errores
- [ ] Verifica que no hay warnings relacionados a las nuevas rutas
- [ ] Deploy a Vercel (o tu hosting)

**Comando:** `npm run build`

## 📋 PASO 7: Probar los URLs Públicos

Después de deployar, verifica que los archivos se sirven correctamente:

- [ ] Abre `https://tudominio.com/robots.txt`
  - Debe mostrar contenido de robots.txt
  
- [ ] Abre `https://tudominio.com/api/robots.txt`
  - Debe mostrar el mismo contenido
  
- [ ] Abre `https://tudominio.com/api/sitemap.xml`
  - Debe mostrar XML con tus rutas
  
- [ ] Abre `https://tudominio.com/llm.txt`
  - Debe mostrar información de tu empresa

**Nota:** Si ves "undefined" o vacío, verifica que NEXT_PUBLIC_BASE_URL sea correcto

## 📋 PASO 8: Acceder al Panel Admin

- [ ] Abre `https://tudominio.com/admin`
- [ ] Ingresa tu contraseña de admin
- [ ] Deberías ver 5 pestañas:
  - [ ] Leads
  - [ ] Citas
  - [ ] SEO/Meta
  - [ ] Marketing
  - [ ] **Settings** (nueva)
- [ ] Haz clic en **Settings**
- [ ] Deberías ver 3 sub-pestañas:
  - [ ] Sitemap
  - [ ] Robots.txt
  - [ ] LLM.txt

## 📋 PASO 9: Probar Funcionalidades

### Probar Sitemap
- [ ] Ve a Settings → Sitemap
- [ ] Verifica que todas tus rutas aparezcan listadas
- [ ] (Opcional) Prueba excluir una ruta
- [ ] Haz clic en **"Guardar Cambios"**
- [ ] Verifica que se actualizó `/api/sitemap.xml`

### Probar Robots.txt
- [ ] Ve a Settings → Robots.txt
- [ ] Verifica que veas el contenido optimizado
- [ ] Déjalo como está (contenido automático es perfecto)
- [ ] (Opcional) Personaliza si lo necesitas
- [ ] Haz clic en **"Guardar Cambios"**
- [ ] Verifica que se actualizó `/robots.txt`

### Probar LLM.txt
- [ ] Ve a Settings → LLM.txt
- [ ] Verifica que veas la información de tu empresa
- [ ] Personaliza con tus datos específicos si lo necesitas
- [ ] Haz clic en **"Guardar Cambios"**
- [ ] Verifica que se actualizó `/llm.txt`

## 📋 PASO 10: Verificar en Google Search Console (opcional)

- [ ] Ve a Google Search Console
- [ ] Agrega sitio si no está
- [ ] Ve a "Sitemaps"
- [ ] Haz clic en "Nuevo Sitemap"
- [ ] Ingresa: `https://tudominio.com/api/sitemap.xml`
- [ ] Google debería encontrar y procesar tu sitemap

## ✅ COMPLETADO

Si llegaste aquí, ¡tu sistema está 100% operativo!

### Lo que está funcionando:

✅ **Sitemap Dinámico**
- Se actualiza automáticamente cuando agregas rutas
- Configurable desde el admin
- Accesible en `/api/sitemap.xml`

✅ **Robots.txt Dinámico**
- Optimizado para SEO
- Incluye instrucciones para bots de IA
- Bloquea scrapers maliciosos
- Accesible en `/robots.txt`

✅ **LLM.txt Dinámico**
- Información clara para asistentes de IA
- Incluye contacto y servicios
- SEO Local para Colombia
- Accesible en `/llm.txt`

✅ **Panel de Admin**
- Gestita todo desde una interfaz
- Cambios en tiempo real
- Sin necesidad de redeploy

---

## 🆘 Si Algo No Funciona

### Error 404 en /robots.txt
```
Solución: Verifica next.config.ts tiene rewrites y haz rebuild
npm run build && npm start
```

### "undefined" en los archivos
```
Solución: Verifica NEXT_PUBLIC_BASE_URL en .env.local
Asegúrate de que sea: https://tudominio.com (sin slash al final)
```

### Admin Settings no carga
```
Solución: Verifica que SQL_SETUP.sql se ejecutó correctamente en Supabase
Verifica que puedas conectar a la base de datos
```

### Rutas no aparecen en sitemap
```
Solución: Verifica que estén en src/config/publicRoutes.ts
Haz rebuild: npm run build
```

---

## 📚 Archivos de Referencia

- `ADMIN_SETUP.md` - Documentación completa
- `LLM_REFERENCE.txt` - Contenido de ejemplo para llm.txt
- `SQL_SETUP.sql` - Script de base de datos
- `src/config/publicRoutes.ts` - Definición de rutas públicas
- `src/app/admin/components/AdminSettings.tsx` - Panel de settings

---

**Última actualización:** Marzo 2026
**Estado Sistema:** Producción Ready
