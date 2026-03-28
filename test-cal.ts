import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    let key = match[1].trim();
    let val = match[2].trim();
    if (val.startsWith('"') && val.endsWith('"')) { val = val.slice(1, -1); }
    process.env[key] = val.replace(/\\n/g, '\n');
  }
});

import { createCalendarEvent } from './src/lib/calendar';

async function main() {
  console.log('Testing Google Calendar API...');
  try {
    const result = await createCalendarEvent({
      clientName: 'Test', clientEmail: 'test@agencia-ia.com',
      clientPhone: '123', company: 'Test', date: '2026-04-10', time: '14:30'
    });
    console.log('SUCCESS:', result.htmlLink);
  } catch (error: any) {
    console.error('ERROR RESPONSE:', error.response ? JSON.stringify(error.response.data, null, 2) : error);
  }
}

main();
