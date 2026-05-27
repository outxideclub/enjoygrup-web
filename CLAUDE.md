@AGENTS.md

# Grupo Enjoy — Project Rules & Configuration

## Stack
- **Framework**: Next.js 16 App Router (TypeScript, `src/` directory, Turbopack)
- **Styling**: Tailwind CSS 4 (`@theme inline` in `globals.css`), Framer Motion
- **Architecture**: `/` (landing), `/enjoy`, `/outxide`, `/hiru` — each with independent `layout.tsx` + SEO metadata
- **Integrations**: FourVenues API (Outxide events/tickets), Resend (email/newsletter)
- **Deploy**: Vercel (account: outxideclub-9096s-projects, project: enjoygrup-web, domain: grupoenjoy.es)

## Business Context
Three venues in Alcudia, Mallorca under one group (Grupo Enjoy):
- **Enjoy Terrace** — Cocktails & Shisha (pink/magenta `#ec4899`, CSS class: `text-enjoy`). Tagline: "Where nights begin". Location: Av. Tucan 1, Port d'Alcudia.
- **Outxide Club** — Discoteca (cyan `#06b6d4` + violet `#7c3aed`, CSS class: `text-outxide`). Tagline: "The night continues". Location: Av. Tucan 1, Port d'Alcudia.
- **Hiru Food & Drinks** — Cocina mallorquina a la brasa (copper `#b87333`, CSS class: `text-hiru`). Tagline: "Producto - tradicion - sabor". Location: Ctra. d'Arta 40, Port d'Alcudia.

## Owner Constraints (DO NOT VIOLATE)
- **NO prices on Enjoy menu** — The owner explicitly wants Enjoy menu items displayed WITHOUT prices. Never add price fields or price display to Enjoy venue pages.
- **Brand consistency** — Each venue has its own accent color. Never mix venue colors across pages.
- **No AI-generated stock photos** — Use only real venue photography from `/public/images/{enjoy,outxide,hiru}/`.

---

## i18n System (CRITICAL)

### Architecture
- Cookie-based locale detection (`ge_locale` cookie)
- 5 locales: `es` (default), `en`, `de`, `fr`, `it`
- Config: `src/i18n/config.ts` (locales, defaultLocale, COOKIE_NAME)
- Client hook: `useT()` from `src/i18n/context.tsx` — returns `t("key")` function
- Server function: `getServerT()` from `src/i18n/server.ts` — for server components/metadata
- Dictionary files: `src/i18n/dictionaries/{es,en,de,fr,it}.ts`

### Rules for i18n
1. **Every user-visible string MUST be translated** in all 5 locales. Never hardcode text in JSX.
2. When adding new UI text, add the key to ALL 5 dictionary files simultaneously.
3. Use `t("section.key")` pattern. Nested keys use dot notation.
4. Dictionary type is enforced — adding a key to one file without the others will cause build errors.

### Blog Translations
- Blog posts live in `data/blog/posts.ts`
- Interface: `BlogLocalizedText { es: string; en: string; de?: string; fr?: string; it?: string }`
- Every post MUST have all 5 locales for: `title`, `excerpt`, `content`
- Helper: `getPostText(text, locale)` falls back to `es` if locale missing
- Helper: `toBlogLocale(locale)` converts string to valid BlogLocale
- Date formatting maps: `{ es: "es-ES", en: "en-GB", de: "de-DE", fr: "fr-FR", it: "it-IT" }`

---

## File Structure

```
src/
  app/
    page.tsx            # Homepage (hero carousel + 3 venue cards)
    layout.tsx          # Root layout (fonts, metadata, LocaleProvider)
    globals.css         # Tailwind @theme inline, CSS variables, custom utilities
    enjoy/              # Enjoy Terrace venue pages
      page.tsx          # Main venue page
      layout.tsx        # Venue-specific metadata
    outxide/            # Outxide Club venue pages
      page.tsx, layout.tsx, checkout/
    hiru/               # Hiru Food & Drinks venue pages
      page.tsx, layout.tsx
    blog/
      page.tsx          # Blog listing (all posts)
      [slug]/
        page.tsx        # Server component (metadata, generateStaticParams)
        client.tsx      # Client component (blog post rendering)
      layout.tsx        # Blog-specific metadata
    nosotros/           # About page
    contacto/           # Contact page
    faq/                # FAQ page
    legal/              # Legal pages (privacy, terms, cookies)
    admin/              # Admin dashboard
  components/
    ui/                 # Primitives (button, scroll-reveal, logos, ambient-glow)
    layout/             # navbar.tsx, footer.tsx
    blocks/             # Section-level components
    seo/                # json-ld.tsx (structured data components)
  i18n/                 # Internationalization system
  lib/                  # Utilities (utils.ts with cn())
data/
  blog/posts.ts         # All blog post content (10 posts, 5 locales each)
public/
  images/{enjoy,outxide,hiru}/  # Venue photography
  videos/               # Hero background videos + posters
```

## Code Conventions

### Styling
- Use `cn()` from `@/lib/utils` for className merging (clsx + twMerge)
- Business theme classes: `.theme-enjoy`, `.theme-outxide`, `.theme-hiru`
- Dark-luxury aesthetic: background `#0a0a0a`, glass-card effects, grain overlays
- Card patterns: `glass-card rounded-3xl`, `hover-glow-{venue}`
- Typography: `font-display` for headings (uppercase, tracking-tight), system font for body

### Animations
- All animations via Framer Motion (`<ScrollReveal>`, `<motion.div>`)
- ALWAYS check `useReducedMotion()` — skip non-essential animations when true
- Use `MotionConfigProvider` for global reduced-motion handling
- Parallax effects: disable or reduce when `prefersReducedMotion` is true
- Performance: use `will-change-transform` only on elements that actually animate

### Components
- Color tokens defined in `globals.css` `:root`, surfaced via `@theme inline`
- Component architecture: `components/ui/` (primitives), `components/layout/` (navbar, footer), `components/blocks/` (sections)
- Logos: `EnjoyLogo`, `OutxideLogo`, `HiruLogo` from `@/components/ui/logos`
- Dynamic imports for heavy components: `dynamic(() => import(...), { ssr: false })`

### SEO & Structured Data
- Each venue layout.tsx has comprehensive metadata (title, description, openGraph, alternates)
- JSON-LD components in `src/components/seo/json-ld.tsx`:
  - `OrganizationJsonLd` — Grupo Enjoy organization
  - `WebSiteJsonLd` — Site-level schema
  - `RestaurantJsonLd` — Hiru (Restaurant type)
  - `BarOrPubJsonLd` — Enjoy (BarOrPub type)
  - `NightClubJsonLd` — Outxide (NightClub type)
  - `FAQPageJsonLd` — FAQ structured data
  - `ArticleJsonLd` — Blog posts
  - `BreadcrumbJsonLd` — Breadcrumb navigation
- All pages must have proper hreflang alternates for all 5 locales
- Blog posts generate static params for all slugs

### Images
- Use Next.js `<Image>` component always (never raw `<img>`)
- Provide `sizes` prop for responsive loading
- Use `priority` for above-the-fold images
- Blog post images: each post has a unique image — never reuse across posts
- Available venue photos:
  - Enjoy: ~28 photos in `/public/images/enjoy/`
  - Outxide: ~27 photos in `/public/images/outxide/`
  - Hiru: ~41 photos in `/public/images/hiru/`

---

## Development Workflow

### Build & Verify
```bash
npm run build          # Full production build (catches TS errors + missing translations)
npm run dev            # Dev server with Turbopack
```

### Deploy
```bash
git add -A && git commit -m "description"
git push origin main   # Vercel auto-deploys from main branch
```

### Adding a New Blog Post
1. Add post object to `data/blog/posts.ts` with ALL 5 locales (es, en, de, fr, it) for title, excerpt, content
2. Choose a unique image from `/public/images/` — verify it's not used by another post
3. Set proper venue tag, reading time, date, and tags
4. Run `npm run build` to verify no type errors
5. The post automatically appears in blog listing and gets a static page

### Adding a New i18n Key
1. Add key to `src/i18n/dictionaries/es.ts` first
2. Add same key to `en.ts`, `de.ts`, `fr.ts`, `it.ts`
3. Use in components via `t("section.newKey")`
4. Build will fail if any dictionary is missing the key (type enforcement)

### Adding a New Page
1. Create `src/app/new-page/page.tsx` and `layout.tsx`
2. Add comprehensive metadata in layout.tsx (title, description, openGraph)
3. Add hreflang alternates for all 5 locales
4. Add appropriate JSON-LD structured data
5. Ensure all visible text uses `t()` or `getServerT()`
6. Add page to sitemap if not auto-discovered

---

## Active Skills

### Global Skills (`~/.claude/skills/`)
1. **tdd** — Test-driven development with red-green-refactor vertical slices
2. **diagnose** — Disciplined diagnosis for hard bugs
3. **grill-with-docs** — Stress-test plans against the domain model
4. **caveman** — ALWAYS ACTIVE. Ultra-compressed communication (~75% fewer tokens)

### Project Skills (`.claude/skills/`)
5. **ui-ux-pro-max** — Design intelligence with 50+ styles, 161 color palettes, 57 font pairings, 99 UX guidelines. MUST use when designing pages, creating/refactoring UI components, choosing colors/typography, or reviewing UI quality.

### Agent Personas (`.agents/agency-agents/`)
**Design:** design-ui-designer, design-ux-architect, design-brand-guardian, design-visual-storyteller
**Engineering:** engineering-frontend-developer, engineering-senior-developer, engineering-code-reviewer, engineering-security-engineer
**Marketing:** marketing-agentic-search-optimizer, marketing-ai-citation-strategist
