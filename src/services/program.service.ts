import type {
  IProgramDTO,
  IProgramFilter,
  IProgramEditDTO,
} from "../models/program.model";
import type {
  IProgramExerciseEditDTO,
  TCrudOperation,
} from "../models/programExercise.model";
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
      dateRange: { start: null, end: null },
      isActive: false,
      programExercises: [],
    };
  },
};

const handleProgramExercise = async (
  programExercises: IProgramExerciseEditDTO[]
) => {
  const record: Record<TCrudOperation, IProgramExerciseEditDTO[]> = {
    create: [],
    update: [],
    delete: [],
    read: [],
  };

  programExercises.forEach((pe) => {
    if (pe.crudOperation === "create") {
      record.create.push(pe);
    } else if (pe.crudOperation === "update") {
      record.update.push(pe);
    } else if (pe.crudOperation === "delete") {
      record.delete.push(pe);
    } else {
      record.read.push(pe);
    }
  });

  if (record.create.length) {
   for(const pe of record.create) {}
  }
};
