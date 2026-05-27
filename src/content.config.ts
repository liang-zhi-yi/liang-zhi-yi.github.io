import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().default('技术'),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
    featured: z.boolean().default(false)
  })
});

const life = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/life' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    mood: z.string().optional(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false)
  })
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    role: z.string().optional(),
    techStack: z.array(z.string()).default([]),
    cover: z.string().optional(),
    demoUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    status: z.enum(['idea', 'building', 'done', 'archived']).default('done')
  })
});

const collectionItems = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/collections' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    type: z.enum(['book', 'anime', 'game', 'tool', 'website', 'music', 'other']),
    rating: z.number().min(1).max(5).optional(),
    tags: z.array(z.string()).default([]),
    link: z.string().url().optional(),
    cover: z.string().optional(),
    favorite: z.boolean().default(false)
  })
});

export const collections = { blog, life, projects, collections: collectionItems };
