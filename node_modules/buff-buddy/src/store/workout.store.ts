import { create } from "zustand";
import type { IWorkoutDTO, IWorkoutEditDTO } from "../../../shared/models/workout.model";
import { workoutService } from "../services/workout.service";
import { ApiError } from "../utils/ApiError.util";

interface WorkoutStore {
  workouts: IWorkoutDTO[];
  isLoading: boolean;
  loadWorkouts: () => Promise<void>;
  getWorkoutById: (id?: string) => Promise<IWorkoutDTO | null>;
  saveWorkout: (
    workoutToSave: IWorkoutEditDTO
  ) => Promise<IWorkoutDTO | null | undefined>;
  deleteWorkout: (id: string) => Promise<void>;
  error: { errors?: Record<string, string>; message: string } | null;
}

export const useWorkoutStore = create<WorkoutStore>((set, get) => ({
  workouts: [],
  isLoading: false,
  error: null,

  loadWorkouts: async () => {
    try {
      set({ isLoading: true, error: null });

      if (get().workouts.length > 0) {
        return;
      }

      const _workouts = await workoutService.get({});
      set({ workouts: _workouts, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof ApiError
            ? { errors: error.errors, message: error.message }
            : {
                errors: { unknown: "Error" },
                message: "Unknown",
              },
      });
    } finally {
      set({ isLoading: false });
    }
  },
  getWorkoutById: async (id?: string) => {
    try {
      if (!id) {
        return null;
      }
      set({ isLoading: true, error: null });

      const workout = get().workouts.find((w) => w.id === id);
      return !workout ? await workoutService.getById(id) : workout;
    } catch (error) {
      set({
        error:
          error instanceof ApiError
            ? { errors: error.errors, message: error.message }
            : {
                errors: { unknown: "Error" },
                message: "Unknown",
              },
      });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
  saveWorkout: async (workoutToSave: IWorkoutEditDTO) => {
    try {
      set({ isLoading: true, error: null });
      const savedWorkout = await workoutService.save(workoutToSave);
      if (savedWorkout) {
        set((state) => {
          const idx = state.workouts.findIndex((w) => w.id === savedWorkout.id);
          if (idx === -1) {
            return { workouts: [...state.workouts, savedWorkout] };
          }
          return {
            workouts: state.workouts.map((w) =>
              w.id === savedWorkout.id ? savedWorkout : w
            ),
          };
        });
      }
      return savedWorkout;
    } catch (error) {
      set({
        error:
          error instanceof ApiError
            ? { errors: error.errors, message: error.message }
            : {
                errors: { unknown: "Error" },
                message: "Unknown",
              },
      });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
  deleteWorkout: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      await workoutService.delete(id);
      set((state) => ({
        workouts: state.workouts.filter((w) => w.id !== id),
      }));
    } catch (error) {
      set({
        error:
          error instanceof ApiError
            ? { errors: error.errors, message: error.message }
            : {
                errors: { unknown: "Error" },
                message: "Unknown",
              },
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
