'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function getSeoConfigs() {
  const { data, error } = await supabase
    .from('page_seo')
    .select('*')
    .order('route', { ascending: true });

  if (error) {
    console.error('getSeoConfigs error:', error.message);
    return [];
  }
  return data;
}

export async function saveSeoConfig(config: any) {
  const { data, error } = await supabase
    .from('page_seo')
    .upsert({
      id: config.id || undefined,
      route: config.route,
      title: config.title,
      description: config.description,
      robots: config.robots || 'index, follow',
      canonical: config.canonical,
      keywords: config.keywords
    }, { onConflict: 'route' })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  
  // Purge the cache so changes go live instantly
  try {
    revalidatePath(config.route, 'layout');
    revalidatePath(config.route, 'page');
  } catch (e) {
    console.warn("Could not revalidate path", e);
  }

  return data;
}

export async function deleteSeoConfig(id: string) {
  const { error } = await supabase
    .from('page_seo')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
  return true;
}

export async function getGlobalScripts() {
  const { data, error } = await supabase
    .from('global_scripts')
    .select('*')
    .eq('id', 1)
    .single();

  return data || { gtm_id: '', gsc_id: '', pixel_id: '' };
}

export async function saveGlobalScripts(scripts: any) {
  const { data, error } = await supabase
    .from('global_scripts')
    .upsert({ id: 1, ...scripts })
    .select()
    .single();

  if (error) throw new Error(error.message);

  try {
    revalidatePath('/', 'layout');
  } catch (e) {
    console.warn("Could not revalidate path", e);
  }
  return data;
}
