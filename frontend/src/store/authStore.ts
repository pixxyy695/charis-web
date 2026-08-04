import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as authApi from "@/lib/api/auth";
import { User } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  hydrate: () => Promise<void>;
  hydrated: boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      hydrated: false,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { user, token } = await authApi.login(email, password);
          set({ user, token, isLoading: false });
        } catch (err) {
          set({ isLoading: false, error: (err as Error).message });
          throw err;
        }
      },

      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { user, token } = await authApi.register(name, email, password);
          set({ user, token, isLoading: false });
        } catch (err) {
          set({ isLoading: false, error: (err as Error).message });
          throw err;
        }
      },

      logout: () => set({ user: null, token: null }),
      clearError: () => set({ error: null }),
      hydrate: async () => {
        const token = useAuthStore.getState().token;
        if (!token) return set({ hydrated: true });
        try {
          const { user } = await authApi.me(token);
          set({ user, hydrated: true });
        } catch {
          set({ user: null, token: null, hydrated: true });
        }
      },
    }),
    { name: "charis-auth" }
  )
);
