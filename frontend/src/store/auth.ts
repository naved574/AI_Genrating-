import type { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";

import { isSupabaseConfigured, requireSupabase, supabase } from "@/lib/supabase/client";
import type { PlanKey, Profile } from "@/lib/saas-types";

export type AppUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  credits: number;
  plan: PlanKey;
  role: "creator" | "admin";
};

type AuthState = {
  user: AppUser | null;
  session: Session | null;
  isAuthed: boolean;
  loading: boolean;
  error: string | null;
  accessToken: () => string | null;
  initialize: () => Promise<void>;
  login: (email: string, password?: string) => Promise<void>;
  register: (email: string, password: string, fullName?: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const demoUser: AppUser = {
  id: "demo-user",
  name: "Demo Creator",
  username: "demo",
  email: "demo@luminal.local",
  avatar: "https://api.dicebear.com/9.x/glass/svg?seed=demo",
  credits: 250,
  plan: "pro",
  role: "admin",
};

function toAppUser(profile: Profile, authUser?: User | null): AppUser {
  const email = profile.email || authUser?.email || "";
  const name = profile.full_name || email.split("@")[0] || "Creator";
  return {
    id: profile.id,
    name,
    username:
      profile.username ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
    email,
    avatar:
      profile.avatar_url ||
      `https://api.dicebear.com/9.x/glass/svg?seed=${encodeURIComponent(profile.id)}`,
    credits: profile.credits,
    plan: profile.plan,
    role: profile.role,
  };
}

async function fetchProfile(user: User): Promise<AppUser> {
  const client = requireSupabase();
  const { data, error } = await client.from("profiles").select("*").eq("id", user.id).single();
  if (error || !data) throw new Error(error?.message ?? "Unable to load profile.");
  return toAppUser(data as Profile, user);
}

export const useAuth = create<AuthState>((set, get) => ({
  user: isSupabaseConfigured ? null : demoUser,
  session: null,
  isAuthed: !isSupabaseConfigured,
  loading: false,
  error: null,
  accessToken: () => get().session?.access_token ?? null,
  initialize: async () => {
    if (!isSupabaseConfigured || !supabase) return;
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      const session = data.session;
      const user = session?.user ? await fetchProfile(session.user) : null;
      set({ session, user, isAuthed: Boolean(session && user), loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Auth initialization failed.",
        loading: false,
        isAuthed: false,
        user: null,
      });
    }
  },
  login: async (email, password = "") => {
    if (!isSupabaseConfigured || !supabase) {
      set({ user: { ...demoUser, email }, isAuthed: true, error: null });
      return;
    }
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const user = data.user ? await fetchProfile(data.user) : null;
      set({ session: data.session, user, isAuthed: Boolean(user), loading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "Login failed.", loading: false });
      throw error;
    }
  },
  register: async (email, password, fullName) => {
    if (!isSupabaseConfigured || !supabase) {
      set({
        user: { ...demoUser, email, name: fullName || demoUser.name },
        isAuthed: true,
        error: null,
      });
      return;
    }
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (error) throw error;
      const user = data.user ? await fetchProfile(data.user) : null;
      set({ session: data.session, user, isAuthed: Boolean(user), loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Registration failed.",
        loading: false,
      });
      throw error;
    }
  },
  logout: async () => {
    if (isSupabaseConfigured && supabase) await supabase.auth.signOut();
    set({
      user: isSupabaseConfigured ? null : demoUser,
      session: null,
      isAuthed: !isSupabaseConfigured,
    });
  },
  refreshProfile: async () => {
    const session = get().session;
    if (!isSupabaseConfigured || !session?.user) return;
    const user = await fetchProfile(session.user);
    set({ user, isAuthed: true });
  },
}));

if (isSupabaseConfigured && supabase) {
  supabase.auth.onAuthStateChange((_event, session) => {
    if (!session?.user) {
      useAuth.setState({ session: null, user: null, isAuthed: false });
      return;
    }
    void fetchProfile(session.user).then((user) => {
      useAuth.setState({ session, user, isAuthed: true });
    });
  });
}
