# Luminal AI Generator

Creator-first AI image generation SaaS built with TanStack Start, Supabase, Stripe, and Fal/Replicate provider hooks.

## What is implemented

- Supabase Auth-backed login/register with local demo fallback when env keys are missing.
- Creator profiles with credits, plans, roles, generation history, assets, payments, reports, and model catalog schema.
- Credit-based generation server action that deducts credits, calls Fal or Replicate, saves generated asset records, and refunds failed jobs.
- Stripe Checkout + Billing Portal server actions and `/api/stripe/webhook` credit fulfillment.
- Dashboard wiring for generate, gallery, history, credits, and billing.
- Admin wiring for users, revenue, models, and moderation/report queues.

## Setup

```bash
cd frontend
bun install
cp .env.example .env
```

Fill `.env`:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_URL=http://localhost:3000
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
FAL_API_KEY=...
REPLICATE_API_TOKEN=...
```

## Supabase

1. Open the Supabase SQL editor.
2. Run `frontend/supabase/migrations/001_creator_saas.sql`.
3. Create a public storage bucket named `generations` if you want to proxy provider outputs into your own storage later.
4. Add Stripe price IDs to `public.plans.stripe_price_id` for paid plans.
5. Promote an admin account by setting `public.profiles.role = 'admin'`.

## Stripe

- Add a webhook endpoint: `https://your-domain.com/api/stripe/webhook`.
- Subscribe to `checkout.session.completed` and `invoice.payment_failed`.
- Use the matching webhook secret in `STRIPE_WEBHOOK_SECRET`.

## Development

```bash
bun run dev
bun run build
bun run lint
```

Without Supabase env keys, the app runs in local demo mode so UI work remains possible. With env keys, auth, credits, generation, billing, and admin data use the SaaS backend.
