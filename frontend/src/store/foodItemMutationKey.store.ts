import { create } from "zustand";
import type { IItemMutationKeyStore } from "../models/store.model";
import type { IFoodItemFilter } from "../../../shared/models/foodItem.model";

export const useFoodItemMutationKeyStore = create<
  IItemMutationKeyStore<IFoodItemFilter>
>((set, get) => ({
  mutationKey: [],

  setMutationKey: (key: (string | IFoodItemFilter | null | undefined)[]) =>
    set({ mutationKey: key }),
  getMutationKey: () => get().mutationKey,
}));
