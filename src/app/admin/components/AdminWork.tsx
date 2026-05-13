'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadWorkMedia, saveWorkPost, deleteWorkPost, deleteWorkMedia } from '@/actions/workActions';

interface WorkPost {
  id?: string;
  title: string;
  description: string;
  media_type: 'image' | 'video';
  media_url: string;
  media_poster?: string;
  technologies: string[];
  links: { label: string; url: string }[];
  position: number;
  is_active: boolean;
}

interface Props {
  posts: WorkPost[];
  onRefresh: () => void;
}

const emptyPost = (): WorkPost => ({
  title: '',
  description: '',
  media_type: 'video',
  media_url: '',
  media_poster: '',
  technologies: [],
  links: [],
  position: 0,
  is_active: true,
});

export default function AdminWork({ posts, onRefresh }: Props) {
  const [editing, setEditing] = useState<WorkPost | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [uploadingPoster, setUploadingPoster] = useState(false);
  const [techInput, setTechInput] = useState('');
  const [linkLabel, setLinkLabel] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const mediaInputRef = useRef<HTMLInputElement>(null);
  const posterInputRef = useRef<HTMLInputElement>(null);

  // ── Upload Media ────────────────────────────────────────────────────────
  const handleMediaUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !editing) return;
      setUploadingMedia(true);
      try {
        const folder = file.type.startsWith('video/') ? 'videos' : 'images';
        const url = await uploadWorkMedia(file, folder);
        const mediaType = file.type.startsWith('video/') ? 'video' : 'image';
        setEditing({ ...editing, media_url: url, media_type: mediaType });
      } catch (err: any) {
        alert('Error al subir media: ' + err.message);
      } finally {
        setUploadingMedia(false);
        e.target.value = '';
      }
    },
    [editing]
  );

  const handlePosterUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !editing) return;
      setUploadingPoster(true);
      try {
        const url = await uploadWorkMedia(file, 'posters');
        setEditing({ ...editing, media_poster: url });
      } catch (err: any) {
        alert('Error al subir poster: ' + err.message);
      } finally {
        setUploadingPoster(false);
        e.target.value = '';
      }
    },
    [editing]
  );

  // ── Tech tags ────────────────────────────────────────────────────────────
  const addTech = () => {
    const t = techInput.trim();
    if (!t || !editing) return;
    if (!editing.technologies.includes(t)) {
      setEditing({ ...editing, technologies: [...editing.technologies, t] });
    }
    setTechInput('');
  };

  const removeTech = (tech: string) => {
    if (!editing) return;
    setEditing({ ...editing, technologies: editing.technologies.filter((x) => x !== tech) });
  };

  // ── Links ────────────────────────────────────────────────────────────────
  const addLink = () => {
    if (!linkLabel.trim() || !linkUrl.trim() || !editing) return;
    setEditing({ ...editing, links: [...editing.links, { label: linkLabel.trim(), url: linkUrl.trim() }] });
    setLinkLabel('');
    setLinkUrl('');
  };

  const removeLink = (idx: number) => {
    if (!editing) return;
    setEditing({ ...editing, links: editing.links.filter((_, i) => i !== idx) });
  };

  // ── Save ─────────────────────────────────────────────────────────────────
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    try {
      await saveWorkPost({
        ...editing,
        position: editing.position ?? posts.length,
      });
      setEditing(null);
      onRefresh();
    } catch (err: any) {
      alert('Error guardando: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ───────────────────────────────────────────────────────────────
  const handleDelete = async (post: WorkPost) => {
    if (!post.id) return;
    try {
      await deleteWorkPost(post.id);
      if (post.media_url) await deleteWorkMedia(post.media_url);
      if (post.media_poster) await deleteWorkMedia(post.media_poster);
      setDeleteConfirmId(null);
      if (editing?.id === post.id) setEditing(null);
      onRefresh();
    } catch (err: any) {
      alert('Error eliminando: ' + err.message);
    }
  };

  // ── Open new post ─────────────────────────────────────────────────────────
  const openNew = () => {
    setEditing({ ...emptyPost(), position: posts.length });
    setTechInput('');
    setLinkLabel('');
    setLinkUrl('');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* ── LEFT: Post List ──────────────────────────────────────────── */}
      <div className="w-full lg:w-80 flex-shrink-0 bg-black border border-gray-800 rounded-2xl p-5 overflow-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-lg text-emerald-400 font-mono tracking-widest uppercase">Posts</h3>
          <button
            onClick={openNew}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-lg transition-colors"
          >
            + Nuevo
          </button>
        </div>

        {posts.length === 0 && (
          <p className="text-gray-500 text-sm font-mono text-center py-8">
            Aún no hay posts. ¡Crea el primero!
          </p>
        )}

        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => {
                setEditing(post);
                setTechInput('');
                setLinkLabel('');
                setLinkUrl('');
              }}
              className={`relative group rounded-xl border cursor-pointer transition-all overflow-hidden ${
                editing?.id === post.id
                  ? 'border-emerald-500/60 bg-emerald-950/20'
                  : 'border-gray-800 bg-[#0a0a0a] hover:border-gray-600'
              }`}
            >
              {/* Miniatura */}
              <div className="h-28 bg-black relative overflow-hidden">
                {post.media_type === 'image' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.media_url} alt={post.title} className="w-full h-full object-cover opacity-80" />
                ) : post.media_poster ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.media_poster} alt={post.title} className="w-full h-full object-cover opacity-80" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl">🎬</div>
                )}
                {/* Badge tipo */}
                <span className={`absolute top-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold ${post.media_type === 'video' ? 'bg-blue-900/80 text-blue-300' : 'bg-purple-900/80 text-purple-300'}`}>
                  {post.media_type}
                </span>
                {!post.is_active && (
                  <span className="absolute top-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded-full bg-yellow-900/80 text-yellow-300 uppercase font-bold">
                    Borrador
                  </span>
                )}
              </div>

              <div className="p-3">
                <p className="font-bold text-sm text-white truncate">{post.title || 'Sin título'}</p>
                <p className="text-xs text-gray-500 truncate mt-0.5">{post.description}</p>
                <p className="text-xs text-gray-600 font-mono mt-1">Pos. {post.position}</p>
              </div>

              {/* Delete button */}
              {deleteConfirmId === post.id ? (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-2 p-3" onClick={(e) => e.stopPropagation()}>
                  <p className="text-xs text-red-300 text-center font-mono">¿Eliminar este post?</p>
                  <div className="flex gap-2">
                    <button onClick={() => handleDelete(post)} className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-xs rounded font-bold">Eliminar</button>
                    <button onClick={() => setDeleteConfirmId(null)} className="px-3 py-1 bg-gray-700 text-white text-xs rounded">Cancelar</button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(post.id!); }}
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 w-6 h-6 rounded-full bg-red-900/80 text-red-300 text-xs flex items-center justify-center transition-opacity hover:bg-red-600"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT: Editor ────────────────────────────────────────────── */}
      <div className="flex-1 bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-auto">
        <AnimatePresence mode="wait">
          {editing ? (
            <motion.form
              key="editor"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSave}
              className="p-6 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <h3 className="font-bold text-xl text-white">
                  {editing.id ? 'Editar Post' : 'Nuevo Post'}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="text-gray-500 hover:text-white transition-colors text-sm"
                >
                  Cancelar
                </button>
              </div>

              {/* ── Media Upload ───────────────────── */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                  Media Principal (imagen o video)
                </label>

                {/* Preview */}
                {editing.media_url && (
                  <div className="relative w-full rounded-xl overflow-hidden bg-black border border-gray-800" style={{ aspectRatio: '16/9' }}>
                    {editing.media_type === 'image' ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={editing.media_url} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                      <video src={editing.media_url} controls muted className="w-full h-full object-cover" />
                    )}
                    <button
                      type="button"
                      onClick={() => setEditing({ ...editing, media_url: '', media_poster: '' })}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-red-700 transition-colors text-sm"
                    >
                      ×
                    </button>
                  </div>
                )}

                {!editing.media_url && (
                  <div
                    onClick={() => mediaInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-gray-700 hover:border-emerald-500 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-colors group"
                    style={{ aspectRatio: '16/9' }}
                  >
                    {uploadingMedia ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-sm text-emerald-400 font-mono">Subiendo...</p>
                      </div>
                    ) : (
                      <>
                        <span className="text-4xl mb-3">📁</span>
                        <p className="text-sm text-gray-400 group-hover:text-emerald-400 transition-colors text-center font-mono">
                          Haz clic o arrastra un archivo<br />
                          <span className="text-xs text-gray-600">MP4, MOV, JPG, PNG, WebP</span>
                        </p>
                      </>
                    )}
                  </div>
                )}

                <input
                  ref={mediaInputRef}
                  type="file"
                  accept="video/mp4,video/mov,video/webm,image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={handleMediaUpload}
                />

                {/* O pegar URL */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="O pega una URL directa (https://...)"
                    value={editing.media_url.startsWith('http') && !editing.media_url.includes('supabase') ? editing.media_url : ''}
                    onChange={(e) => setEditing({ ...editing, media_url: e.target.value })}
                    className="flex-1 bg-black border border-gray-800 rounded-lg p-2.5 text-sm text-white focus:border-emerald-500 outline-none font-mono"
                  />
                  <select
                    value={editing.media_type}
                    onChange={(e) => setEditing({ ...editing, media_type: e.target.value as 'image' | 'video' })}
                    className="bg-black border border-gray-800 rounded-lg px-3 text-white text-sm outline-none focus:border-emerald-500"
                  >
                    <option value="video">Video</option>
                    <option value="image">Imagen</option>
                  </select>
                </div>
              </div>

              {/* ── Poster (solo para video) ───────── */}
              {editing.media_type === 'video' && (
                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                    Miniatura del Video (poster) — Opcional
                  </label>
                  <div className="flex gap-3 items-center">
                    {editing.media_poster ? (
                      <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-gray-700 flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={editing.media_poster} alt="poster" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setEditing({ ...editing, media_poster: '' })}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-red-700 text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => posterInputRef.current?.click()}
                        className="px-4 py-2 border border-gray-700 hover:border-gray-500 rounded-lg text-sm text-gray-400 hover:text-white transition-colors font-mono"
                      >
                        {uploadingPoster ? 'Subiendo...' : '+ Subir Miniatura'}
                      </button>
                    )}
                    <input
                      ref={posterInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePosterUpload}
                    />
                    <input
                      type="text"
                      placeholder="O pega URL del poster"
                      value={editing.media_poster || ''}
                      onChange={(e) => setEditing({ ...editing, media_poster: e.target.value })}
                      className="flex-1 bg-black border border-gray-800 rounded-lg p-2.5 text-sm text-white focus:border-emerald-500 outline-none font-mono"
                    />
                  </div>
                </div>
              )}

              {/* ── Título y Descripción ──────────── */}
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Título *</label>
                  <input
                    required
                    type="text"
                    value={editing.title}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                    placeholder="Ej: App de ventas con IA"
                    className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:border-emerald-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Descripción *</label>
                  <textarea
                    required
                    rows={3}
                    value={editing.description}
                    onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                    placeholder="Describe el proyecto brevemente..."
                    className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:border-emerald-500 outline-none resize-none"
                  />
                </div>
              </div>

              {/* ── Tecnologías ───────────────────── */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Tecnologías / Tags</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }}
                    placeholder="Ej: Next.js"
                    className="flex-1 bg-black border border-gray-800 rounded-lg p-2.5 text-sm text-white focus:border-emerald-500 outline-none"
                  />
                  <button type="button" onClick={addTech} className="px-4 py-2 bg-emerald-900/40 border border-emerald-500/30 text-emerald-300 rounded-lg text-sm hover:bg-emerald-900/70 transition-colors">
                    + Añadir
                  </button>
                </div>
                {editing.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {editing.technologies.map((tech) => (
                      <span key={tech} className="flex items-center gap-1.5 bg-cyan-900/30 border border-cyan-500/30 text-cyan-300 text-xs px-2.5 py-1 rounded-full">
                        {tech}
                        <button type="button" onClick={() => removeTech(tech)} className="text-cyan-500 hover:text-red-400 transition-colors font-bold">×</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Links ─────────────────────────── */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Links</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={linkLabel}
                    onChange={(e) => setLinkLabel(e.target.value)}
                    placeholder="Texto (Ej: Demo)"
                    className="w-1/3 bg-black border border-gray-800 rounded-lg p-2.5 text-sm text-white focus:border-emerald-500 outline-none"
                  />
                  <input
                    type="url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 bg-black border border-gray-800 rounded-lg p-2.5 text-sm text-white focus:border-emerald-500 outline-none"
                  />
                  <button type="button" onClick={addLink} className="px-4 py-2 bg-blue-900/40 border border-blue-500/30 text-blue-300 rounded-lg text-sm hover:bg-blue-900/70 transition-colors">
                    + Link
                  </button>
                </div>
                {editing.links.length > 0 && (
                  <div className="flex flex-col gap-1.5 mt-2">
                    {editing.links.map((link, i) => (
                      <div key={i} className="flex items-center justify-between bg-black border border-gray-800 rounded-lg px-3 py-2 text-sm">
                        <span className="text-blue-400 font-mono">{link.label}</span>
                        <span className="text-gray-500 truncate mx-3 flex-1">{link.url}</span>
                        <button type="button" onClick={() => removeLink(i)} className="text-red-400 hover:text-red-300 font-bold">×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Posición y Estado ─────────────── */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Posición (orden)</label>
                  <input
                    type="number"
                    min={0}
                    value={editing.position}
                    onChange={(e) => setEditing({ ...editing, position: Number(e.target.value) })}
                    className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:border-emerald-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Estado</label>
                  <select
                    value={editing.is_active ? 'published' : 'draft'}
                    onChange={(e) => setEditing({ ...editing, is_active: e.target.value === 'published' })}
                    className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:border-emerald-500 outline-none"
                  >
                    <option value="published">✅ Publicado</option>
                    <option value="draft">📝 Borrador</option>
                  </select>
                </div>
              </div>

              {/* ── Botón Guardar ─────────────────── */}
              <div className="flex gap-4 pt-2 border-t border-gray-800">
                <button
                  type="submit"
                  disabled={saving || uploadingMedia}
                  className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all tracking-wide"
                >
                  {saving ? '[ Guardando... ]' : '[ Guardar Post ]'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="px-6 py-3.5 border border-gray-700 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                  Cancelar
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full min-h-[400px] flex flex-col items-center justify-center text-gray-600 p-12"
            >
              <div className="text-6xl mb-4">🎬</div>
              <p className="font-mono text-center text-sm leading-relaxed">
                Selecciona un post del panel izquierdo<br />
                o haz clic en <span className="text-emerald-400 font-bold">+ Nuevo</span> para crear uno.
              </p>
              <button
                onClick={openNew}
                className="mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                + Crear Primer Post
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
