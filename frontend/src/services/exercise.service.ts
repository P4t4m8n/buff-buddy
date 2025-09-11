import { ClientError } from "./ClientError.service";
import { appUtil } from "../utils/app.util";
import { apiService } from "./api.service";
import { exerciseValidation } from "../../../shared/validations/exercise.validation";

import type {
  IExerciseDTO,
  IExerciseFilter,
} from "../../../shared/models/exercise.model";
import type { THttpResponse } from "../models/apiService.model";

export const exerciseService = {
  rootPath: "/exercises",

  async get(filter?: IExerciseFilter): Promise<Array<IExerciseDTO>> {
    return await apiService.get<Array<IExerciseDTO>>(
      `${this.rootPath}`,
      filter
    );
  },

  async getById(id: string) {
    return await apiService.get<IExerciseDTO>(`${this.rootPath}/${id}`);
  },

  async save(dto: IExerciseDTO): Promise<THttpResponse<IExerciseDTO>> {
    if (!dto) throw ClientError.create("Exercise data is required", 400);

    if (!dto.id || dto.id.startsWith("temp")) {
      const validatedDTO = exerciseValidation
        .createExerciseFactorySchema({
          toSanitize: false,
        })
        .parse(dto);
      return await apiService.post<THttpResponse<IExerciseDTO>>(
        `${this.rootPath}/edit`,
        validatedDTO
      );
    }

    const validatedDTO = exerciseValidation
      .updateExerciseFactorySchema({
        toSanitize: false,
      })
      .parse(dto);
    return await apiService.put<THttpResponse<IExerciseDTO>>(
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
