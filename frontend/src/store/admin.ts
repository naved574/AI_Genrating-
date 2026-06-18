import { create } from "zustand";

import { listAdminDashboard } from "@/lib/api/saas.functions";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { useAuth } from "./auth";

type AdminState = {
  users: Record<string, unknown>[];
  payments: Record<string, unknown>[];
  models: Record<string, unknown>[];
  reports: Record<string, unknown>[];
  loading: boolean;
  error: string | null;
  load: () => Promise<void>;
};

export const useAdminData = create<AdminState>((set) => ({
  users: [],
  payments: [],
  models: [],
  reports: [],
  loading: false,
  error: null,
  load: async () => {
    const accessToken = useAuth.getState().accessToken();
    if (!isSupabaseConfigured || !accessToken) return;
    set({ loading: true, error: null });
    try {
      const data = await listAdminDashboard({ data: { accessToken } });
      set({ ...data, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Unable to load admin data.",
        loading: false,
      });
    }
  },
}));
