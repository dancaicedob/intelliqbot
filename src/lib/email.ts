import nodemailer from 'nodemailer';

export async function sendAppointmentEmail({ 
  clientName, 
  clientEmail, 
  date, 
  time 
}: { 
  clientName: string; 
  clientEmail: string; 
  date: string; 
  time: string; 
}) {
  // Configuración del correo saliente (Gmail SMTP recomendado)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS, // Contraseña de App de Gmail
    },
  });

  const meetLink = process.env.MEET_LINK || 'https://meet.google.com/tu-enlace-unico';

  // Formateo de fecha de AAAA-MM-DD a DD/MM/AAAA
  const [yy, mm, dd] = date.split('-');
  const prettyDate = `${dd}/${mm}/${yy}`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 10px; overflow: hidden;">
      <div style="background-color: #000; padding: 20px; text-align: center;">
        <h1 style="color: #06b6d4; margin: 0;">Intelliqbot</h1>
        <p style="color: #888; margin: 5px 0 0 0; font-size: 14px;">Sistemas de Inteligencia Artificial</p>
      </div>
      <div style="padding: 30px;">
        <h2 style="color: #333;">¡Reserva Confirmada, ${clientName}! 🎉</h2>
        <p style="font-size: 16px; line-height: 1.5;">
          Hemos apartado exitosamente un espacio en nuestra agenda para conversar sobre tus retos comerciales y cómo la inteligencia artificial puede escalar tu empresa.
        </p>
        
        <div style="background-color: #f7f9fc; border-left: 4px solid #06b6d4; padding: 15px; margin: 25px 0;">
          <p style="margin: 0 0 10px 0;"><strong>📅 Fecha:</strong> ${prettyDate}</p>
          <p style="margin: 0 0 10px 0;"><strong>⏰ Hora:</strong> ${time} (Hora Colombia)</p>
          <p style="margin: 0;"><strong>🔗 Enlace de la Sesión:</strong> <a href="${meetLink}" style="color: #06b6d4; text-decoration: none;">Unirse a Google Meet</a></p>
        </div>

        <p style="font-size: 14px; color: #666;">
          Recomendaciones:
          <ul style="font-size: 14px; color: #666; padding-left: 20px;">
            <li>Conéctate 5 minutos antes para revisar tu audio.</li>
            <li>Si prefieres, puedes asistir con alguien más de tu equipo estratégico.</li>
            <li>Si necesitas reprogramar, por favor avísanos con anticipación.</li>
          </ul>
        </p>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="${meetLink}" style="background-color: #06b6d4; color: #fff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            Ir a la Reunión
          </a>
        </div>
      </div>
      <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #999;">
        Este es un correo automático. Por favor no respondas a este mensaje.<br>
        © ${new Date().getFullYear()} Intelliqbot. Todos los derechos reservados.
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"Intelliqbot Asesoría" <${process.env.SMTP_USER}>`,
    to: clientEmail,
    subject: `Confirmación de Sesión con Intelliqbot - ${prettyDate} a las ${time}`,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo de confirmación enviado a:', clientEmail);
    return true;
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return false;
  }
}
