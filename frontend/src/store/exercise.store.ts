import { create } from "zustand";
import type { IExerciseDTO } from "../../../shared/models/exercise.model";
import { exerciseService } from "../services/exercise.service";
import type { IExerciseStore } from "../models/store.model";

export const useExerciseStore = create<IExerciseStore>((set, get) => ({
  exercises: [],
  isLoading: false,
  isDeleting: false,
  isSavingId: null,
  isLoadingId: null,

  loadExercises: async () => {
    try {
      set({ isLoading: true });

      if (get().exercises.length > 0) {
        return;
      }

      const _exercises = await exerciseService.get({});
      set({ exercises: _exercises, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },
  saveExercise: async (exerciseToSave: IExerciseDTO) => {
    const currentId = exerciseToSave.id;
    set({ isSavingId: currentId });
    try {
      const { data } = await exerciseService.save(exerciseToSave);

      set((state) => {
        const idx = state.exercises.findIndex(
          (exercise) => exercise.id === currentId
        );

        const updatedExercises = [...state.exercises];
        if (idx !== -1) {
          updatedExercises[idx] = data;
          return { exercises: updatedExercises };
        } else {
          return { exercises: [...state.exercises, data] };
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
  deleteExercise: async (id: string) => {
    set({ isDeleting: true });
    try {
      await exerciseService.delete(id);
      set((state) => ({
        exercises: state.exercises.filter((exercise) => exercise?.id !== id),
      }));
    } finally {
      set({ isDeleting: false });
    }
  },
}));
