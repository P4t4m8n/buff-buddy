import type {
  IWorkoutEditDTO,
  IWorkoutFilter,
  IWorkoutDTO,
} from "../models/workout.model";
import { apiService, type THttpPostResponse } from "./api.service";

export const workoutService = {
  rootPath: "/workouts",
  //TODO?? build a general queryParams builder for filters
  async get(filter: IWorkoutFilter): Promise<IWorkoutDTO[]> {
    const queryParams = new URLSearchParams();
    if (filter.programId) queryParams.append("programId", filter.programId);
    if (filter.dayOfWeek) queryParams.append("dayOfWeek", filter.dayOfWeek);
    if (filter.exerciseId) queryParams.append("exerciseId", filter.exerciseId);
    if (filter.isCompleted !== undefined)
      queryParams.append("isCompleted", String(filter.isCompleted));

    return await apiService.get<IWorkoutDTO[]>(
      `${this.rootPath}?${queryParams.toString()}`
    );
  },

  async getById(id: string): Promise<IWorkoutDTO> {
    return await apiService.get<IWorkoutDTO>(`${this.rootPath}/${id}`);
  },

  async save(dto: IWorkoutEditDTO): Promise<IWorkoutDTO> {
    const { data } =
      !dto.id || !dto.id?.startsWith("temp/")
        ? await apiService.put<THttpPostResponse<IWorkoutDTO>>(
            `${this.rootPath}/edit/${dto.id}`,
            dto
          )
        : await apiService.post<THttpPostResponse<IWorkoutDTO>>(
            `${this.rootPath}/edit`,
            dto
          );

    return data;
  },
  async delete(id: string): Promise<void> {
    return await apiService.delete<void>(`${this.rootPath}/${id}`);
  },
};
