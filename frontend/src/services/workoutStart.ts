import type {
  IUserWorkoutDTO,
  IUserWorkoutEditDTO,
} from "../../../shared/models/userWorkout";
import { apiService, type THttpPostResponse } from "./api.service";

export const workoutStartService = {
  rootPath: "/user-workouts",

  async save(
    workoutStart: IUserWorkoutEditDTO
  ): Promise<THttpPostResponse<IUserWorkoutDTO>> {
    return await apiService.post<THttpPostResponse<IUserWorkoutDTO>>(
      `${this.rootPath}`,
      workoutStart
    );
  },
  async getLastWorkout(
    workoutId?: string
  ): Promise<THttpPostResponse<IUserWorkoutDTO | null>> {
    return await apiService.get<THttpPostResponse<IUserWorkoutDTO | null>>(
      `${this.rootPath}/${workoutId}/last/`
    );
  },
};
