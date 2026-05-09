@AGENTS.md

# Grupo Enjoy — Project Configuration

## Stack
- **Framework**: Next.js 16 App Router (TypeScript, `src/` directory)
- **Styling**: Tailwind CSS 4 (`@theme inline`), Framer Motion
- **Architecture**: `/` (landing), `/enjoy`, `/outxide`, `/hiru` — each with independent `layout.tsx` + SEO metadata
- **Integrations**: FourVenues API (Outxide events/tickets)

## Business Context
Three venues in Alcúdia, Mallorca under one group:
- **Enjoy Terrace** — Cocktails & Shisha (pink/magenta #ec4899). "Where nights begin"
- **Outxide Club** — Discoteca (cyan #06b6d4 + violet #7c3aed). "The night continues"
- **Hiru Food & Drinks** — Cocina mallorquina a la brasa (copper #b87333). "Producto · tradición · sabor"

## Active Skills

### Global Skills (`~/.claude/skills/`)
These skills are installed globally and should be used when their triggers match:

1. **tdd** — Test-driven development with red-green-refactor vertical slices. Use when building features or fixing bugs with TDD. Workflow: plan → tracer bullet → incremental loop → refactor. Tests verify behavior through public interfaces, not implementation.

2. **diagnose** — Disciplined diagnosis for hard bugs. Reproduce → minimise → hypothesise → instrument → fix → regression-test. Build a feedback loop FIRST. Use when debugging, investigating failures, or performance regressions.

3. **grill-with-docs** — Stress-test plans against the domain model. Interviews relentlessly, sharpens terminology, updates CONTEXT.md and ADRs inline. Use when planning new features or validating design decisions.

4. **caveman** — ALWAYS ACTIVE. Ultra-compressed communication (~75% fewer tokens). Drop articles, filler, pleasantries. Keep full technical accuracy. This mode is permanently enabled for this project.

### Project Skills (`.claude/skills/`)

5. **ui-ux-pro-max** — Design intelligence with 50+ styles, 161 color palettes, 57 font pairings, 99 UX guidelines. MUST use when designing pages, creating/refactoring UI components, choosing colors/typography, or reviewing UI quality. Search databases at:
   - Data: `.claude/skills/ui-ux-pro-max-skill/src/ui-ux-pro-max/data/` (CSV files: products.csv, styles.csv, colors.csv, typography.csv, landing.csv, charts.csv, ux.csv)
   - Sub-skills: `.claude/skills/ui-ux-pro-max-skill/.claude/skills/` (brand, design, design-system, ui-styling, slides)
   - Priority order: Accessibility > Touch/Interaction > Performance > Style > Layout > Typography/Color > Animation

### Agent Personas (`.agents/agency-agents/`)
When spawning subagents for specialized tasks, use these personality definitions as system prompts:

**Design tasks:**
- `design/design-ui-designer.md` — Visual design systems, component libraries, pixel-perfect UI
- `design/design-ux-architect.md` — CSS systems, layout frameworks, responsive foundations
- `design/design-brand-guardian.md` — Brand consistency, visual identity enforcement
- `design/design-visual-storyteller.md` — Visual narratives, multimedia content

**Engineering tasks:**
- `engineering/engineering-frontend-developer.md` — React/Next.js, responsive, accessible web apps
- `engineering/engineering-senior-developer.md` — Laravel/Livewire/FluxUI, advanced CSS, Three.js
- `engineering/engineering-code-reviewer.md` — Code review, correctness, security, performance
- `engineering/engineering-security-engineer.md` — Threat modeling, vulnerability assessment

**Marketing tasks:**
- `marketing/marketing-agentic-search-optimizer.md` — WebMCP readiness, AI task completion
- `marketing/marketing-ai-citation-strategist.md` — AI recommendation engine optimization (AEO/GEO)

## Conventions
- Use `cn()` from `@/lib/utils` for className merging
- Business theme classes: `.theme-enjoy`, `.theme-outxide`, `.theme-hiru`
- All animations via Framer Motion (`<ScrollReveal>`, `<motion.div>`)
- Color tokens defined in `globals.css` `:root`, surfaced via `@theme inline`
- Component architecture: `components/ui/` (primitives), `components/layout/` (navbar, footer), `components/blocks/` (sections)
