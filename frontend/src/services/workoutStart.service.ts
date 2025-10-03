import type { IUserWorkoutEditDTO } from "../../../shared/models/userWorkout";
import type { THttpResponse } from "../models/apiService.model";
import { apiService } from "./api.service";
import { ClientError } from "./ClientError.service";

const ROOT_PATH = "/workout-start";

const getWorkoutStart = async (
  workoutId?: string
): Promise<THttpResponse<IUserWorkoutEditDTO>> => {
  if (!workoutId) {
    throw ClientError.create("Invalid ID");
  }
  return await apiService.get<IUserWorkoutEditDTO>(`${ROOT_PATH}/${workoutId}`);
};

export const workoutStartService = { getWorkoutStart };
