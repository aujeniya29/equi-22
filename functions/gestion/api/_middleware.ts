// Garde de toutes les routes /gestion/api/* : configuration présente, cookie
// valide (sauf pour la connexion), et erreurs GitHub traduites en message lisible.

import { configManquante, erreur, estConnecte, GitHubError, type Ctx } from '../../_lib/server';

export async function onRequest(ctx: Ctx): Promise<Response> {
  const manque = configManquante(ctx.env);
  if (manque) return erreur(manque, 500);

  const { pathname } = new URL(ctx.request.url);
  const publique = pathname === '/gestion/api/login';
  if (!publique && !(await estConnecte(ctx.request, ctx.env))) {
    return erreur('Session expirée : reconnectez-vous.', 401);
  }

  // Les écritures n'acceptent que du JSON : un formulaire d'un autre site ne
  // peut pas en envoyer sans requête préalable CORS (en plus de SameSite=Strict).
  if (ctx.request.method !== 'GET' && !ctx.request.headers.get('Content-Type')?.startsWith('application/json')) {
    return erreur('Requête invalide.', 415);
  }

  try {
    return await ctx.next();
  } catch (e) {
    console.error(e);
    if (e instanceof GitHubError && (e.status === 401 || e.status === 403)) {
      return erreur("Le site n'a plus accès à GitHub (jeton expiré ?). Prévenez Aurélien.", 502);
    }
    return erreur("Une erreur est survenue. Réessayez dans un instant ; si ça continue, prévenez Aurélien.", 500);
  }
}
