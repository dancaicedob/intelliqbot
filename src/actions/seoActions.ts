'use server';

import { supabase } from '@/lib/supabase';

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
