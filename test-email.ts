import fs from 'fs';
import path from 'path';

// Cargar .env.local manualmente
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    let key = match[1].trim();
    let val = match[2].trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    process.env[key] = val;
  }
});

import { sendAppointmentConfirmation } from './src/lib/email';

async function main() {
  console.log('📧 Probando Resend...');
  console.log('API Key:', process.env.RESEND_API_KEY ? '✅ Cargada' : '❌ Falta');
  console.log('Meet Link:', process.env.MEET_LINK);

  try {
    const result = await sendAppointmentConfirmation({
      clientName: 'Daniel (Prueba)',
      clientEmail: 'intelliqbot@gmail.com', // Cambia aquí por tu correo real
      date: '2026-04-10',
      time: '14:30',
    });
    console.log('✅ CORREO ENVIADO! ID:', result?.id);
  } catch (error: any) {
    console.error('❌ ERROR:', error.message || error);
  }
}

main();
