import type {
  IProgramDTO,
  IProgramFilter,
  IProgramEditDTO,
} from "../../../shared/models/program.model";
import type { THttpPostResponse } from "../models/apiService.model";
import {
  CreateProgramSchema,
  UpdateProgramSchema,
} from "../validations/program.validation";

import { apiService } from "./api.service";
import { ClientError } from "./ClientError.service";

export const programService = {
  rootPath: "/programs",

  async get(filter: IProgramFilter): Promise<Array<IProgramDTO>> {
    return await apiService.get<Array<IProgramDTO>>(this.rootPath, filter);
  },

  async getById(id: string) {
    return await apiService.get<IProgramDTO>(`${this.rootPath}/${id}`);
  },

  async save(dto: IProgramEditDTO): Promise<THttpPostResponse<IProgramDTO>> {
    console.log("🚀 ~ save ~ dto:", dto)
    if (!dto) throw ClientError.create("Program data is required", 400);
    const { id } = dto;

    if (!id || id.startsWith("temp")) {
      const validatedDTO = CreateProgramSchema.parse(dto);
      return await apiService.post<THttpPostResponse<IProgramDTO>>(
        `${this.rootPath}/edit`,
        validatedDTO
      );
    }
    const validatedDTO = UpdateProgramSchema.parse(dto);
    return await apiService.put<THttpPostResponse<IProgramDTO>>(
      `${this.rootPath}/edit/${dto.id}`,
      validatedDTO
    );
  },

  async delete(id: string): Promise<void> {
    return await apiService.delete(`${this.rootPath}/${id}`);
  },
};
