import type {
  IUserWorkoutDTO,
  IUserWorkoutEditDTO,
} from "../../../shared/models/userWorkout";
import type { THttpPostResponse } from "../models/apiService.model";
import { CreateUserWorkoutSchema } from "../validations/userWorkout.validation";
import { apiService } from "./api.service";

export const workoutStartService = {
  rootPath: "/user-workouts",

  async save(
    dto: IUserWorkoutEditDTO
  ): Promise<THttpPostResponse<IUserWorkoutDTO>> {
    console.log("🚀 ~ save ~ dto:", dto)

    const validatedDTO = CreateUserWorkoutSchema.parse(dto);
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
