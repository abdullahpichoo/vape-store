import { create } from "zustand";

import { AuthUserState } from "@/types/client/auth";

interface AuthStore {
  authUser: AuthUserState | null;
  isLoggedIn: boolean;
  setAuthUser: (authUser: AuthUserState | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isLoggedIn: false,
  setAuthUser: (authUser) => set({ authUser }),
}));
