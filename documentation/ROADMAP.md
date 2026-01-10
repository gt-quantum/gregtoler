# Project Roadmap & Tasks

## Phase 1: Foundation ✅
**Goal**: Get the basic site structure running with the FluidSpineMenu as the shell

### Tasks
- [x] Initialize Astro project in root directory
- [x] Install dependencies (react, framer-motion, @astrojs/cloudflare)
- [x] Create `src/lib/theme.ts` with color palette
- [x] Adapt FluidSpineMenu.jsx to work as layout component
  - [x] Accept `children` prop for page content
  - [x] Convert menu items to actual navigation links
  - [x] Handle active state based on current route
  - [x] Persist dark mode preference (localStorage)
- [x] Create BaseLayout.astro that wraps pages with FluidSpineMenu
- [x] Create stub pages for all menu items (Home, About, Work, Content, Resources)
- [x] Set up global CSS reset/base styles
- [x] Test dark mode toggle works across pages
- [x] Configure Cloudflare adapter
- [ ] Push to GitHub and deploy to Cloudflare Pages

### Deliverable
Basic site navigation works, all pages accessible, consistent layout

---

## Phase 2: Content Collections Setup
**Goal**: Define schemas and create sample content

### Tasks
- [ ] Create `src/content/config.ts` with collection schemas
- [ ] Define Work collection schema (past and current projects)
  - title, description, client, type (past/current), date, tags, featured, cover image
- [ ] Define Content collection schema (videos, blogs, posts)
  - title, description, type (video/blog/post), date, tags (multiselect), featured
  - Tags: GTM, Marketing, Sales, Process, Frameworks, Operations, AI, Technology
  - Optional: videoUrl, videoEmbed for video content
- [ ] Define Resources collection schema (downloadable/viewable)
  - title, description, type (spreadsheet/pdf/tool/video), file, date, tags
- [ ] Create 1-2 sample entries for each collection
- [ ] Test content queries work

---

## Phase 3: Work Section
**Goal**: Showcase past and current projects

### Tasks
- [ ] Create Work index page with filterable grid
- [ ] Create Work detail page template ([slug].astro)
- [ ] Design project layout
- [ ] Add related work suggestions
- [ ] Implement smooth page transitions

---

## Phase 4: Content Section
**Goal**: Videos, blogs, and written content

### Tasks
- [ ] Create Content index page with filterable list
- [ ] Create Content detail page template
- [ ] Support video embeds (YouTube)
- [ ] Design reading experience (typography, spacing)
- [ ] Add reading time estimate
- [ ] Add related content suggestions

---

## Phase 5: Resources Section
**Goal**: Downloadable and viewable resources

### Tasks
- [ ] Create Resources page with categorized list
- [ ] Design resource cards with download/view buttons
- [ ] Set up file hosting (public folder or Cloudflare R2)
- [ ] Support both downloadable files and video resources

---

## Phase 6: About Page
**Goal**: Personal/professional bio

### Tasks
- [ ] Design About page layout
- [ ] Add bio section
- [ ] Add skills/expertise section
- [ ] Add contact information
- [ ] Consider timeline/experience section

---

## Phase 7: Services Page
**Goal**: Detail service offerings

### Tasks
- [ ] Design Services page layout
- [ ] Define service categories
- [ ] Add service descriptions
- [ ] Include CTAs for contact

---

## Phase 8: Contact Page
**Goal**: Enable visitor contact

### Tasks
- [ ] Design contact form
- [ ] Set up Cloudflare Worker for form handling
- [ ] Configure email forwarding or database storage
- [ ] Add form validation
- [ ] Add success/error states

---

## Phase 9: Home Page Dashboard
**Goal**: Build dashboard-style home page that pulls from collections

### Tasks
- [ ] Design home page layout (reference inspiration images)
- [ ] Create hero section with name, tagline, CTA
- [ ] Add "Quick Stats" component (Active Projects, Apps Shipped, etc.)
- [ ] Add "Services & Focus" component
- [ ] Add "Recent Work" tile (queries Work collection)
- [ ] Add "Latest Content" tile (queries Content collection)
- [ ] Add "Featured Resources" tile (queries Resources collection)
- [ ] Implement responsive layout
- [ ] Add entrance animations

---

## Phase 10: Polish & Launch
**Goal**: Final refinements

### Tasks
- [ ] Performance audit (Lighthouse)
- [ ] SEO meta tags on all pages
- [ ] Open Graph images
- [ ] 404 page
- [ ] Favicon and app icons
- [ ] Final responsive testing
- [ ] Cross-browser testing
- [ ] Analytics setup (if desired)
- [ ] Push to GitHub and deploy to Cloudflare Pages
- [ ] Launch!

---

## Future Enhancements
- [ ] Search functionality (CMD+K)
- [ ] RSS feed for articles
- [ ] Newsletter signup
- [ ] Media gallery page
- [ ] Video embeds for YouTube content
- [ ] Integration with external CMS (if needed beyond file-based)

---

## Content to Create

### Work (Case Studies)
| Title | Status |
|-------|--------|
| CertifID Marketing Assessment | To write |
| ABM Implementation | To write |
| Territory Planning System | To write |

### Projects (Apps/Tools)
| Title | Status |
|-------|--------|
| Account Map App | To write |
| Time Tracking App | To write |
| Bible Study App | To write |

### Articles
| Title | Status |
|-------|--------|
| The ABM Trinity | To write |
| Territory Planning Process | To write |
| GTM Operating Models | To write |

### Resources
| Title | Type | Status |
|-------|------|--------|
| Territory Planning Template | Spreadsheet | To create |
| ABM Playbook | PDF | To create |
| Lead Scoring Calculator | Tool | To create |

---

## Notes for Claude Code

### When Adding Content
1. Create MDX file in appropriate `src/content/` subfolder
2. Include all required frontmatter fields per schema
3. Use consistent formatting
4. Add placeholder for images with descriptions

### When Creating Components
1. Use theme colors from `src/lib/theme.ts`
2. Follow spacing system (8px grid)
3. Add Framer Motion animations where appropriate
4. Keep components focused and reusable

### When Styling
1. Prefer inline styles or CSS Modules for component isolation
2. Never use pure black or white
3. All grays should be warm (brown undertones)
4. Test both light and dark modes

### Commit Messages
Use conventional commits:
- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation
- `style:` formatting
- `refactor:` code restructure
- `content:` content updates
