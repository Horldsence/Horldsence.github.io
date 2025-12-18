import { defineCollection, z } from 'astro:content';

const softwareCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        version: z.string(),
        pubDate: z.date(),
        rating: z.number().min(0).max(5).default(0),
        tags: z.array(z.string()).default([]),
        repoUrl: z.string().url().optional(),
        downloadUrl: z.string().url().optional(),
        icon: z.string().optional(), // Emoji or path to image
    }),
});

export const collections = {
    'software': softwareCollection,
};
