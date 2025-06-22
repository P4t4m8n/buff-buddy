import { create } from "zustand";
import type { IExerciseDTO } from "../models/exercise.model";
import { exerciseService } from "../services/exercise.service";

interface IExerciseStore {
  exercises: IExerciseDTO[];
  isLoading: boolean;
  loadExercises: () => Promise<void>;
  saveExercise: (exerciseToSave: IExerciseDTO) => Promise<void>;
  deleteExercise: (id: string) => Promise<void>;
  error: string | null;
}
export const useExerciseStore = create<IExerciseStore>((set, get) => ({
  exercises: [],
  isLoading: false,
  error: null,

  loadExercises: async () => {
    try {
      set({ isLoading: true, error: null });

      if (get().exercises.length > 0) {
        return;
      }

      const _exercises = await exerciseService.get({});
      set({ exercises: _exercises, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to load exercises",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  saveExercise: async (exerciseToSave: IExerciseDTO) => {
    console.log(" saveExercise: ~ exerciseToSave:", exerciseToSave)
    try {
      set({ isLoading: true, error: null });
      const savedExercise = await exerciseService.save(exerciseToSave);
      set((state) => {
        const idx = state.exercises.findIndex(
          (exercise) => exercise.id === savedExercise.id
        );

        if (idx !== -1) {
          const updatedExercises = [...state.exercises];
          updatedExercises[idx] = savedExercise;
          return { exercises: updatedExercises };
        } else {
          return { exercises: [...state.exercises, savedExercise] };
        }
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to save exercise",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteExercise: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await exerciseService.delete(id);
      set((state) => ({
        exercises: state.exercises.filter((exercise) => exercise.id !== id),
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to delete exercise",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
