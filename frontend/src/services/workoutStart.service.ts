import type { IUserWorkoutEditDTO } from "../../../shared/models/userWorkout";
import type { THttpResponse } from "../models/apiService.model";
import { apiService } from "./api.service";
import { ClientError } from "./ClientError.service";

const ROOT_PATH = "/workout-start";

const getWorkoutStart = async (
  workoutId?: string
): Promise<IUserWorkoutEditDTO> => {

    if(!workoutId){
        throw ClientError.create("Invalid ID")
    }
  const { data } = await apiService.get<THttpResponse<IUserWorkoutEditDTO>>(
    `${ROOT_PATH}/${workoutId}`
  );

  return data;
};

export const workoutStartService = { getWorkoutStart };
