// GET  : toutes les annonces, lues dans le dépôt (et non sur le site publié,
//        qui a quelques minutes de retard après chaque enregistrement).
// POST : nouvelle annonce.

import { enregistrer, ErreurSaisie } from '../../../_lib/annonces';
import { erreur, GitHub, json, lireDepot, versCheval, type Ctx } from '../../../_lib/server';
import type { SaveRequest } from '../../../_lib/shared';

export async function onRequestGet({ env }: Ctx): Promise<Response> {
  const gh = new GitHub(env);
  const { commitSha } = await gh.head();
  const { annonces } = await lireDepot(gh, commitSha);
  const chevaux = annonces
    .map(versCheval)
    // En vente d'abord, puis par nom.
    .sort((a, b) => Number(a.vendu) - Number(b.vendu) || a.title.localeCompare(b.title, 'fr'));
  return json({ chevaux });
}

export async function onRequestPost({ request, env }: Ctx): Promise<Response> {
  try {
    const cheval = await enregistrer(env, null, (await request.json()) as SaveRequest);
    return json({ cheval }, 201);
  } catch (e) {
    if (e instanceof ErreurSaisie) return erreur(e.message, e.status);
    throw e;
  }
}
