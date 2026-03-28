const fs = require('fs');
const path = require('path');

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

async function main() {
  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  console.log('📧 Probando Resend...');
  console.log('API Key:', process.env.RESEND_API_KEY?.slice(0, 10) + '...');
  console.log('Meet Link:', process.env.MEET_LINK);

  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev', // Dominio de prueba de Resend (gratis, sin configurar nada)
    to: ['intelliqbot@gmail.com'],
    subject: '✅ TEST - Cita confirmada 10/04/2026 a las 14:30',
    html: '<h1>Funciona!</h1><p>Meet: ' + process.env.MEET_LINK + '</p>',
  });

  if (error) {
    console.error('❌ ERROR:', error);
  } else {
    console.log('✅ CORREO ENVIADO! ID:', data?.id);
  }
}

main().catch(console.error);
