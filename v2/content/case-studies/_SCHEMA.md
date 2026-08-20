# Case study schema (V2)

Drop-in for `src/content/config.ts` when the build starts consuming these.

```ts
const caseStudiesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    client: z.string().optional(),          // omit if under NDA
    industry: z.string().optional(),
    status: z.enum(['active', 'complete']),
    date: z.date(),

    // Quadrant plotting. 0-100 on both axes.
    // x:  0 = pure Go-to-market   100 = pure Operations
    // y:  0 = pure Strategy       100 = pure Execution
    x: z.number().min(0).max(100),
    y: z.number().min(0).max(100),

    // Mono readout shown on the work row, e.g. "Ops · Strategy + Execution"
    coordLabel: z.string(),

    summary: z.string(),                    // one line, work row
    tags: z.array(z.string()),
    featured: z.boolean().default(false),

    // BLOCKS PRODUCTION. Every placeholder must be false before cutover.
    placeholder: z.boolean().default(false),

    metrics: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).optional(),
  }),
});
```

## Axis convention

Origin `(50,50)` is dead center. The plane is *not* a 2x2 of buckets — it is a continuous
field. A case study that spans strategy and execution sits near `y: 50`, not in two places.

```
                 STRATEGY (y=0)
                      |
  GTM (x=0) ---------+--------- OPERATIONS (x=100)
                      |
                EXECUTION (y=100)
```

## `placeholder: true` is a safety interlock

The 2026-08-11 audit found fabricated case studies live on gregtoler.com with invented
clients and invented metrics. The fix is not "be careful" — it is a flag the build can
assert on. Wire the production build to fail if any entry has `placeholder: true`.
