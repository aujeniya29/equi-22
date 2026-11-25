import { cookieDeconnexion, json } from '../../_lib/server';

export async function onRequestPost(): Promise<Response> {
  return json({ ok: true }, 200, { 'Set-Cookie': cookieDeconnexion });
}
