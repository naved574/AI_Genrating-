import { createClient } from "@supabase/supabase-js";

import { getServerConfig } from "../config.server";

export function getSupabaseAdmin() {
  const config = getServerConfig();
  if (!config.supabaseUrl || !config.supabaseServiceRoleKey) {
    throw new Error(
      "Server Supabase config missing. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  return createClient(config.supabaseUrl, config.supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function getUserFromAccessToken(accessToken: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.auth.getUser(accessToken);
  if (error || !data.user) {
    throw new Error("Invalid or expired session. Please sign in again.");
  }
  return data.user;
}
