import { create } from "zustand";
import { authService } from "../services/auth.service";
import type { IAuthSignInDTO, IAuthUserDTO, IAuthSignUpDTO } from "../models/auth.model";

interface IAuthStore {
  user: IAuthUserDTO | null;
  error: string | null;
  isLoading: boolean;
  loadSessionUser: () => Promise<void>;
  signIn: (dto: IAuthSignInDTO) => Promise<void>;
  signUp: (dto: IAuthSignUpDTO) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  user: null,
  error: null,
  isLoading: false,

  loadSessionUser: async () => {
    try {
      const res = await authService.getSessionUser();
      console.log(" loadSessionUser: ~ res:", res)
      set({ user: res, error: null });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to load session user",
      });
    }
  },

  signIn: async (dto: IAuthSignInDTO) => {
    try {
      set({ isLoading: true, error: null });
      const user = await authService.signIn(dto);
      set({ user });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to sign in",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (dto: IAuthSignUpDTO) => {
    try {
      set({ isLoading: true, error: null });
      const user = await authService.signUp(dto);
      set({ user });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to sign up",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true, error: null });
      await authService.signOut();
      set({ user: null });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to sign out",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
