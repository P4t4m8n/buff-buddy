import { create } from "zustand";
import { programService } from "../services/program.service";
import type {
  IProgramDTO,
  IProgramEditDTO,
} from "../../../shared/models/program.model";

interface IProgramStore {
  programs: IProgramDTO[];
  isLoading: boolean;
  isDeleting: boolean;
  isSavingId: string | null;
  isLoadingId: string | null;
  loadPrograms: () => Promise<void>;
  getProgramById: (id?: string) => Promise<IProgramDTO | null>;
  saveProgram: (programToSave: IProgramEditDTO) => Promise<IProgramDTO | null>;
  deleteProgram: (id: string) => Promise<void>;
}

export const useProgramStore = create<IProgramStore>((set, get) => ({
  programs: [],
  isLoading: false,
  isDeleting: false,
  isLoadingId: null,
  isSavingId: null,

  loadPrograms: async () => {
    try {
      set({ isLoading: true });

      if (get().programs.length > 0) {
        return;
      }

      const _programs = await programService.get({});
      set({ programs: _programs, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  getProgramById: async (id?: string) => {
    try {
      if (!id) {
        return null;
      }
      set({ isLoadingId: id });

      const program = get().programs.find((p) => p.id === id);
      return !program ? await programService.getById(id) : program;
    } finally {
      set({ isLoading: false });
    }
  },

  saveProgram: async (programToSave: IProgramEditDTO) => {
    try {
      set({ isLoading: true });
      const { data } = await programService.save(
        programToSave as IProgramEditDTO
      );
      set((state) => {
        const idx = state.programs.findIndex(
          (program) => program.id === data.id
        );

        if (idx !== -1) {
          const updatedPrograms = [...state.programs];
          updatedPrograms[idx] = data as IProgramDTO;
          return { programs: updatedPrograms };
        } else {
          return { programs: [...state.programs, data as IProgramDTO] };
        }
      });
      return data;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteProgram: async (id: string) => {
    try {
      set({ isDeleting: true });
      await programService.delete(id);
      set((state) => ({
        programs: state.programs.filter((program) => program.id !== id),
      }));
    } finally {
      set({ isDeleting: false });
    }
  },
}));
