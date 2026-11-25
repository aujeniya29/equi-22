import { cookieConnexion, erreur, json, motDePasseValide, type Ctx } from '../../_lib/server';

export async function onRequestPost({ request, env }: Ctx): Promise<Response> {
  const { password } = (await request.json().catch(() => ({}))) as { password?: unknown };
  if (typeof password !== 'string' || !(await motDePasseValide(env, password.trim()))) {
    // Ralentit les essais en série.
    await new Promise((r) => setTimeout(r, 1000));
    return erreur('Mot de passe incorrect.', 401);
  }
  return json({ ok: true }, 200, { 'Set-Cookie': await cookieConnexion(env) });
}
