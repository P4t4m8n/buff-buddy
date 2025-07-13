import type { IWorkoutEditDTO, IWorkoutFilter } from "../models/workout.model";
import { apiService } from "./api.service";

export const workoutService = {
  rootPath: "/workouts",
  //TODO?? build a general queryParams builder for filters
  async get(filter: IWorkoutFilter): Promise<IWorkoutEditDTO[]> {
    const queryParams = new URLSearchParams();
    if (filter.programId) queryParams.append("programId", filter.programId);
    if (filter.dayOfWeek) queryParams.append("dayOfWeek", filter.dayOfWeek);
    if (filter.exerciseId) queryParams.append("exerciseId", filter.exerciseId);
    if (filter.isCompleted !== undefined)
      queryParams.append("isCompleted", String(filter.isCompleted));

    return await apiService.get<IWorkoutEditDTO[]>(
      `${this.rootPath}?${queryParams.toString()}`
    );
  },

  async getById(id: string): Promise<IWorkoutEditDTO> {
    return await apiService.get<IWorkoutEditDTO>(`${this.rootPath}/${id}`);
  },

  async save(dto: IWorkoutEditDTO): Promise<void> {
    console.log("🚀 ~ save ~ dto:", dto)
    const res =
      !dto.id || !dto.id?.startsWith("temp/")
        ? await apiService.put<void>(`${this.rootPath}/edit/${dto.id}`, dto)
        : await apiService.post<void>(`${this.rootPath}/edit`, dto);

    return res;
  },
  async delete(id: string): Promise<void> {
    return await apiService.delete<void>(`${this.rootPath}/${id}`);
  },
};
