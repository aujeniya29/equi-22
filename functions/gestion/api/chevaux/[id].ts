// PUT    : modification d'une annonce existante (son adresse ne change jamais,
//          même si le nom du cheval change : les liens partagés restent valables).
// DELETE : suppression de l'annonce et de ses photos.

import { enregistrer, ErreurSaisie, supprimer } from '../../../_lib/annonces';
import { erreur, json, type Ctx } from '../../../_lib/server';
import type { SaveRequest } from '../../../_lib/shared';

const ID = /^[a-z0-9][a-z0-9_-]*$/i;

export async function onRequestPut({ request, env, params }: Ctx): Promise<Response> {
  const id = String(params.id);
  if (!ID.test(id)) return erreur('Annonce inconnue.', 404);
  try {
    const cheval = await enregistrer(env, id, (await request.json()) as SaveRequest);
    return json({ cheval });
  } catch (e) {
    if (e instanceof ErreurSaisie) return erreur(e.message, e.status);
    throw e;
  }
}

export async function onRequestDelete({ env, params }: Ctx): Promise<Response> {
  const id = String(params.id);
  if (!ID.test(id)) return erreur('Annonce inconnue.', 404);
  await supprimer(env, id);
  return json({ ok: true });
}
