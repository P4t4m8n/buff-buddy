//Service
import { apiService } from "./api.service";
//Types
import type {
  IEquipmentDTO,
  IEquipmentFilter,
} from "../../../shared/models/equipment.model";
import type { THttpResponse } from "../models/apiService.model";

const ROOT_PATH = "/exercises/equipments/list" as const;
const get = async (
  filter?: IEquipmentFilter | null
): Promise<THttpResponse<Array<IEquipmentDTO>>> => {
  return await apiService.get<Array<IEquipmentDTO>>(`${ROOT_PATH}`, filter);
};

export const equipmentService = {
  get,
};
