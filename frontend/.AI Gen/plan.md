## Implementation plan

Execute the plan currently open in `plan.md`. Start with Batch 1 (foundation) so the app stays buildable, then proceed batch-by-batch.

### Batch 1 — Foundation (this pass)

1. Create `src/pages/` tree:
   - `src/pages/site/` (+ `site/tools/`, `site/legal/`)
   - `src/pages/auth/`
   - `src/pages/dashboard/`
   - `src/pages/admin/`

2. Build section template library in `src/components/sections/`:
   - `MarketingHero`, `FeatureGrid`, `StatStrip`, `LogoCloud`, `PricingTable`, `FAQAccordion`, `CTASection`
   - `ToolLanding` (powers all 16 tool pages)
   - `LegalDoc` (TOC + prose)
   - `DashCardGrid`, `DashTable`, `DashStatTiles`
   - `AuthShell`
   - `AdminTable`, `AdminDetail`

3. Extend `src/data/mock.ts` with: tools, plans, FAQs, changelog entries, jobs, leaderboard rows, admin users/transactions/moderation queue.

4. For each of the ~150 routes, create a matching page component file under `src/pages/<section>/<Name>.tsx`. Initially each page renders a thin section-appropriate scaffold (hero + 1 placeholder section) using the new templates — NOT the old shared `PagePlaceholder`. Hero pages already built (Generate) are migrated as-is.

5. Convert every `src/routes/*.tsx` file to the 3-line wrapper pattern:
   ```tsx
   import { createFileRoute } from "@tanstack/react-router";
   import { Features } from "@/pages/site/Features";
   export const Route = createFileRoute("/_site/features")({
     head: () => ({ meta: [{ title: "Features — Luminal" }] }),
     component: Features,
   });
   ```

6. Remove `src/components/layout/page-placeholder.tsx` once nothing imports it.

End of Batch 1: app builds, every route navigable, every page is a real component file in `src/pages/` (some with template-only content awaiting their batch).

### Subsequent batches

I'll pause after Batch 1 and ask you to confirm before continuing. Then:

- Batch 2 — Marketing tier 1 (15 pages, full custom content)
- Batch 3 — 16 AI tool pages via `ToolLanding`
- Batch 4 — Auth + onboarding (12 pages, real forms)
- Batch 5 — Dashboard (30 pages, interactive mock views)
- Batch 6 — Admin (14 pages, table/detail shells)
- Batch 7 — Remaining marketing + legal + utility (~30 pages)
- Batch 8 — Framer Motion polish + mobile QA

### Technical notes

- TanStack Router requires files in `src/routes/`. Page UI lives in `src/pages/`; routes are thin wrappers — satisfies both framework and folder preference.
- All colors via semantic tokens in `src/styles.css`. No raw hex in components.
- Mock data only. No backend.
- Each route's `head()` gets a unique title + description.

### Out of scope

Real backend, real auth, real generation, rich-text editor, pixel-perfect uniqueness across template-sharing pages (16 tool pages intentionally share `ToolLanding`).
