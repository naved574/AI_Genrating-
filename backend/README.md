# AI Generator Backend

Standalone Express + TypeScript API for the creator-first AI Generator SaaS.

## Stack

- Express + TypeScript
- PostgreSQL + Prisma
- Redis + BullMQ
- JWT access/refresh auth
- Cloudinary uploads
- Stripe billing
- Socket.IO realtime generation events
- Zod validation
- Pino logging

## Setup

```bash
cd backend
bun install
cp .env.example .env
bun run prisma:generate
bun run prisma:migrate
bun run prisma:seed
bun run dev
```

Run the worker separately:

```bash
bun run dev:worker
```

## Important URLs

- `GET /health`
- API base: `/api/v1`
- Stripe webhook: `/api/v1/billing/webhook`

The backend is designed to replace the current frontend server functions gradually.
