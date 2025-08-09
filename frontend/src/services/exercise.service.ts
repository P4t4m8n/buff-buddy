import { ClientError } from "./ClientError.service";
import { appUtil } from "../utils/app.util";
import { apiService } from "./api.service";
import {
  CreateExerciseSchema,
  UpdateExerciseSchema,
} from "../validations/exercise.validation";

import type {
  IExerciseDTO,
  IExerciseFilter,
} from "../../../shared/models/exercise.model";
import type { THttpPostResponse } from "../models/apiService.model";

export const exerciseService = {
  rootPath: "/exercises",

  async get(filter?: IExerciseFilter): Promise<Array<IExerciseDTO>> {
    const queryParams = buildQueryParams(filter);
    return await apiService.get<Array<IExerciseDTO>>(
      `${this.rootPath}/${queryParams}`,
      filter
    );
  },

  async getById(id: string) {
    return await apiService.get<IExerciseDTO>(`${this.rootPath}/${id}`);
  },

  async save(dto: IExerciseDTO): Promise<THttpPostResponse<IExerciseDTO>> {
    if (!dto) throw ClientError.create("Exercise data is required", 400);

    if (!dto.id || dto.id.startsWith("temp")) {
      const validatedDTO = CreateExerciseSchema.parse(dto);
      return await apiService.post<THttpPostResponse<IExerciseDTO>>(
        `${this.rootPath}/edit`,
        validatedDTO
      );
    }

    const validatedDTO = UpdateExerciseSchema.parse(dto);
    return await apiService.put<THttpPostResponse<IExerciseDTO>>(
      `${this.rootPath}/edit/${dto.id}`,
      validatedDTO
    );
  },

  async delete(id: string): Promise<void> {
    return await apiService.delete<void>(`${this.rootPath}/${id}`);
  },

  getEmpty(): IExerciseDTO {
    return {
      id: appUtil.getTempId(),
      name: "",
      youtubeUrl: "",
      muscles: [],
      equipment: [],
      type: null,
    };
  },
};

const buildQueryParams = (filter?: IExerciseFilter): string => {
  const queryParams = new URLSearchParams();
  if (filter?.name) queryParams.append("name", filter?.name);
  if (filter?.types && filter?.types.length > 0)
    queryParams.append("types", filter?.types.join(","));
  if (filter?.equipment && filter?.equipment.length > 0)
    queryParams.append("equipment", filter?.equipment.join(","));
  if (filter?.muscles && filter?.muscles.length > 0)
    queryParams.append("muscles", filter?.muscles.join(","));
  if (filter?.skip) queryParams.append("skip", filter?.skip.toString());
  if (filter?.take) queryParams.append("take", filter?.take.toString());

  return queryParams.toString();
};
