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

    // Pricing
    pricing: z.array(z.object({
      label: z.string(),
      price: z.string(),
      unit: z.string(),
      highlight: z.boolean().default(false),
    })).min(1),
    pricingNotes: z.array(z.string()).optional(),

    // Schedule
    schedule: z.array(z.object({
      day: z.string(),
      time: z.string(),
      level: z.string(),
    })).optional(),

    // Testimonial
    testimonial: z.object({
      quote: z.string(),
      author: z.string(),
      stars: z.number().int().min(1).max(5),
    }).optional(),

    // Schema markup
    serviceType: z.string(),
    serviceDescription: z.string(),
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

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
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

export const collections = { services, news, blog };
