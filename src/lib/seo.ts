import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';

export async function getDynamicSeo(route: string, baseMetadata: Metadata): Promise<Metadata> {
  const dynamicCanonical = `https://intelliqbot.com${route === '/' ? '' : route}`;
  let canonicalUrl = dynamicCanonical;

  try {
    const { data: seo } = await supabase
      .from('page_seo')
      .select('*')
      .eq('route', route)
      .single();

    if (seo) {
      if (seo.canonical) {
        canonicalUrl = seo.canonical;
      }
      return {
        ...baseMetadata,
        title: seo.title || baseMetadata.title,
        description: seo.description || baseMetadata.description,
        robots: seo.robots || baseMetadata.robots,
        alternates: { ...baseMetadata.alternates, canonical: canonicalUrl },
        keywords: seo.keywords ? seo.keywords.split(',').map((k: string) => k.trim()) : baseMetadata.keywords,
      };
    }
  } catch (error) {
    // Return base metadata if table doesn't exist or other error
  }

  return {
    ...baseMetadata,
    alternates: { ...baseMetadata.alternates, canonical: canonicalUrl }
  };
}
