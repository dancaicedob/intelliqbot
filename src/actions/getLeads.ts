'use server';

import { createClient } from '@supabase/supabase-js';

export async function getLeads(password: string) {
  const adminPassword = process.env.ADMIN_PANEL_PASSWORD;
  
  if (password !== adminPassword) {
    throw new Error('Acceso Denegado: Contraseña incorrecta.');
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from('contact_leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
