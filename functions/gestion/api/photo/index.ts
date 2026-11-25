// Envoi d'une photo, une par requête, avant l'enregistrement de l'annonce.
//
// Le navigateur envoie déjà exactement le corps attendu par l'API GitHub
// ({"content": "<base64>", "encoding": "base64"}) : on le transmet tel quel,
// sans le décoder. Le temps CPU de la fonction reste ainsi négligeable même
// pour une grosse photo (limite de 10 ms CPU du plan gratuit).
// Le blob n'est rattaché à aucun commit tant que l'annonce n'est pas enregistrée.

import { erreur, GitHub, json, type Ctx } from '../../../_lib/server';

const TAILLE_MAX = 15 * 1024 * 1024;

export async function onRequestPost({ request, env }: Ctx): Promise<Response> {
  const taille = Number(request.headers.get('Content-Length') ?? NaN);
  if (!Number.isFinite(taille) || taille > TAILLE_MAX) return erreur('Photo trop lourde.', 413);

  const blob = await new GitHub(env).call<{ sha: string }>('/git/blobs', {
    method: 'POST',
    body: request.body,
    // Requis par fetch pour un corps transmis en flux.
    ...({ duplex: 'half' } as object),
  });
  return json({ blobSha: blob.sha });
}
