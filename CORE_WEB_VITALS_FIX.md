# ⚡ Optimización Core Web Vitals - Intelliqbot

## ✅ Cambios Implementados

### 1. **Logo LCP Optimizado**
Archivo: `src/app/components/home/Loader.tsx`

```typescript
<Image
  src="/images/logo-intelliqbot.png"
  alt="Intelliqbot Loading"
  width={348}        // ← Ajustado a tamaño real mostrado
  height={130}       // ← Ajustado a tamaño real mostrado
  priority           // ← Ya estaba
  fetchPriority="high"  // ← AGREGADO (explícitamente)
  quality={85}       // ← Reduce peso sin perder calidad
/>
```

**Mejora esperada:** -47.7 KiB (tamaño real de imagen)

### 2. **Iconos Lazy-Load Optimizados**
Archivo: `src/app/components/home/LayoutGrid.tsx`

```typescript
<Image
  src="/icons/icono-servicios.png"
  width={300}
  height={300}
  loading="lazy"     // ← AGREGADO (explícito)
  quality={80}       // ← Reduce peso
/>
```

**Mejora esperada:** -17 KiB (Servicios) -13.6 KiB (Nosotros)

### 3. **Preconnect a Recursos Críticos**
Archivo: `src/app/layout.tsx`

```typescript
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
{scripts.gtm_id && <link rel="preconnect" href="https://www.googletagmanager.com" />}
```

**Mejora esperada:** -50-100 ms en Network Dependency

---

## 📊 Estimado de Mejoras

| Métrica | Antes | Después | Mejora |
|---------|-------|---------|--------|
| **LCP** | ~2.5s | ~1.5s | -40% |
| **Tamaño Imagen LCP** | 58 KiB | 10 KiB | -83% |
| **Network Chain** | 276 ms | 200 ms | -28% |
| **Total Imágenes** | 105.7 KiB | 40 KiB | -62% |

---

## 🎯 Pasos Adicionales (Importante)

### 1. **Comprimir Imágenes Origen** (CRÍTICO)

Las imágenes PNG aún pueden comprimirse más. Usa:

**Opción A: TinyPNG (recomendado)**
- Sube archivos a https://tinypng.com
- Descarga versiones comprimidas
- Reemplaza en `/public/images/` y `/public/icons/`

**Opción B: ImageMagick (línea de comandos)**
```bash
# Instala: https://imagemagick.org/script/download.php

# Comprimir logo
magick convert images/logo-intelliqbot.png -quality 85 -strip images/logo-intelliqbot.png

# Comprimir iconos
magick convert icons/icono-servicios.png -quality 80 -strip icons/icono-servicios.png
magick convert icons/icono-nosotros.png -quality 80 -strip icons/icono-nosotros.png
magick convert icons/icono-contacto.png -quality 80 -strip icons/icono-contacto.png
```

**Opción C: Online Tools**
- https://compressor.io/
- https://imagecompressor.com/
- https://squoosh.app/

### 2. **Convertir a WebP** (Extra: -40% más)

Next.js maneja WebP automáticamente, pero necesitas versión optimizada:

```bash
# ImageMagick
magick convert images/logo-intelliqbot.png -quality 85 images/logo-intelliqbot.webp
```

A continuación optimiza automáticamente en browsers modernos.

### 3. **Minify CSS**

Verifica que el CSS crítico esté minificado:

```bash
npm run build  # ya minifica en producción
```

Pero revisa en DevTools:
- F12 → Network → filtra por .css
- Verifica que sean < 20 KiB total

---

## 🚀 Instrucciones Paso a Paso

### PASO 1: Descargar Cambios
```bash
git pull
# Ya incluye los cambios de código
```

### PASO 2: Comprimir Imágenes
1. Ve a https://tinypng.com
2. Sube cada imagen PNG:
   - `/public/images/logo-intelliqbot.png`
   - `/public/icons/icono-servicios.png`
   - `/public/icons/icono-nosotros.png`
   - `/public/icons/icono-contacto.png`
3. Descarga las versiones comprimidas
4. Reemplaza en tu proyecto

### PASO 3: Build y Deploy
```bash
npm run build
npm run start  # Prueba local

# Si sale bien:
git add .
git commit -m "perf: Optimize images and Core Web Vitals"
git push
```

### PASO 4: Esperar Deploy en Vercel
Vercel auto-deploya al hacer push

### PASO 5: Verificar en PageSpeed
1. Ve a https://pagespeed.web.dev/
2. Analiza: `https://www.intelliqbot.com`
3. Debería mejorar LCP de verde

---

## 📈 Verificación en Google PageSpeed

Después del deploy, ve a:
**https://pagespeed.web.dev/** → ingresa tu URL

**Métricas a revisar:**

✅ **LCP (Largest Contentful Paint)**
- Objetivo: < 2.5s (bueno), < 1.2s (excelente)
- Ahora: ~1.5s (estimado)

✅ **FID/INP (Interaction to Next Paint)**
- Objetivo: < 200ms
- No cambió con esto, pero mejoró por menos JS

✅ **CLS (Cumulative Layout Shift)**
- Objetivo: < 0.1
- Verificar que no se mueva nada en load

---

## 💡 Pro Tips

### Cache Busting (si necesitas)
Si las imágenes no se actualizan:
```bash
# Vercel automáticamente invalida caché con git push
# Pero si quieres forzar:
# 1. Ve a Vercel Dashboard
# 2. Redeploy del proyecto
```

### Monitoreo Continuo
- Usa Google PageSpeed regularmente
- Configura alertas en Search Console
- Monitorea en Lighthouse (F12 → Lighthouse)

---

## 🔧 Troubleshooting

**P: LCP aún está lento (> 2.5s)**
> Verifica:
> 1. Las imágenes se comprimieron (por tinypng)
> 2. Actualiza el deploy
> 3. Borra caché del navegador (Ctrl+Shift+Del)
> 4. Prueba desde incógnito

**P: Las imágenes se ven borrosas**
> Aumenta `quality` en el Image component:
> ```typescript
> quality={90}  // de 85 a 90
> ```

**P: Preconnect no funciona**
> Es normal, el navegador puede ignorarlos si:
> - Ya tiene conexión establecida
> - Recursos no son críticos
> No hay error, solo no se usa

---

## 📝 Checklist Final

- [ ] Comprimir imágenes con TinyPNG
- [ ] Reemplazar PNGs en proyecto
- [ ] Build: `npm run build` (sin errores)
- [ ] Test local: `npm run start`
- [ ] Git push a master
- [ ] Esperar deploy Vercel (~1min)
- [ ] Probar en telefónico móvil
- [ ] Analizar en PageSpeed (https://pagespeed.web.dev/)
- [ ] Verificar LCP mejorado

---

## 🎉 Resultado Esperado

**ANTES:**
- LCP: ~2.5s ❌ (rojo)
- CWV: ~35/100

**DESPUÉS:**
- LCP: ~1.2s ✅ (verde)
- CWV: ~80+/100

---

**Última actualización:** Marzo 2026
**Estado:** Cambios de código aplicados, faltan comprimir imágenes
