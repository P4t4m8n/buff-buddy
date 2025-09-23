import { programValidation } from "../../../shared/validations/program.validations";

import { apiService } from "./api.service";
import { ClientError } from "./ClientError.service";

import type {
  IProgramDTO,
  IProgramFilter,
  IProgramEditDTO,
} from "../../../shared/models/program.model";
import type { THttpResponse } from "../models/apiService.model";

const ROOT_PATH = "/programs";

const get = async (filter: IProgramFilter|null): Promise<Array<IProgramDTO>> => {
  const { data } = await apiService.get<THttpResponse<Array<IProgramDTO>>>(
    ROOT_PATH,
    filter
  );

  return data;
};

const getById = async (
  id?: string
): Promise<THttpResponse<IProgramDTO | null>> => {
  return await apiService.get<THttpResponse<IProgramDTO | null>>(
    `${ROOT_PATH}/${id}`
  );
};

const save = async (
  dto: IProgramEditDTO
): Promise<THttpResponse<IProgramDTO>> => {
  if (!dto) throw ClientError.create("Program data is required", 400);
  const { id } = dto;

  if (!id || id.startsWith("temp")) {
    const validatedDTO = programValidation
      .createProgramFactorySchema({ toSanitize: false })
      .parse(dto);
    return await apiService.post<THttpResponse<IProgramDTO>>(
      `${ROOT_PATH}/edit`,
      validatedDTO
    );
  }
  const validatedDTO = programValidation
    .updateProgramFactorySchema({ toSanitize: false })
    .parse(dto);
  return await apiService.put<THttpResponse<IProgramDTO>>(
    `${ROOT_PATH}/edit/${dto.id}`,
    validatedDTO
  );
};

const remove = async (id: string): Promise<void> => {
  return await apiService.delete(`${ROOT_PATH}/${id}`);
};
export const programService = { get, getById, save, remove };
