import { create } from "zustand";
import { programService } from "../services/program.service";
import type {
  IProgramDTO,
  IProgramEditDTO,
  IProgramFilter,
} from "../../../shared/models/program.model";
import type { IStoreBase } from "../models/store.model";

export const useProgramStore = create<
  IStoreBase<IProgramDTO, IProgramEditDTO, IProgramFilter>
>((set, get) => ({
  items: [],
  isLoading: false,
  isDeleting: false,
  isLoadingId: null,
  isSavingId: null,

  loadItems: async () => {
    try {
      set({ isLoading: true });

      if (get().items.length > 0) {
        return;
      }

      const _programs = await programService.get({});
      set({ items: _programs, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  getById: async (id?: string) => {
    try {
      if (!id) {
        return null;
      }
      set({ isLoadingId: id });

      const program = get().items.find((p) => p.id === id);
      return !program ? await programService.getById(id) : program;
    } finally {
      set({ isLoading: false });
    }
  },

  saveItem: async (program: IProgramEditDTO) => {
    try {
      set({ isLoading: true });
      const { data } = await programService.save(program);
      set((state) => {
        const idx = state.items.findIndex((program) => program.id === data.id);

        if (idx !== -1) {
          const updatedPrograms = [...state.items];
          updatedPrograms[idx] = data as IProgramDTO;
          return { items: updatedPrograms };
        } else {
          return { items: [...state.items, data as IProgramDTO] };
        }
      });
      return data;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteItem: async (id: string) => {
    try {
      set({ isDeleting: true });
      await programService.delete(id);
      set((state) => ({
        items: state.items.filter((program) => program.id !== id),
      }));
    } finally {
      set({ isDeleting: false });
    }
  },
}));
