import type {
  IExerciseDTO,
  IExerciseFilter,
} from "../../../shared/models/exercise.model";
import { appUtil } from "../utils/app.util";
import { apiService, type THttpPostResponse } from "./api.service";

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

const buildQueryParams = (filter: IExerciseFilter): string => {
  const queryParams = new URLSearchParams();
  if (filter.name) queryParams.append("name", filter.name);
  if (filter.types && filter.types.length > 0)
    queryParams.append("types", filter.types.join(","));
  if (filter.equipment && filter.equipment.length > 0)
    queryParams.append("equipment", filter.equipment.join(","));
  if (filter.muscles && filter.muscles.length > 0)
    queryParams.append("muscles", filter.muscles.join(","));
  if (filter.skip) queryParams.append("skip", filter.skip.toString());
  if (filter.take) queryParams.append("take", filter.take.toString());

  return queryParams.toString();
};
