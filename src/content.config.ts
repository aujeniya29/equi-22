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

    // Documents téléchargeables (slugs de catégories depuis src/data/documents.ts)
    documents: z.array(z.string()).optional(),

    // Schema markup
    serviceType: z.string(),
    serviceDescription: z.string(),
  }),
});

const vente = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/vente' }),
  schema: z.object({
    title: z.string(),
    race: z.string(),
    anneeNaissance: z.number().int(),
    sexe: z.enum(['hongre', 'jument', 'etalon']),
    taille: z.string().optional(),
    robe: z.string().optional(),
    niveau: z.string().optional(),
    categorie: z.string().optional(),
    disciplines: z.array(z.string()).optional(),
    prix: z.string(),
    photoPrincipale: z.string().optional(),
    photos: z.array(z.string()).optional(),
    vendu: z.boolean().default(false),
    pere: z.string().optional(),
    mere: z.string().optional(),
    pereDeMere: z.string().optional(),
    seoTitle: z.string(),
    seoDescription: z.string(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    link: z.string().optional(),
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
  }),
});

export const collections = { services, news, actualites, vente };
