import { create } from "zustand";
import type { IItemMutationKeyStore } from "../models/store.model";

export const mutationKeyStoreFactory = <F>() => {
  return create<IItemMutationKeyStore<F>>((set, get) => ({
    mutationKey: [],

    setMutationKey: (key: (string | F | null | undefined)[]) =>
      set({ mutationKey: key }),
    getMutationKey: () => get().mutationKey,
  }));
};
