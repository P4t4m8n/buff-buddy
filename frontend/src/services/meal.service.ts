import type { IMealDTO, IMealEditDTO } from "../../../shared/models/meal.model";
import type { THttpResponse } from "../models/apiService.model";
import { apiService } from "./api.service";
import { ClientError } from "./ClientError.service";
import { mealValidation } from "../../../shared/validations//meal.validations";

const BASE_URL = "/meals";

const get = async () => {
  return await apiService.get<Array<IMealDTO>>(BASE_URL);
};
const getById = async (id?: string): Promise<IMealDTO> => {
  if (!id) throw ClientError.create("Meal ID is required", 400);

  const { data } = await apiService.get<THttpResponse<IMealDTO>>(
    `${BASE_URL}/${id}`
  );
  
  return data;
};
const save = async (dto: IMealEditDTO): Promise<THttpResponse<IMealDTO>> => {
  console.log("🚀 ~ save ~ dto:", dto);
  if (!dto) throw ClientError.create("Meal data is required", 400);
  const { id } = dto;

  if (!id || id.startsWith("temp")) {
    const validatedDTO = mealValidation
      .createMealFactorySchema({ toSanitize: false })
      .parse(dto);
    return await apiService.post<THttpResponse<IMealDTO>>(
      `${BASE_URL}/edit`,
      validatedDTO
    );
  }
  const validatedDTO = mealValidation
    .updateMealFactorySchema({ toSanitize: false })
    .parse(dto);
  return await apiService.put<THttpResponse<IMealDTO>>(
    `${BASE_URL}/edit/${dto.id}`,
    validatedDTO
  );
};
const remove = async (id: string) => {
  return await apiService.delete(`${BASE_URL}/edit/${id}`);
};

export const mealService = {
  get,
  getById,
  save,
  remove,
};
