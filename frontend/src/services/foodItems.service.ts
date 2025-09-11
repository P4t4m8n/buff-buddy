import type {
  IFoodItemDto,
  IFoodItemEditDto,
  IFoodItemFilter,
} from "../../../shared/models/foodItem.model";

import { foodItemValidation } from "../../../shared/validations/foodItem.validation";
import type { THttpResponse } from "../models/apiService.model";
import { apiService } from "./api.service";
import { ClientError } from "./ClientError.service";

const BASE_URL = "/food-items";

const get = async (filter?: IFoodItemFilter | null) => {
  const validateFilter = foodItemValidation.FoodItemQuerySchema.parse(filter);
  return await apiService.get<IFoodItemDto[]>(`${BASE_URL}`, validateFilter);
};

const getById = async (id?: string) => {
  const { data } = await apiService.get<THttpResponse<IFoodItemDto>>(
    `${BASE_URL}/${id}`
  );
  return data;
};

const save = async (
  dto?: IFoodItemEditDto
): Promise<THttpResponse<IFoodItemDto>> => {
  if (!dto) throw ClientError.create("Food item data is required", 400);

  if (!dto?.id || dto.id.startsWith("temp")) {
    const validateDto = foodItemValidation
      .createFoodItemFactorySchema({ toSanitize: false })
      .parse(dto);
    return await apiService.post<THttpResponse<IFoodItemDto>>(
      `${BASE_URL}/edit`,
      validateDto
    );
  }
  const validateDto = foodItemValidation
    .updateFoodItemFactorySchema({ toSanitize: false })
    .parse(dto);
  return await apiService.put<THttpResponse<IFoodItemDto>>(
    `${BASE_URL}/edit/${dto.id}`,
    validateDto
  );
};

export const foodItemService = {
  get,
  getById,
  save,
};
