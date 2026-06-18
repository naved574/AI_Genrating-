import process from "node:process";

// Server-only config. The .server.ts suffix prevents Vite from bundling
// this file into the client � values here never reach the browser.
// Always read process.env inside functions so Cloudflare/Nitro request-time
// bindings are respected.

export function getServerConfig() {
  return {
    nodeEnv: process.env.NODE_ENV,
    appUrl: process.env.VITE_APP_URL ?? process.env.APP_URL ?? "http://localhost:3000",
    supabaseUrl: process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL,
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    falApiKey: process.env.FAL_API_KEY,
    replicateApiToken: process.env.REPLICATE_API_TOKEN,
  };
}
