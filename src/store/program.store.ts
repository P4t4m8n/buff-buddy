import { create } from "zustand";
import { programService } from "../services/program.service";
import type { IProgramDTO, IProgramEditDTO } from "../models/program.model";

interface IProgramStore {
  programs: IProgramDTO[];
  isLoading: boolean;
  loadPrograms: () => Promise<void>;
  getProgramById: (
    id?: string
  ) => Promise<IProgramDTO | IProgramEditDTO | null>;
  saveProgram: (programToSave: IProgramEditDTO) => Promise<void>;
  deleteProgram: (id: string) => Promise<void>;
  error: string | null;
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
          error instanceof Error ? error.message : "Failed to load programs",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  getProgramById: async (id?: string) => {
    try {
      set({ isLoading: true, error: null });
      const x = id ? await programService.getById(id) : programService.getEmpty();
      console.log(" getProgramById: ~  x:",  x)
      return x
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to load program",
      });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  saveProgram: async (programToSave: IProgramEditDTO) => {
    try {
      console.log(" saveProgram: ~ programToSave:", programToSave)
      set({ isLoading: true, error: null });
      const savedProgram = await programService.save(
        programToSave as IProgramEditDTO
      );
      set((state) => {
        const idx = state.programs.findIndex(
          (program) => program.id === savedProgram.id
        );

        if (idx !== -1) {
          const updatedPrograms = [...state.programs];
          updatedPrograms[idx] = savedProgram as IProgramDTO;
          return { programs: updatedPrograms };
        } else {
          return { programs: [...state.programs, savedProgram as IProgramDTO] };
        }
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to save program",
      });
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
          error instanceof Error ? error.message : "Failed to delete program",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
