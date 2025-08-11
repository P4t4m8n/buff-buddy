import type {
  IWorkoutEditDTO,
  IWorkoutFilter,
  IWorkoutDTO,
} from "../../../shared/models/workout.model";
import type { THttpPostResponse } from "../models/apiService.model";
import {
  CreateWorkoutSchema,
  UpdateWorkoutSchema,
} from "../validations/workout.validation";
import { apiService } from "./api.service";

export const workoutService = {
  rootPath: "/workouts",
  async get(filter: IWorkoutFilter): Promise<IWorkoutDTO[]> {
    const queryParams = buildQueryParams(filter);
    return await apiService.get<IWorkoutDTO[]>(
      `${this.rootPath}?${queryParams.toString()}`
    );
  },

  async getById(id: string): Promise<IWorkoutDTO> {
    return await apiService.get<IWorkoutDTO>(`${this.rootPath}/${id}`);
  },

  async save(dto: IWorkoutEditDTO): Promise<IWorkoutDTO> {
    if (!dto) throw new Error("Workout data is required");

    const { id } = dto;
    if (!id || id.startsWith("temp/")) {
      const validatedDTO = CreateWorkoutSchema.parse(dto);
      const { data } = await apiService.post<THttpPostResponse<IWorkoutDTO>>(
        `${this.rootPath}/edit`,
        validatedDTO
      );
      return data;
    }

    const validatedDTO = UpdateWorkoutSchema.parse(dto);
    const { data } = await apiService.put<THttpPostResponse<IWorkoutDTO>>(
      `${this.rootPath}/edit/${dto.id}`,
      validatedDTO
    );
    return data;
  },

  async delete(id: string): Promise<void> {
    return await apiService.delete<void>(`${this.rootPath}/${id}`);
  },
};

const buildQueryParams = (filter?: IWorkoutFilter): string => {
  if (!filter) return "";

  const params = new URLSearchParams();
  if (filter.programId) params.append("programId", filter.programId);
  if (filter.dayOfWeek) params.append("dayOfWeek", filter.dayOfWeek);
  if (filter.exerciseId) params.append("exerciseId", filter.exerciseId);
  if (filter.isCompleted !== undefined)
    params.append("isCompleted", String(filter.isCompleted));

  return params.toString() ? `?${params.toString()}` : "";
};
