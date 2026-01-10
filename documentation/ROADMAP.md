# Project Roadmap & Tasks

## Phase 1: Foundation
**Goal**: Get the basic site structure running with the FluidSpineMenu as the shell

### Tasks
- [ ] Initialize Astro project in root directory
- [ ] Install dependencies (react, framer-motion, @astrojs/cloudflare)
- [ ] Create `src/lib/theme.ts` with color palette
- [ ] Adapt FluidSpineMenu.jsx to work as layout component
  - [ ] Accept `children` prop for page content
  - [ ] Convert menu items to actual navigation links
  - [ ] Handle active state based on current route
  - [ ] Persist dark mode preference (localStorage)
- [ ] Create BaseLayout.astro that wraps pages with FluidSpineMenu
- [ ] Create stub pages for all menu items (Home, About, Work, Content, Resources)
- [ ] Set up global CSS reset/base styles
- [ ] Test dark mode toggle works across pages
- [ ] Configure Cloudflare adapter
- [ ] Push to GitHub and deploy to Cloudflare Pages

### Deliverable
Basic site navigation works, all pages accessible, consistent layout

---

## Phase 2: Home Page
**Goal**: Build the dashboard-style home page

### Tasks
- [ ] Design home page layout (reference inspiration images)
- [ ] Create hero section with name, tagline, CTA
- [ ] Add "Quick Stats" component (Active Projects, Apps Shipped, etc.)
- [ ] Add "Services & Focus" component
- [ ] Add "Recent Highlights" section (pulls from content collections)
- [ ] Add "Behind the Work" preview section
- [ ] Implement responsive layout
- [ ] Add entrance animations

### Placeholder Images Needed
- Hero/profile image area
- Work preview thumbnails
- Project preview thumbnails

---

## Phase 3: Content Collections Setup
**Goal**: Define schemas and create sample content

### Tasks
- [ ] Create `src/content/config.ts` with collection schemas
- [ ] Define Work collection schema (case studies)
  - title, description, client, date, tags, featured, cover image
- [ ] Define Projects collection schema (apps/tools)
  - title, description, status, date, tags, link, github
- [ ] Define Articles collection schema
  - title, description, date, tags, featured
- [ ] Define Resources collection schema
  - title, description, type, file, date, tags
- [ ] Create 2-3 sample entries for each collection
- [ ] Test content queries work

---

## Phase 4: Work Section
**Goal**: Showcase consulting work and case studies

### Tasks
- [ ] Create Work index page with filterable grid
- [ ] Create Work detail page template ([slug].astro)
- [ ] Design case study layout
- [ ] Add related work suggestions
- [ ] Implement smooth page transitions

---

## Phase 5: Projects Section
**Goal**: Showcase apps, tools, and templates built

### Tasks
- [ ] Create Projects index page
- [ ] Create Project detail page template
- [ ] Add project status badges (Active, Shipped, etc.)
- [ ] Add links to live projects/GitHub
- [ ] Consider embedding demos where possible

---

## Phase 6: Content/Articles Section
**Goal**: Essays and written content

### Tasks
- [ ] Create Content index page with article list
- [ ] Create Article detail page template
- [ ] Design reading experience (typography, spacing)
- [ ] Add reading time estimate
- [ ] Add related articles

---

## Phase 7: Resources Section
**Goal**: Downloadable resources

### Tasks
- [ ] Create Resources page with categorized list
- [ ] Design resource cards with download buttons
- [ ] Set up file hosting (public folder or Cloudflare R2)
- [ ] Track downloads (optional analytics)

---

## Phase 8: About Page
**Goal**: Personal/professional bio

### Tasks
- [ ] Design About page layout
- [ ] Add bio section
- [ ] Add skills/expertise section
- [ ] Add contact information
- [ ] Consider timeline/experience section

---

## Phase 9: Contact & Forms
**Goal**: Enable visitor contact

### Tasks
- [ ] Design contact form
- [ ] Set up Cloudflare Worker for form handling
- [ ] Configure email forwarding or database storage
- [ ] Add form validation
- [ ] Add success/error states

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
