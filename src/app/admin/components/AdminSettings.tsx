'use client';

import { useState, useEffect } from 'react';
import { getSiteSettings, saveSiteSettings } from '@/actions/seoActions';
import { publicRoutes } from '@/config/publicRoutes';

interface SiteSettings {
  id?: number;
  sitemap_excluded_routes: string[];
  robots_custom_content: string;
  llm_custom_content: string;
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'sitemap' | 'robots' | 'llm'>('sitemap');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await getSiteSettings();
      setSettings(data as SiteSettings);
    } catch (err) {
      console.error('Error loading settings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      if (!settings) return;
      await saveSiteSettings(settings);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert('Error guardando configuración: ' + err);
    }
  };

  const toggleRoute = (path: string) => {
    setSettings((prev: SiteSettings | null) => {
      if (!prev) return null;
      const excluded = prev.sitemap_excluded_routes || [];
      const isExcluded = excluded.includes(path);

      if (isExcluded) {
        return {
          ...prev,
          sitemap_excluded_routes: excluded.filter(p => p !== path)
        };
      } else {
        return {
          ...prev,
          sitemap_excluded_routes: [...excluded, path]
        };
      }
    });
  };

  if (isLoading || !settings) {
    return <div className="p-6 text-center">Cargando configuración...</div>;
  }

  const excluded = settings.sitemap_excluded_routes || [];

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-900">Settings del Sitio</h3>
        <p className="text-blue-700 text-sm mt-1">Configura el sitemap, robots.txt y llm.txt</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('sitemap')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'sitemap'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Sitemap
        </button>
        <button
          onClick={() => setActiveTab('robots')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'robots'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Robots.txt
        </button>
        <button
          onClick={() => setActiveTab('llm')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'llm'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          LLM.txt
        </button>
      </div>

      {/* SITEMAP TAB */}
      {activeTab === 'sitemap' && (
        <div className="bg-white rounded-lg p-6 border">
          <h4 className="text-lg font-semibold mb-4">Gestionar Sitemap</h4>
          <p className="text-gray-600 text-sm mb-6">
            Las rutas excluidas no aparecerán en el sitemap.xml. Las rutas se agregan automáticamente desde publicRoutes.ts
          </p>

          <div className="space-y-3">
            {publicRoutes.map((route) => {
              const isExcluded = excluded.includes(route.path);
              return (
                <div
                  key={route.path}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-medium">{route.path}</div>
                    <div className="text-sm text-gray-500">
                      Prioridad: {route.priority || 0.8} | Cambio: {route.changefreq || 'weekly'}
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isExcluded}
                      onChange={() => toggleRoute(route.path)}
                      className="w-5 h-5"
                    />
                    <span className="text-sm">{isExcluded ? 'Excluida' : 'Incluida'}</span>
                  </label>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded text-sm">
            <div className="font-medium text-green-900">ℹ️ Acceso</div>
            <p className="text-green-800">Tu sitemap está disponible en: <code className="bg-white px-2 py-1 rounded text-xs">/api/sitemap.xml</code></p>
          </div>
        </div>
      )}

      {/* ROBOTS.TXT TAB */}
      {activeTab === 'robots' && (
        <div className="bg-white rounded-lg p-6 border">
          <h4 className="text-lg font-semibold mb-4">Configurar robots.txt</h4>
          <p className="text-gray-600 text-sm mb-4">
            Contenido personalizado (déjalo vacío para usar el contenido automático optimizado)
          </p>

          <textarea
            value={settings?.robots_custom_content || ''}
            onChange={(e) =>
              setSettings((prev: SiteSettings | null) => 
                prev ? { ...prev, robots_custom_content: e.target.value } : null
              )
            }
            className="w-full h-80 p-4 border rounded-lg font-mono text-sm"
            placeholder="# Contenido personalizado de robots.txt&#10;# Déjalo vacío para usar el contenido automático"
          />

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded text-sm">
              <div className="font-medium text-blue-900">✓ Optimizaciones Automáticas</div>
              <ul className="text-blue-800 text-xs mt-2 space-y-1">
                <li>✓ Googlebot, Bingbot optimizado</li>
                <li>✓ Bots IA permitidos (GPTBot, Claude)</li>
                <li>✓ Bloque de scrapers</li>
                <li>✓ SEO Local Colombia</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded text-sm">
              <div className="font-medium text-green-900">🔗 Acceso</div>
              <p className="text-green-800 mt-2">Tu robots.txt está disponible en: <code className="bg-white px-2 py-1 rounded text-xs">/robots.txt</code></p>
              <p className="text-green-800 text-xs mt-2">También: <code className="bg-white px-2 py-1 rounded text-xs">/api/robots.txt</code></p>
            </div>
          </div>
        </div>
      )}

      {/* LLM.TXT TAB */}
      {activeTab === 'llm' && (
        <div className="bg-white rounded-lg p-6 border">
          <h4 className="text-lg font-semibold mb-4">Configurar llm.txt</h4>
          <p className="text-gray-600 text-sm mb-4">
            Información para asistentes de IA (déjalo vacío para usar el contenido automático optimizado)
          </p>

          <textarea
            value={settings?.llm_custom_content || ''}
            onChange={(e) =>
              setSettings((prev: SiteSettings | null) => 
                prev ? { ...prev, llm_custom_content: e.target.value } : null
              )
            }
            className="w-full h-80 p-4 border rounded-lg font-mono text-sm"
            placeholder="# Información para LLMs&#10;# Déjalo vacío para usar el contenido automático"
          />

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="p-4 bg-purple-50 border border-purple-200 rounded text-sm">
              <div className="font-medium text-purple-900">✓ Información Incluida</div>
              <ul className="text-purple-800 text-xs mt-2 space-y-1">
                <li>✓ Sobre la empresa</li>
                <li>✓ Servicios principales</li>
                <li>✓ Ubicaciones (SEO Local)</li>
                <li>✓ Instrucciones para IA</li>
                <li>✓ Tecnologías usadas</li>
                <li>✓ Casos de uso típicos</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded text-sm">
              <div className="font-medium text-green-900">🔗 Acceso</div>
              <p className="text-green-800 mt-2">Tu llm.txt está disponible en: <code className="bg-white px-2 py-1 rounded text-xs">/api/llm.txt</code></p>
              <p className="text-green-800 text-xs mt-2">Úsalo en ChatGPT, Claude, Perplexity con: "knowledge about [tudominio]"</p>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex gap-4">
        <button
          onClick={handleSaveSettings}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          💾 Guardar Cambios
        </button>

        {saveSuccess && (
          <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
            ✅ Guardado exitosamente
          </div>
        )}
      </div>
    </div>
  );
}
