import { create } from "zustand";
import { programService } from "../services/program.service";
import type { IProgramDTO, IProgramEditDTO } from "../models/program.model";
import { ApiError } from "../utils/ApiError.util";

interface IProgramStore {
  programs: IProgramDTO[];
  isLoading: boolean;
  loadPrograms: () => Promise<void>;
  getProgramById: (
    id?: string
  ) => Promise<IProgramDTO | IProgramEditDTO | null>;
  saveProgram: (programToSave: IProgramEditDTO) => Promise<IProgramDTO | null>;
  deleteProgram: (id: string) => Promise<void>;
  error: { errors?: Record<string, string>; message: string } | null;
}

export const useProgramStore = create<IProgramStore>((set, get) => ({
  programs: [],
  isLoading: false,
  error: null,

  loadPrograms: async () => {
    try {
      set({ isLoading: true, error: null });

      if (get().programs.length > 0) {
        return;
      }

      const _programs = await programService.get({});
      set({ programs: _programs, isLoading: false });
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

  getProgramById: async (id?: string) => {
    try {
      if (!id) {
        return null;
      }
      set({ isLoading: true, error: null });

      const program = get().programs.find((p) => p.id === id);
      return !program ? await programService.getById(id) : program;
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

  saveProgram: async (programToSave: IProgramEditDTO) => {
    try {
      set({ isLoading: true, error: null });
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

  deleteProgram: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      await programService.delete(id);
      set((state) => ({
        programs: state.programs.filter((program) => program.id !== id),
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
