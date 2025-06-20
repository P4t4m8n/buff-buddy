import { create } from "zustand";
import {
  type IExerciseInfoDTO,
  type TExerciseInfoCategory,
  type IExerciseInfoFilter,
  ExerciseInfoCategory,
} from "../models/exerciseInfo.model";
import { exerciseInfoService } from "../services/exerciseInfo.service";

interface IExerciseInfoStore {
  muscles: IExerciseInfoDTO[];
  equipment: IExerciseInfoDTO[];
  types: IExerciseInfoDTO[];
  isLoading: boolean;
  error: string | null;

  // Actions
  loadCategory: (
    category: TExerciseInfoCategory,
    filter?: IExerciseInfoFilter
  ) => Promise<void>;
  loadAllCategories: () => Promise<void>;
  deleteItem: (category: TExerciseInfoCategory, id: string) => Promise<void>;
  saveItem: (formData: FormData) => Promise<void>;
  setCategory: (
    category: TExerciseInfoCategory,
    data: IExerciseInfoDTO[]
  ) => void;
  getCategory: (category: TExerciseInfoCategory) => IExerciseInfoDTO[];

}

export const useExerciseInfoStore = create<IExerciseInfoStore>((set, get) => ({
  muscles: [],
  equipment: [],
  types: [],
  isLoading: false,
  error: null,

  loadCategory: async (
    category: TExerciseInfoCategory,
    filter?: IExerciseInfoFilter
  ) => {
    set({ isLoading: true, error: null });
    try {
      if (get()[category].length > 0) {
        set({ isLoading: false });
        return;
      }
      const data = await exerciseInfoService.get(category, filter);
      set((state) => ({
        ...state,
        [category]: data,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to load data",
        isLoading: false,
      });
    }
  },

  loadAllCategories: async () => {
    set({ isLoading: true, error: null });
    try {
  
      const promises = ExerciseInfoCategory.map((category) =>
        exerciseInfoService.get(category)
      );
      const results = await Promise.all(promises);
      const newState: Partial<IExerciseInfoStore> = {};
      ExerciseInfoCategory.forEach((category, index) => {
        newState[category] = results[index] as IExerciseInfoDTO[];
      });
      set((state) => ({ ...state, ...newState, isLoading: false }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to load data",
        isLoading: false,
      });
    }
  },

  deleteItem: async (category: TExerciseInfoCategory, id: string) => {
    set({ isLoading: true, error: null });
    try {
      await exerciseInfoService.delete(category, id);
      set((state) => ({
        ...state,
        [category]: state[category].filter((item) => item.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete item",
        isLoading: false,
      });
    }
  },

  saveItem: async (formData: FormData) => {
    set({ isLoading: true, error: null });
    try {
      const savedItem = await exerciseInfoService.save(formData);
      const category = savedItem.category;

      set((state) => {
        const existingIndex = state[category].findIndex(
          (item) => item.id === savedItem.id
        );
        const updatedItems =
          existingIndex >= 0
            ? state[category].map((item) =>
                item.id === savedItem.id ? savedItem : item
              )
            : [...state[category], savedItem];

        return {
          ...state,
          [category]: updatedItems,
          isLoading: false,
        };
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to save item",
        isLoading: false,
      });
    }
  },

  setCategory: (category: TExerciseInfoCategory, data: IExerciseInfoDTO[]) =>
    set((state) => ({ ...state, [category]: data })),

  getCategory: (category: TExerciseInfoCategory) => get()[category],
}));
