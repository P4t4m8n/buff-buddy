import { create } from "zustand";
import { authService } from "../services/auth.service";
import type {
  IAuthSignInDTO,
  IAuthUserDTO,
  IAuthSignUpDTO,
} from "../../../shared/models/auth.model";

interface IAuthStore {
  user: IAuthUserDTO | null;
  isLoadingSession: boolean;
  isLoadingAuth: boolean;
  loadSessionUser: () => Promise<void>;
  signIn: (dto: IAuthSignInDTO) => Promise<void>;
  signUp: (dto: IAuthSignUpDTO) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  user: null,
  isLoadingSession: false,
  isLoadingAuth: false,

  loadSessionUser: async () => {
    try {
      set({ isLoadingSession: true });
      const res = await authService.getSessionUser();
      set({ user: res.data });
    } finally {
      set({ isLoadingSession: false });
    }
  },

  signIn: async (dto: IAuthSignInDTO) => {
    try {
      set({ isLoadingAuth: true });
      const user = await authService.signIn(dto);
      set({ user });
    } finally {
      set({ isLoadingAuth: false });
    }
  },

  signUp: async (dto: IAuthSignUpDTO) => {
    try {
      set({ isLoadingAuth: true });
      const user = await authService.signUp(dto);
      set({ user });
    } finally {
      set({ isLoadingAuth: false });
    }
  },

  signOut: async () => {
    try {
      set({ isLoadingAuth: true });
      await authService.signOut();
      set({ user: null });
    } finally {
      set({ isLoadingAuth: false });
    }
  },
}));
