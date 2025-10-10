import { create } from "zustand";

import { authService } from "../services/auth.service";

import type {
  IAuthSignInDTO,
  IAuthSignUpDTO,
} from "../../../shared/models/auth.model";
import type { IUserDTO } from "../../../shared/models/user.model";

interface IAuthStore {
  user: IUserDTO | null;
  isLoadingSession: boolean;
  isLoadingAuth: boolean;
  signIn: (dto: IAuthSignInDTO) => Promise<void>;
  signUp: (dto: IAuthSignUpDTO) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user?: IUserDTO | null) => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  user: null,
  isLoadingSession: true,
  isLoadingAuth: false,

  setUser: (user?: IUserDTO | null) => {
    set({ user });
    return;
  },

  signIn: async (dto: IAuthSignInDTO) => {
    try {
      set({ isLoadingAuth: true });
      const { data: user } = await authService.signIn(dto);
      set({ user });
    } finally {
      set({ isLoadingAuth: false });
    }
  },

  signUp: async (dto: IAuthSignUpDTO) => {
    try {
      set({ isLoadingAuth: true });
      const { data: user } = await authService.signUp(dto);
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
