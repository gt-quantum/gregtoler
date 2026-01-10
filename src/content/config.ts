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
    endDate: z.date().optional(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    coverImage: z.string().optional(),
    author: z.string().default('Greg Toler'),
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
    updatedDate: z.date().optional(),
    tags: z.array(z.enum(contentTags)),
    featured: z.boolean().default(false),
    author: z.string().default('Greg Toler'),
    // Video-specific fields
    videoUrl: z.string().optional(),
    videoDuration: z.string().optional(),
    videoThumbnail: z.string().optional(),
    // Blog-specific fields
    readingTime: z.number().optional(),
    coverImage: z.string().optional(),
    // SEO
    ogImage: z.string().optional(),
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
    updatedDate: z.date().optional(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    author: z.string().default('Greg Toler'),
    // File info
    fileUrl: z.string().optional(),
    fileFormat: z.string().optional(),
    // Video walkthrough
    videoUrl: z.string().optional(),
    // Preview image
    previewImage: z.string().optional(),
    // SEO
    ogImage: z.string().optional(),
  }),
});

export const collections = {
  work: workCollection,
  content: contentCollection,
  resources: resourcesCollection,
};
