import { create } from "zustand";

import { MUTATION_STORE_KEYS } from "../consts/mutationKeyStore.const";

import type {
  IMutationKeyState,
  IMutationKeyActions,
} from "../models/mutationKeyStore.model";

const initialState = MUTATION_STORE_KEYS.reduce((acc, key) => {
  acc[key] = [];
  return acc;
}, {} as IMutationKeyState);

export const useMutationKeyStore = create<
  IMutationKeyState & IMutationKeyActions
>((set, get) => ({
  ...initialState,

  setMutationKey: (storeKey, queryKey) => {
    set({ [storeKey]: queryKey });
  },

  getMutationKey: (storeKey) => {
    return get()[storeKey];
  },
}));
