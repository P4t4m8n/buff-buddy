import { create } from "zustand";
import type {
  IExerciseDTO,
  IExerciseFilter,
} from "../../../shared/models/exercise.model";
import { exerciseService } from "../services/exercise.service";
import type { IStoreBase } from "../models/store.model";

export const useExerciseStore = create<
  IStoreBase<IExerciseDTO, IExerciseDTO, IExerciseFilter>
>((set, get) => ({
  items: [],
  isLoading: false,
  isDeleting: false,
  isSavingId: null,
  isLoadingId: null,

  loadItems: async (filter?: IExerciseFilter) => {
    try {
      set({ isLoading: true });

      if (get().items.length > 0) {
        return;
      }

      const _exercises = await exerciseService.get(filter);

      set({ items: _exercises, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },
  saveItem: async (exerciseToSave: IExerciseDTO) => {
    const currentId = exerciseToSave.id;
    set({ isSavingId: currentId });
    try {
      const { data } = await exerciseService.save(exerciseToSave);

      set((state) => {
        const idx = state.items.findIndex(
          (exercise) => exercise.id === currentId
        );

        const updatedExercises = [...state.items];
        if (idx !== -1) {
          updatedExercises[idx] = data;
          return { items: updatedExercises };
        } else {
          return { items: [...state.items, data] };
        }
      });
      return true;
    } finally {
      //To prevent race conditions of a loading state
      //TODO??basic tests done, needs more tests
      if (get().isSavingId === currentId) {
        set({ isSavingId: null });
      }
    }
  },
  deleteItem: async (id: string) => {
    set({ isDeleting: true });
    try {
      await exerciseService.delete(id);
      set((state) => ({
        items: state.items.filter((exercise) => exercise?.id !== id),
      }));
    } finally {
      set({ isDeleting: false });
    }
  },
}));
