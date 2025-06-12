import type {
  IProgramDTO,
  IProgramFilter,
  IProgramEditDTO,
} from "../models/program.model";
import { storageService } from "./async-storage.service";

export const programService = {
  rootPath: "/program",

  async get(filter: IProgramFilter): Promise<Array<IProgramDTO>> {
    return await storageService.get<IProgramDTO>("program", filter);
  },

  async getById(id: string) {
    return await storageService.getById<IProgramDTO>("program", id);
  },

  async save(dto: IProgramEditDTO): Promise<IProgramEditDTO> {
    return dto.id
      ? await storageService.put<IProgramEditDTO>("program", dto)
      : await storageService.post<IProgramEditDTO>("program", dto);
  },

  async delete(id: string): Promise<void> {
    return storageService.remove("program", id);
  },

  getEmpty(): IProgramEditDTO {
    return {
      id: "",
      name: "",
      note: "",
      startDate: new Date(),
      endDate: new Date(),
      isActive: false,
      programExercises: [],
      newProgramExercises: [],
      updateProgramExercises: [],
      deleteProgramExercises: [],
    };
  },
};
