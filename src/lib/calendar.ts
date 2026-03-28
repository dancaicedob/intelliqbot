import { google } from 'googleapis';

export async function createCalendarEvent({
  clientName,
  clientEmail,
  clientPhone,
  company,
  date,
  time
}: {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  company: string;
  date: string;
  time: string;
}) {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const clientEmailStr = process.env.GOOGLE_CLIENT_EMAIL;
  // El ID del calendario es el correo del dueño del calendario (a quien se lo compartiste)
  const calendarId = process.env.GOOGLE_CALENDAR_ID; 

  if (!privateKey || !clientEmailStr || !calendarId) {
    throw new Error('Faltan variables de entorno de Google Calendar (GOOGLE_PRIVATE_KEY, GOOGLE_CLIENT_EMAIL, GOOGLE_CALENDAR_ID).');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmailStr,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  const calendar = google.calendar({ version: 'v3', auth });

  const startDateTimeStr = `${date}T${time}:00-05:00`;
  
  // Sumar 30 minutos a la hora inicial
  const endHour = parseInt(time.split(':')[0]);
  const endMin = parseInt(time.split(':')[1]) + 30;
  let finalEndHour = endHour;
  let finalEndMin = endMin;
  if(endMin >= 60) {
    finalEndHour += 1;
    finalEndMin -= 60;
  }
  const format2 = (n: number) => n.toString().padStart(2, '0');
  const endDateTimeStr = `${date}T${format2(finalEndHour)}:${format2(finalEndMin)}:00-05:00`;

  const event = {
    summary: `Sesión Estratégica: ${clientName} - Intelliqbot`,
    description: `**Razón / Reto:** ${company}\n**Teléfono:** ${clientPhone}\n\nAgendado automáticamente vía Nova Asistente Virtual.`,
    start: {
      dateTime: startDateTimeStr,
      timeZone: 'America/Bogota',
    },
    end: {
      dateTime: endDateTimeStr,
      timeZone: 'America/Bogota',
    },
    attendees: [
      { email: clientEmail }
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 15 },
      ],
    },
    conferenceData: {
      createRequest: {
        requestId: `intelliqbot-${Date.now()}`,
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: calendarId,
      requestBody: event,
      conferenceDataVersion: 1, // Requerido para crear Google Meet
      sendUpdates: 'all',       // Requerido para enviar invitación al correo nativamente
    });
    
    console.log('Cita en Google Calendar exitosa:', response.data.htmlLink);
    return response.data;
  } catch (error) {
    console.error('Error insertando en Google Calendar:', error);
    throw error;
  }
}
