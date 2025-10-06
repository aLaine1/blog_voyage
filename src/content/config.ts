import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    voyage: z.string().optional(),  // ← Rendre optionnel temporairement
    lieu: z.string().optional(),
    heroImage: z.string().optional(),
  }),
});

export const collections = { blog };
