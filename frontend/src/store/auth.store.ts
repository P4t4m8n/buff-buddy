import { create } from "zustand";
import { authService } from "../services/auth.service";
import type {
  IAuthSignInDTO,
  IAuthUserDTO,
  IAuthSignUpDTO,
} from "../../../shared/models/auth.model";

interface IAuthStore {
  user: IAuthUserDTO | null;
  isLoading: boolean;
  loadSessionUser: () => Promise<void>;
  signIn: (dto: IAuthSignInDTO) => Promise<void>;
  signUp: (dto: IAuthSignUpDTO) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  user: null,
  isLoading: true,

  loadSessionUser: async () => {
    try {
      set({ isLoading: true });
      const res = await authService.getSessionUser();
      set({ user: res.data });
    } finally {
      set({ isLoading: false });
    }
  },

  signIn: async (dto: IAuthSignInDTO) => {
    try {
      set({ isLoading: true });
      const user = await authService.signIn(dto);
      set({ user });
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (dto: IAuthSignUpDTO) => {
    try {
      set({ isLoading: true });
      const user = await authService.signUp(dto);
      set({ user });
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true });
      await authService.signOut();
      set({ user: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));
