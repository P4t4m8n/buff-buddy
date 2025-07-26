import { create } from "zustand";
import { authService } from "../services/auth.service";
import type {
  IAuthSignInDTO,
  IAuthUserDTO,
  IAuthSignUpDTO,
} from "../../../shared/models/auth.model";
import { ApiError } from "../utils/ApiError.util";

interface IAuthStore {
  user: IAuthUserDTO | null;
  error: { errors?: Record<string, string>; message: string } | null;
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
      set({ isLoading: true, error: null });
      const res = await authService.getSessionUser();
      set({ user: res.data, error: null });
    } catch (error) {
      set({
        error:
          error instanceof ApiError
            ? { errors: error.errors, message: error.message }
            : {
                errors: { unknown: "Error" },
                message: "Unknown",
              },
        user: null,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  signIn: async (dto: IAuthSignInDTO) => {
    try {
      set({ isLoading: true, error: null });
      const user = await authService.signIn(dto);
      set({ user });
    } catch (error) {
      set({
        error:
          error instanceof ApiError
            ? { errors: error.errors, message: error.message }
            : {
                errors: { unknown: "Error" },
                message: "Unknown",
              },
        user: null,
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
        error:
          error instanceof ApiError
            ? { errors: error.errors, message: error.message }
            : {
                errors: { unknown: "Error" },
                message: "Unknown",
              },
        user: null,
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
        error:
          error instanceof ApiError
            ? { errors: error.errors, message: error.message }
            : {
                errors: { unknown: "Error" },
                message: "Unknown",
              },
        user: null,
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
