import { create } from "zustand";

export type MockUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  credits: number;
  plan: "free" | "pro" | "enterprise";
};

type AuthState = {
  user: MockUser | null;
  isAuthed: boolean;
  login: (email: string) => void;
  logout: () => void;
};

const demoUser: MockUser = {
  id: "u_001",
  name: "Alex Morgan",
  username: "alexmorgan",
  email: "alex@luminal.ai",
  avatar: "https://api.dicebear.com/9.x/glass/svg?seed=alex",
  credits: 1240,
  plan: "pro",
};

export const useAuth = create<AuthState>((set) => ({
  user: demoUser,
  isAuthed: true,
  login: (email) => set({ user: { ...demoUser, email }, isAuthed: true }),
  logout: () => set({ user: null, isAuthed: false }),
}));
