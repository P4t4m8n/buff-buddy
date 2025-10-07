//Service
import { apiService } from "./api.service";
//Types
import type {
  IMuscleDTO,
  IMuscleFilter,
} from "../../../shared/models/muscle.model";
import type { THttpResponse } from "../models/apiService.model";

const ROOT_PATH = "/exercises/muscles/list" as const;
const get = async (
  filter?: IMuscleFilter | null
): Promise<THttpResponse<Array<IMuscleDTO>>> => {
  return await apiService.get<Array<IMuscleDTO>>(`${ROOT_PATH}`, filter);
};

export const muscleService = {
  get,
};
