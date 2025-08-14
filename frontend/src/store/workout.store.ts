import { create } from "zustand";

import { workoutService } from "../services/workout.service";

import type {
  IWorkoutDTO,
  IWorkoutEditDTO,
  IWorkoutFilter,
} from "../../../shared/models/workout.model";
import type { IStoreBase } from "../models/store.model";

export const useWorkoutStore = create<
  IStoreBase<IWorkoutDTO, IWorkoutEditDTO, IWorkoutFilter>
>((set, get) => ({
  items: [],
  isLoading: false,
  isLoadingId: null,
  isDeleting: false,
  isSavingId: null,

  loadItems: async () => {
    try {
      set({ isLoading: true });

      if (get().items.length > 0) {
        return;
      }
      const _workouts = await workoutService.get({});
      set({ items: _workouts, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },
  getById: async (id?: string) => {
    if (!id) {
      return null;
    }
    try {
      set({ isLoadingId: id });
      const workout = get().items.find((w) => w.id === id);
      return !workout ? await workoutService.getById(id) : workout;
    } finally {
      if (get().isLoadingId === id) {
        set({ isLoadingId: null });
      }
    }
  },
  saveItem: async (workoutToSave: IWorkoutEditDTO) => {
    const currentId = workoutToSave.id;
    try {
      set({ isLoading: true, isSavingId: workoutToSave.id });
      const savedWorkout = await workoutService.save(workoutToSave);
      if (savedWorkout) {
        set((state) => {
          const idx = state.items.findIndex((w) => w.id === savedWorkout.id);
          if (idx === -1) {
            return { items: [...state.items, savedWorkout] };
          }
          return {
            items: state.items.map((w) =>
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
  deleteItem: async (id: string) => {
    try {
      set({ isDeleting: true });
      await workoutService.delete(id);
      set((state) => ({
        items: state.items.filter((w) => w.id !== id),
      }));
    } finally {
      set({ isDeleting: false });
    }
  },
}));
