import { create } from "zustand";
import type {
  IWorkoutDTO,
  IWorkoutEditDTO,
} from "../../../shared/models/workout.model";
import { workoutService } from "../services/workout.service";

interface WorkoutStore {
  workouts: IWorkoutDTO[];
  isLoading: boolean;
  isDeleting: boolean;
  isSavingId: string | null;
  isLoadingId: string | null;
  loadWorkouts: () => Promise<void>;
  getWorkoutById: (id?: string) => Promise<IWorkoutDTO | null>;
  saveWorkout: (
    workoutToSave: IWorkoutEditDTO
  ) => Promise<IWorkoutDTO | null | undefined>;
  deleteWorkout: (id: string) => Promise<void>;
}

export const useWorkoutStore = create<WorkoutStore>((set, get) => ({
  workouts: [],
  isLoading: false,
  isLoadingId: null,
  isDeleting: false,
  isSavingId: null,

  loadWorkouts: async () => {
    try {
      set({ isLoading: true });

      if (get().workouts.length > 0) {
        return;
      }
      const _workouts = await workoutService.get({});
      set({ workouts: _workouts, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },
  getWorkoutById: async (id?: string) => {
    if (!id) {
      return null;
    }
    try {
      set({ isLoadingId: id });
      const workout = get().workouts.find((w) => w.id === id);
      return !workout ? await workoutService.getById(id) : workout;
    } finally {
      if (get().isLoadingId === id) {
        set({ isLoadingId: null });
      }
    }
  },
  saveWorkout: async (workoutToSave: IWorkoutEditDTO) => {
    const currentId = workoutToSave.id;
    try {
      set({ isLoading: true, isSavingId: workoutToSave.id });
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
    } finally {
      //To prevent race conditions of a loading state
      //TODO??basic tests done, needs more tests
      if (get().isSavingId === currentId) {
        set({ isSavingId: null });
      }
    }
  },
  deleteWorkout: async (id: string) => {
    try {
      set({ isLoading: true, isDeleting: true });
      await workoutService.delete(id);
      set((state) => ({
        workouts: state.workouts.filter((w) => w.id !== id),
      }));
    } finally {
      set({ isLoading: false });
    }
  },
}));
