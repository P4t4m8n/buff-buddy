import { create } from "zustand";
import { authService } from "../services/auth.service";
import type {
  IAuthSignInDTO,
  IAuthSignUpDTO,
} from "../../../shared/models/auth.model";
import type { IUserDTO } from "../../../shared/models/user.model";
import { localStorageService } from "../services/localStorage.service";

interface IAuthStore {
  user: IUserDTO | null;
  isLoadingSession: boolean;
  isLoadingAuth: boolean;
  loadSessionUser: () => Promise<void>;
  signIn: (dto: IAuthSignInDTO) => Promise<void>;
  signUp: (dto: IAuthSignUpDTO) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<IAuthStore>((set, get) => ({
  user: null,
  isLoadingSession: true,
  isLoadingAuth: false,

  loadSessionUser: async () => {
    try {
      if (get().user) return;

      const localStoredUser =
        localStorageService.getSessionData<IUserDTO>("user");

      if (localStoredUser) {
        set({ user: localStoredUser });
        return;
      }

      const res = await authService.getSessionUser();
      set({ user: res.data });
      localStorageService.storeSessionData("user", res.data);
    } finally {
      set({ isLoadingSession: false });
    }
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
