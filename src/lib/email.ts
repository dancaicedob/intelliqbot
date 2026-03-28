import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAppointmentConfirmation({
  clientName,
  clientEmail,
  date,
  time,
  meetLink,
}: {
  clientName: string;
  clientEmail: string;
  date: string;
  time: string;
  meetLink?: string;
}) {
  const [yy, mm, dd] = date.split('-');
  const prettyDate = `${dd}/${mm}/${yy}`;
  const link = meetLink || process.env.MEET_LINK || 'https://meet.google.com/tu-sala';

  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev',
    to: [clientEmail],
    subject: `✅ Cita confirmada — ${prettyDate} a las ${time}`,
    html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Confirmación de Cita</title>
</head>
<body style="margin:0;padding:0;background-color:#050505;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#050505;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#0a0a0a;border:1px solid #1a1a2e;border-radius:16px;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#06b6d4,#7c3aed);padding:40px 40px 30px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:900;letter-spacing:2px;">INTELLIQBOT</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.7);font-size:12px;letter-spacing:4px;text-transform:uppercase;">Sistemas de Inteligencia Artificial</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h2 style="margin:0 0 8px;color:#06b6d4;font-size:22px;">¡Sesión Confirmada, ${clientName}! 🎉</h2>
              <p style="margin:0 0 30px;color:#9ca3af;font-size:15px;line-height:1.6;">
                Hemos reservado tu espacio en nuestra agenda estratégica. Estamos listos para mostrarte cómo la Inteligencia Artificial puede transformar tu negocio.
              </p>

              <!-- Appointment Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#111827;border:1px solid #1f2937;border-radius:12px;margin-bottom:30px;">
                <tr>
                  <td style="padding:24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:10px 0;border-bottom:1px solid #1f2937;">
                          <span style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">📅 Fecha</span><br/>
                          <span style="color:#f9fafb;font-size:18px;font-weight:700;margin-top:4px;display:block;">${prettyDate}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:10px 0;border-bottom:1px solid #1f2937;">
                          <span style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">⏰ Hora</span><br/>
                          <span style="color:#f9fafb;font-size:18px;font-weight:700;margin-top:4px;display:block;">${time} (Hora Colombia)</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:10px 0;">
                          <span style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">🎥 Plataforma</span><br/>
                          <span style="color:#06b6d4;font-size:16px;font-weight:700;margin-top:4px;display:block;">Google Meet</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:30px;">
                <tr>
                  <td align="center">
                    <a href="${link}" target="_blank"
                      style="display:inline-block;background:linear-gradient(135deg,#06b6d4,#7c3aed);color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:50px;font-size:16px;font-weight:700;letter-spacing:1px;">
                      Unirse a Google Meet →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Tips -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#111827;border:1px solid #1f2937;border-radius:12px;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px;">
                    <p style="margin:0 0 12px;color:#9ca3af;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Recomendaciones</p>
                    <ul style="margin:0;padding-left:16px;color:#6b7280;font-size:14px;line-height:2;">
                      <li>Conéctate 5 minutos antes y revisa tu audio/cámara.</li>
                      <li>Puedes traer a un colega de tu equipo.</li>
                      <li>Si necesitas reprogramar, contáctanos con anticipación.</li>
                    </ul>
                  </td>
                </tr>
              </table>

              <p style="margin:0;color:#4b5563;font-size:13px;text-align:center;">
                Este es un correo automático. Intelliqbot © ${new Date().getFullYear()}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`,
  });

  if (error) {
    console.error('Resend error:', error);
    throw new Error(error.message);
  }

  console.log('Correo enviado con Resend, ID:', data?.id);
  return data;
}
