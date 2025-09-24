import type {
  IUserWorkoutDTO,
  IUserWorkoutEditDTO,
} from "../../../shared/models/userWorkout";
import type { THttpResponse } from "../models/apiService.model";
import { userWorkoutValidation } from "../../../shared/validations/userWorkout.validations";
import { apiService } from "./api.service";

const ROOT_PATH = "/user-workouts";

const save = async (
  dto?: IUserWorkoutEditDTO | null
): Promise<THttpResponse<IUserWorkoutDTO>> => {
  const validatedDTO = userWorkoutValidation
    .createFactorySchema({ toSanitize: false })
    .parse(dto);

  return await apiService.post<THttpResponse<IUserWorkoutDTO>>(
    `${ROOT_PATH}`,
    validatedDTO
  );
};
export const userWorkoutService = {
  save,
};
