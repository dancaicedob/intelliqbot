import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';

export async function getDynamicSeo(route: string, baseMetadata: Metadata): Promise<Metadata> {
  try {
    const { data: seo } = await supabase
      .from('page_seo')
      .select('*')
      .eq('route', route)
      .single();

    if (seo) {
      return {
        ...baseMetadata,
        title: seo.title || baseMetadata.title,
        description: seo.description || baseMetadata.description,
        robots: seo.robots || baseMetadata.robots,
        alternates: seo.canonical ? { canonical: seo.canonical } : baseMetadata.alternates,
        keywords: seo.keywords ? seo.keywords.split(',').map((k: string) => k.trim()) : baseMetadata.keywords,
      };
    }
  } catch (error) {
    // Return base metadata if table doesn't exist or other error
  }

  return baseMetadata;
}
