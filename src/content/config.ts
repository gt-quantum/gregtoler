import { defineCollection, z } from 'astro:content';

// Tag options for content
const contentTags = [
  'GTM',
  'Marketing',
  'Sales',
  'Process',
  'Frameworks',
  'Operations',
  'AI',
  'Technology',
] as const;

// Work Collection - Past and current projects/case studies
const workCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    client: z.string().optional(),
    projectType: z.enum(['past', 'current']),
    date: z.date(),
    endDate: z.date().optional(), // For past projects
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    coverImage: z.string().optional(),
    // Optional metrics/results
    metrics: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).optional(),
  }),
});

// Content Collection - Videos, blogs, posts
const contentCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    contentType: z.enum(['video', 'blog', 'post']),
    date: z.date(),
    tags: z.array(z.enum(contentTags)),
    featured: z.boolean().default(false),
    // Video-specific fields
    videoUrl: z.string().optional(), // YouTube URL
    videoDuration: z.string().optional(), // e.g., "12:34"
    // Blog-specific fields
    readingTime: z.number().optional(), // minutes
    coverImage: z.string().optional(),
  }),
});

// Resources Collection - Downloadable and viewable resources
const resourcesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    resourceType: z.enum(['spreadsheet', 'pdf', 'tool', 'video', 'template', 'guide']),
    date: z.date(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    // File info
    fileUrl: z.string().optional(), // For downloadable files
    fileSize: z.string().optional(), // e.g., "2.4 MB"
    // Video resources
    videoUrl: z.string().optional(),
    // Preview image
    previewImage: z.string().optional(),
  }),
});

export const collections = {
  work: workCollection,
  content: contentCollection,
  resources: resourcesCollection,
};
