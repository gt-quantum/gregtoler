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

// Project tags
const projectTags = [
  'GTM',
  'Operations',
  'Sales',
  'Marketing',
  'Products',
  'Processes',
] as const;

// App tags
const appTags = [
  'Sales',
  'Marketing',
  'GTM',
  'Operations',
  'Productivity',
  'Analytics',
  'Automation',
  'Planning',
  'Strategy',
] as const;

// Work Collection - Past and current projects/case studies (legacy, keeping for compatibility)
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

// Projects Collection - Consulting projects (CMS-driven)
const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(), // e.g., "Enterprise SaaS · B2B"
    description: z.string(),
    status: z.enum(['active', 'completed']),
    tags: z.array(z.enum(projectTags)),
    date: z.date(),
    updatedDate: z.date().optional(),
    coverImage: z.string().optional(),
    featured: z.boolean().default(false),
    author: z.string().default('Greg Toler'),
    // Optional metrics/results
    metrics: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).optional(),
    // SEO
    ogImage: z.string().optional(),
  }),
});

// Apps Collection - Tools and applications (CMS-driven)
const appsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    type: z.enum(['App', 'Tool', 'Template']),
    tagline: z.string(),
    description: z.string(),
    status: z.enum(['download', 'signup', 'request']),
    version: z.string().optional(),
    tags: z.array(z.enum(appTags)),
    date: z.date(),
    updatedDate: z.date().optional(),
    // Media
    videoUrl: z.string().optional(),
    previewImage: z.string().optional(),
    // Download/signup
    downloadUrl: z.string().optional(),
    signupUrl: z.string().optional(),
    // Features & requirements
    features: z.array(z.string()).optional(),
    requirements: z.array(z.string()).optional(),
    // SEO
    ogImage: z.string().optional(),
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
  projects: projectsCollection,
  apps: appsCollection,
  content: contentCollection,
  resources: resourcesCollection,
};
