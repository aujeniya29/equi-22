// Envoi d'une photo, une par requête, avant l'enregistrement de l'annonce.
//
// Le navigateur envoie déjà exactement le corps attendu par l'API GitHub
// ({"content": "<base64>", "encoding": "base64"}) : on le transmet tel quel,
// sans le décoder. Le temps CPU de la fonction reste ainsi négligeable même
// pour une grosse photo (limite de 10 ms CPU du plan gratuit).
// Le blob n'est rattaché à aucun commit tant que l'annonce n'est pas enregistrée.

import { erreur, GitHub, json, type Ctx } from '../../../_lib/server';

const TAILLE_MAX = 15 * 1024 * 1024;

// Le téléphone convertit toujours les photos en JPEG avant l'envoi. Un fichier
// qui n'en est pas un ferait échouer la construction du site (encodage des
// images) : on vérifie la forme exacte du corps et la signature JPEG
// (FF D8 FF, soit « /9j/ » en base64), sans rien décoder.
const CORPS_ATTENDU = /^\{\s*"content"\s*:\s*"\/9j\/[A-Za-z0-9+/]+={0,2}"\s*,\s*"encoding"\s*:\s*"base64"\s*\}\s*$/;

export async function onRequestPost({ request, env }: Ctx): Promise<Response> {
  const taille = Number(request.headers.get('Content-Length') ?? NaN);
  if (!Number.isFinite(taille) || taille > TAILLE_MAX) return erreur('Photo trop lourde.', 413);

  const corps = await request.text();
  if (corps.length > TAILLE_MAX || !CORPS_ATTENDU.test(corps)) {
    return erreur("Ce fichier n'est pas une photo valide.", 400);
  }

  const blob = await new GitHub(env).call<{ sha: string }>('/git/blobs', { method: 'POST', body: corps });
  return json({ blobSha: blob.sha });
}
