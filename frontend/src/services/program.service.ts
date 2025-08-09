import type {
  IProgramDTO,
  IProgramFilter,
  IProgramEditDTO,
} from "../../../shared/models/program.model";
import type { THttpPostResponse } from "../models/apiService.model";

import { apiService } from "./api.service";

export const programService = {
  rootPath: "/programs",

  async get(filter: IProgramFilter): Promise<Array<IProgramDTO>> {
    return await apiService.get<Array<IProgramDTO>>(this.rootPath, filter);
  },

  async getById(id: string) {
    return await apiService.get<IProgramDTO>(`${this.rootPath}/${id}`);
  },

  async save(dto: IProgramEditDTO): Promise<THttpPostResponse<IProgramDTO>> {
    const res = dto.id
      ? await apiService.put<THttpPostResponse<IProgramDTO>>(
          `${this.rootPath}/edit/${dto.id}`,
          dto
        )
      : await apiService.post<THttpPostResponse<IProgramDTO>>(
          `${this.rootPath}/edit`,
          dto
        );

    return res;
  },

  async delete(id: string): Promise<void> {
    return await apiService.delete(`${this.rootPath}/${id}`);
  },
};
