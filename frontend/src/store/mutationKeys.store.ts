import { create } from "zustand";

import type { IBaseFilter } from "../../../shared/models/app.model";

const STORE_KEYS = ["foodItemMutationKey", "programsMutationKey"] as const;

type TStoreKeys = (typeof STORE_KEYS)[number];
type TKeyValue = (string | IBaseFilter | null | undefined)[];

interface IMutationKeyState extends Record<TStoreKeys, TKeyValue> {}

interface IMutationKeyActions {
  setMutationKey: (storeKey: TStoreKeys, queryKey: TKeyValue) => void;
  getMutationKey: (storeKey: TStoreKeys) => TKeyValue;
}

const initialState = STORE_KEYS.reduce((acc, key) => {
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
