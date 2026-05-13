'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export interface WorkPost {
  id?: string;
  title: string;
  description: string;
  media_type: 'image' | 'video';
  media_url: string;
  media_poster?: string;
  social_url?: string;      // URL de TikTok o Instagram para embed
  technologies: string[];
  links: { label: string; url: string }[];
  position: number;
  is_active: boolean;
}

// ─── READ ─────────────────────────────────────────────────────────────────────

export async function getWorkPosts(): Promise<WorkPost[]> {
  const { data, error } = await supabase
    .from('work_posts')
    .select('*')
    .eq('is_active', true)
    .order('position', { ascending: true });

  if (error) {
    console.error('getWorkPosts error:', error.message);
    return [];
  }
  return data || [];
}

export async function getAllWorkPosts(): Promise<WorkPost[]> {
  const { data, error } = await supabase
    .from('work_posts')
    .select('*')
    .order('position', { ascending: true });

  if (error) {
    console.error('getAllWorkPosts error:', error.message);
    return [];
  }
  return data || [];
}

// ─── WRITE ────────────────────────────────────────────────────────────────────

export async function saveWorkPost(post: WorkPost): Promise<{ success: boolean; data?: WorkPost; error?: string }> {
  try {
    const payload = {
      title: post.title,
      description: post.description,
      media_type: post.media_type,
      media_url: post.media_url,
      media_poster: post.media_poster || '',
      social_url: post.social_url || '',
      technologies: post.technologies,
      links: post.links,
      position: post.position,
      is_active: post.is_active,
    };

    let result;

    if (post.id) {
      console.log(`[saveWorkPost] Actualizando post ${post.id}...`, payload);
      const { data, error } = await supabase
        .from('work_posts')
        .update(payload)
        .eq('id', post.id)
        .select()
        .single();
      if (error) {
        console.error('[saveWorkPost] Error en update:', error);
        return { success: false, error: error.message };
      }
      result = data;
    } else {
      console.log('[saveWorkPost] Creando nuevo post...', payload);
      const { data, error } = await supabase
        .from('work_posts')
        .insert(payload)
        .select()
        .single();
      if (error) {
        console.error('[saveWorkPost] Error en insert:', error);
        return { success: false, error: error.message };
      }
      result = data;
    }

    try {
      revalidatePath('/work', 'page');
    } catch (e) {
      console.warn('Could not revalidate /work', e);
    }

    return { success: true, data: result };
  } catch (err: any) {
    return { success: false, error: err.message || 'Error interno del servidor action' };
  }
}

export async function deleteWorkPost(id: string): Promise<void> {
  const { error } = await supabase.from('work_posts').delete().eq('id', id);
  if (error) throw new Error(error.message);

  try {
    revalidatePath('/work', 'page');
  } catch (e) {
    console.warn('Could not revalidate /work', e);
  }
}

export async function reorderWorkPosts(
  updates: { id: string; position: number }[]
): Promise<void> {
  for (const update of updates) {
    const { error } = await supabase
      .from('work_posts')
      .update({ position: update.position })
      .eq('id', update.id);
    if (error) throw new Error(error.message);
  }

  try {
    revalidatePath('/work', 'page');
  } catch (e) {
    console.warn('Could not revalidate /work', e);
  }
}

// ─── STORAGE ──────────────────────────────────────────────────────────────────

export async function uploadWorkMedia(
  file: File,
  folder: 'images' | 'videos' | 'posters'
): Promise<string> {
  const ext = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  
  console.log(`[uploadWorkMedia] Iniciando subida a ${folder}...`, fileName);

  const { error } = await supabase.storage
    .from('work-media')
    .upload(fileName, file, { upsert: false });

  if (error) {
    console.error('[uploadWorkMedia] Error subiendo a storage:', error);
    throw new Error('Error subiendo archivo: ' + error.message);
  }

  const { data } = supabase.storage.from('work-media').getPublicUrl(fileName);
  console.log(`[uploadWorkMedia] Subida exitosa:`, data.publicUrl);
  return data.publicUrl;
}

export async function deleteWorkMedia(url: string): Promise<void> {
  // Extraer el path relativo dentro del bucket desde la URL pública
  const marker = '/work-media/';
  const idx = url.indexOf(marker);
  if (idx === -1) return;
  const filePath = url.slice(idx + marker.length);

  const { error } = await supabase.storage.from('work-media').remove([filePath]);
  if (error) console.warn('No se pudo eliminar archivo de storage:', error.message);
}
