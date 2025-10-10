//Lib
import { create } from "zustand";
//Services
import { authService } from "../services/auth.service";
//Types
import type { IUserDTO } from "../../../shared/models/user.model";
import type {
  TSignUpInput,
  TSignInInput,
} from "../../../shared/validations/auth.validation";

interface IAuthStore {
  user: IUserDTO | null;
  isLoadingAuth: boolean;
  signIn: (dto: TSignInInput) => Promise<void>;
  signUp: (dto: TSignUpInput) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user?: IUserDTO | null) => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  user: null,
  isLoadingAuth: false,

  setUser: (user?: IUserDTO | null) => {
    set({ user });
    return;
  },

  signIn: async (dto: TSignInInput) => {
    try {
      set({ isLoadingAuth: true });
      const { data: user } = await authService.signIn(dto);
      set({ user });
    } finally {
      set({ isLoadingAuth: false });
    }
  },

  signUp: async (dto: TSignUpInput) => {
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
