import { apiService } from "./api.service";

import { workoutValidation } from "../../../shared/validations/workout.validations";

import type {
  IWorkoutEditDTO,
  IWorkoutFilter,
  IWorkoutDTO,
} from "../../../shared/models/workout.model";
import type { THttpResponse } from "../models/apiService.model";

const ROOT_PATH = "/workouts";
const get = async (filter?: IWorkoutFilter | null): Promise<IWorkoutDTO[]> => {
  return await apiService.get<IWorkoutDTO[]>(`${ROOT_PATH}`, filter);
};

const getById = async (
  id?: string
): Promise<THttpResponse<IWorkoutDTO | null>> => {
  return await apiService.get<THttpResponse<IWorkoutDTO | null>>(
    `${ROOT_PATH}/${id}`
  );
};

const save = async (dto: IWorkoutEditDTO): Promise<IWorkoutDTO> => {
  if (!dto) throw new Error("Workout data is required");

  const { id } = dto;

  if (!id || id.startsWith("temp/")) {
    const validatedDTO = workoutValidation
      .createFactorySchema({ toSanitize: false })
      .parse(dto);

    const { data } = await apiService.post<THttpResponse<IWorkoutDTO>>(
      `${ROOT_PATH}/edit`,
      validatedDTO
    );
    return data;
  }

  const validatedDTO = workoutValidation
    .updateFactorySchema({ toSanitize: false })
    .parse(dto);

  const { data } = await apiService.put<THttpResponse<IWorkoutDTO>>(
    `${ROOT_PATH}/edit/${dto.id}`,
    validatedDTO
  );
  return data;
};

const remove = async (id: string): Promise<void> => {
  return await apiService.delete<void>(`${ROOT_PATH}/${id}`);
};
export const workoutService = {
  get,
  getById,
  save,
  remove,
};
