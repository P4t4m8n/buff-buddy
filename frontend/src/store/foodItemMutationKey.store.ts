import { create } from "zustand";
import type { IFoodItemMutationKeyStore } from "../models/store.model";
import type { IFoodItemFilter } from "../../../shared/models/foodItem.model";

export const useFoodItemMutationKeyStore = create<
  IFoodItemMutationKeyStore<IFoodItemFilter>
>((set, get) => ({
  mutationKey: [],

  setMutationKey: (key: (string | IFoodItemFilter | null | undefined)[]) =>
    set({ mutationKey: key }),
  getMutationKey: () => get().mutationKey,
}));
