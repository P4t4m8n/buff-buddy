import type {
  IFoodItemDTO,
  IFoodItemEditDTO,
  IFoodItemFilter,
} from "../../../shared/models/foodItem.model";

import { foodItemValidation } from "../../../shared/validations/foodItem.validation";
import type { THttpResponse } from "../models/apiService.model";
import { apiService } from "./api.service";
import { ClientError } from "./ClientError.service";

const BASE_URL = "/food-items";

const get = async (filter?: IFoodItemFilter | null) => {
  const validateFilter = foodItemValidation.QuerySchema.parse(filter);
  return await apiService.get<IFoodItemDTO[]>(`${BASE_URL}`, validateFilter);
};

const getById = async (id?: string) => {
  const { data } = await apiService.get<THttpResponse<IFoodItemDTO>>(
    `${BASE_URL}/${id}`
  );
  return data;
};

const save = async (
  dto?: IFoodItemEditDTO
): Promise<THttpResponse<IFoodItemDTO>> => {
  if (!dto) throw ClientError.create("Food item data is required", 400);

  if (!dto?.id || dto.id.startsWith("temp")) {
    const validateDto = foodItemValidation
      .createFactorySchema({ toSanitize: false })
      .parse(dto);
    return await apiService.post<THttpResponse<IFoodItemDTO>>(
      `${BASE_URL}/edit`,
      validateDto
    );
  }
  const validateDto = foodItemValidation
    .updateFactorySchema({ toSanitize: false })
    .parse(dto);
  return await apiService.put<THttpResponse<IFoodItemDTO>>(
    `${BASE_URL}/edit/${dto.id}`,
    validateDto
  );
};

export const foodItemService = {
  get,
  getById,
  save,
};
