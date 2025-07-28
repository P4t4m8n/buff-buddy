import type { IUserWorkoutDTO } from "../../../shared/models/workoutStart.model";
import { apiService, type THttpPostResponse } from "./api.service";

export const workoutStartService = {
  rootPath: "/user-workouts",

  async save(
    workoutStart: IUserWorkoutDTO
  ): Promise<THttpPostResponse<IUserWorkoutDTO>> {
    return await apiService.post<THttpPostResponse<IUserWorkoutDTO>>(
      `${this.rootPath}`,
      workoutStart
    );
  },
};
