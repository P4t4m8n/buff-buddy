import type {
  IUserWorkoutDTO,
  IUserWorkoutEditDTO,
} from "../../../shared/models/userWorkout";
import type { THttpPostResponse } from "../models/apiService.model";
import { userWorkoutValidation } from "../../../shared/validations/userWorkout.validations";
import { apiService } from "./api.service";

export const workoutStartService = {
  rootPath: "/user-workouts",

  async save(
    dto?: IUserWorkoutEditDTO|null
  ): Promise<THttpPostResponse<IUserWorkoutDTO>> {
    const validatedDTO = userWorkoutValidation
      .createUserWorkoutFactorySchema({ toSanitize: false })
      .parse(dto);
      

    return await apiService.post<THttpPostResponse<IUserWorkoutDTO>>(
      `${this.rootPath}`,
      validatedDTO
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
