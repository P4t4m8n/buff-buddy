import type {
  IWorkoutEditDTO,
  IWorkoutFilter,
  IWorkoutDTO,
} from "../../../shared/models/workout.model";
import type { THttpPostResponse } from "../models/apiService.model";
import { workoutValidation } from "../../../shared/validations/workout.validations";
import { apiService } from "./api.service";

export const workoutService = {
  rootPath: "/workouts",
  async get(filter?: IWorkoutFilter): Promise<IWorkoutDTO[]> {
    return await apiService.get<IWorkoutDTO[]>(`${this.rootPath}`, filter);
  },

  async getById(id: string): Promise<IWorkoutDTO> {
    return await apiService.get<IWorkoutDTO>(`${this.rootPath}/${id}`);
  },

  async save(dto: IWorkoutEditDTO): Promise<IWorkoutDTO> {
    if (!dto) throw new Error("Workout data is required");

    const { id } = dto;

    if (!id || id.startsWith("temp/")) {
      const validatedDTO = workoutValidation
        .createWorkoutFactorySchema({ toSanitize: false })
        .parse(dto);

      const { data } = await apiService.post<THttpPostResponse<IWorkoutDTO>>(
        `${this.rootPath}/edit`,
        validatedDTO
      );
      return data;
    }

    const validatedDTO = workoutValidation
      .updateWorkoutFactorySchema({ toSanitize: false })
      .parse(dto);

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
