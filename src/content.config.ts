// Astro v5 Content Layer API
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    // Basic info
    title: z.string(),
    description: z.string(),

    // SEO
    seoTitle: z.string(),
    seoDescription: z.string(),
    ogImage: z.string().optional(),

    // Hero
    heroImage: z.string(),
    heroImageAlt: z.string(),

    // Contact
    whatsappMessage: z.string(),

    // Display
    order: z.number().int(),

    // Pricing — flat list (used by most pages)
    pricing: z.array(z.object({
      label: z.string(),
      price: z.string(),
      unit: z.string(),
      highlight: z.boolean().default(false),
    })).optional(),
    pricingNotes: z.array(z.string()).optional(),
    highlightedPricingNotes: z.array(z.string()).optional(),
    discountPricingNotes: z.array(z.string()).optional(),

    // Pricing — grouped (used when tarifs need separate sections)
    pricingGroups: z.array(z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      sectionLabel: z.string().optional(),
      items: z.array(z.object({
        label: z.string(),
        price: z.string(),
        unit: z.string(),
        highlight: z.boolean().default(false),
      })),
      notes: z.array(z.string()).optional(),
      highlightedNotes: z.array(z.string()).optional(),
    })).optional(),

    // Schedule
    schedule: z.array(z.object({
      day: z.string(),
      time: z.string(),
      level: z.string().optional(),
    })).optional(),

    // Animals (élevage)
    animals: z.array(z.object({
      nom: z.string(),
      role: z.enum(['etalon', 'pouliniere', 'poulain']),
      race: z.string().optional(),
      anneeNaissance: z.number().int().optional(),
      photo: z.string().optional(),
      photos: z.array(z.string()).optional(),
      photoPosition: z.string().optional(),
      prix: z.string().optional(),
      prixReservation: z.string().optional(),
      prixPoulainVivant: z.string().optional(),
      description: z.string(),
      pere: z.string().optional(),
      mere: z.string().optional(),
      pereDeMere: z.string().optional(),
      palmares: z.array(z.string()).optional(),
    })).optional(),

    // Testimonial
    testimonial: z.object({
      quote: z.string(),
      author: z.string(),
      stars: z.number().int().min(1).max(5),
    }).optional(),

    // Affiche le planning après les tarifs (au lieu d'avant)
    planningAfterPricing: z.boolean().default(false),

    // Notes affichées sous le planning
    scheduleNotes: z.array(z.string()).optional(),

    // Carte de mise en avant d'une certification (affichée après le texte)
    credentialHighlight: z.object({
      text: z.string(),
      badges: z.array(z.string()),
    }).optional(),

    // Galerie photos (optionnelle, affichée après le texte)
    galleryImages: z.array(z.object({
      src: z.string(),
      alt: z.string(),
    })).optional(),

    // Documents téléchargeables (slugs de catégories depuis src/data/documents.ts)
    documents: z.array(z.string()).optional(),

    // Groupe nominal utilisé dans le CTA de bas de page
    // (« Envie d'en savoir plus sur ___ ? »), article inclus.
    // Sans ce champ le libellé est dérivé du titre, ce qui donne des tournures
    // fautives dès que le titre n'est pas un pluriel (« nos élevage équin »).
    ctaLabel: z.string().optional(),

    // Schema markup
    // Texte descriptif de la prestation (propriété `serviceType` de Service).
    // Ne pas y mettre un nom de @type Schema.org, sauf
    // « EducationalOccupationalProgram » qui est traité comme un vrai @type.
    serviceType: z.string(),
    serviceDescription: z.string(),
  }),
});

// Les annonces de vente sont éditées par la cliente via Pages CMS (.pages.yml).
// Un champ laissé vide dans le CMS peut arriver sous forme de chaîne vide ou de
// null : on normalise tout en `undefined` pour que les gabarits n'aient qu'un
// seul cas « absent » à gérer, et qu'un champ vide ne casse jamais le build.
const optString = z
  .string()
  .nullish()
  .transform((v) => (v && v.trim() ? v.trim() : undefined));
const optStringList = z
  .array(z.string().nullish())
  .nullish()
  .transform((v) => {
    const list = (v ?? []).map((s) => s?.trim()).filter((s): s is string => Boolean(s));
    return list.length ? list : undefined;
  });

const vente = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/vente' }),
  schema: z.object({
    title: z.string().trim().min(1),
    race: z.string().trim().min(1),
    anneeNaissance: z.coerce.number().int().min(1990),
    sexe: z.enum(['hongre', 'jument', 'etalon']),
    taille: optString,
    robe: optString,
    niveau: optString,
    categorie: optString,
    disciplines: optStringList,
    prix: z.string().trim().min(1),
    // Chemins tels qu'écrits par Pages CMS (« /vente/xxx.jpg ») ou simple nom de
    // fichier : seul le nom compte, résolu dans src/assets/images/vente/
    // (voir src/utils/vente.ts).
    photoPrincipale: optString,
    photos: optStringList,
    // « Oui »/« Non » depuis Pages CMS (liste déroulante), booléen dans les
    // fichiers plus anciens. Vide = pas vendu.
    vendu: z
      .union([z.boolean(), z.string()])
      .nullish()
      .transform((v) => (typeof v === 'string' ? ['oui', 'true'].includes(v.trim().toLowerCase()) : v ?? false)),
    // Image de partage dédiée (1200x630). À défaut, /og/vente.jpg est utilisée.
    ogImage: optString,
    pere: optString,
    mere: optString,
    pereDeMere: optString,
    // Sections guidées, affichées sous la description libre.
    pointsForts: optStringList,
    convientA: optString,
    infosComplementaires: optString,
    // Facultatifs : générés à partir des caractéristiques s'ils sont absents
    // (la cliente n'a pas à s'occuper du SEO).
    seoTitle: optString,
    seoDescription: optString,
  }),
});

const actualites = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/actualites' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    seoTitle: z.string(),
    seoDescription: z.string(),
    ogImage: z.string().optional(),
    excerpt: z.string(),
    // Auteur nommé : sur un contenu de conseil, savoir qui parle est le
    // principal signal E-E-A-T, et les qualifications existent déjà (/a-propos).
    // Surchargeable article par article (ex. author: "Inès").
    author: z.object({
      name: z.string(),
      role: z.string(),
    }).default({ name: 'Aurélia', role: 'Gérante et monitrice diplômée BPJEPS' }),
  }),
});

export const collections = { services, actualites, vente };
