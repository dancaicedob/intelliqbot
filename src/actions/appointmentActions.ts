'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function getAppointments(dateStr?: string) {
  let query = supabase
    .from('appointments')
    .select('*')
    .order('date', { ascending: true })
    .order('time_slot', { ascending: true });
  
  if (dateStr) {
    query = query.eq('date', dateStr);
  } else {
    // get from today onwards
    const today = new Date().toISOString().split('T')[0];
    query = query.gte('date', today);
  }

  const { data, error } = await query;
  if (error) {
    console.error('getAppointments error:', error.message);
    return [];
  }
  return data;
}

export async function createAppointment(data: any) {
  const { error } = await supabase.from('appointments').insert([
    {
      date: data.date,
      time_slot: data.time_slot,
      client_name: data.client_name || 'Admin',
      client_email: data.client_email || '',
      client_phone: data.client_phone || '',
      company: data.company || '',
      status: data.status || 'booked' // 'booked' or 'blocked'
    }
  ]);
  
  if (error) {
    if (error.code === '23505') throw new Error('Este horario ya fue reservado o bloqueado recientemente.');
    throw new Error(error.message);
  }
  
  if (data.status !== 'blocked' && data.client_email && data.client_email.includes('@')) {
    try {
      const { sendAppointmentConfirmation } = await import('@/lib/email');
      console.log('[Resend] Enviando a:', data.client_email);
      await sendAppointmentConfirmation({
        clientName: data.client_name || 'Cliente',
        clientEmail: data.client_email,
        date: data.date,
        time: data.time_slot,
      });
      console.log('[Resend] ✅ Correo enviado OK');
    } catch (e: any) {
      console.error('[Resend] ❌ ERROR:', e?.message ?? e);
      // No lanzamos el error para no bloquear el guardado de la cita
    }
  } else {
    console.log('[Resend] Omitiendo correo. Status:', data.status, 'Email:', data.client_email);
  }
  
  revalidatePath('/admin');
  return true;
}

export async function updateAppointmentStatus(id: string, status: string) {
  const { error } = await supabase
    .from('appointments')
    .update({ status })
    .eq('id', id);
    
  if (error) throw new Error(error.message);
  revalidatePath('/admin');
  return true;
}

export async function deleteAppointment(id: string) {
  const { error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', id);
    
  if (error) throw new Error(error.message);
  revalidatePath('/admin');
  return true;
}

export async function getAvailableSlots(dateStr: string) {
  const morningSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00'];
  const afternoonSlots = ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'];
  const allSlots = [...morningSlots, ...afternoonSlots];

  const appts = await getAppointments(dateStr);
  const occupied = appts.filter(a => a.status === 'booked' || a.status === 'blocked').map(a => a.time_slot);

  return allSlots.filter(s => !occupied.includes(s));
}
