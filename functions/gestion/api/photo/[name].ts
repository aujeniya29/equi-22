// Aperçu d'une photo déjà publiée, lue directement dans le dépôt (le site
// public ne sert que des versions optimisées aux noms imprévisibles).

import { erreur, GitHub, PHOTO_DIR, type Ctx } from '../../../_lib/server';
import { PHOTO_NAME } from '../../../_lib/shared';

export async function onRequestGet({ env, params }: Ctx): Promise<Response> {
  const name = String(params.name);
  if (!PHOTO_NAME.test(name)) return erreur('Photo inconnue.', 404);

  const gh = new GitHub(env);
  const res = await gh.raw(`/contents/${PHOTO_DIR}/${name}?ref=${gh.branch}`, {
    headers: { Accept: 'application/vnd.github.raw' },
  });
  if (!res.ok) return erreur('Photo introuvable.', 404);

  const ext = name.split('.').pop()!.toLowerCase();
  return new Response(res.body, {
    headers: {
      'Content-Type': ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg',
      // Le nom d'une photo ne change jamais de contenu.
      'Cache-Control': 'private, max-age=604800, immutable',
    },
  });
}
