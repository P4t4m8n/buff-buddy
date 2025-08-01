import type {
  IExerciseDTO,
  IExerciseFilter,
} from "../../../shared/models/exercise.model";
import { appUtil } from "../utils/app.util";
import { apiService, type THttpPostResponse } from "./api.service";

export const exerciseService = {
  rootPath: "/exercises",

  async get(filter: IExerciseFilter): Promise<Array<IExerciseDTO>> {
    return await apiService.get<Array<IExerciseDTO>>(
      `${this.rootPath}`,
      filter
    );
  },

  async getById(id: string) {
    return await apiService.get<IExerciseDTO>(`${this.rootPath}/${id}`);
  },

  async save(dto: IExerciseDTO): Promise<THttpPostResponse<IExerciseDTO>> {
    return dto.id
      ? await apiService.put<THttpPostResponse<IExerciseDTO>>(
          `${this.rootPath}/edit/${dto.id}`,
          dto
        )
      : await apiService.post<THttpPostResponse<IExerciseDTO>>(
          `${this.rootPath}/edit`,
          dto
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

