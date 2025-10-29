import { ClientError } from "./ClientError.service";
import { apiService } from "./api.service";

import type { IValidation } from "../../../shared/models/validation.model";
import type { THttpResponse } from "../models/apiService.model";
import type { IID } from "../../../shared/models/entity.model";

export const genericServiceFactory = <
  DTO extends IID,
  EditDTO extends IID,
  Filter,
  CreateValidatedInput,
  UpdateValidatedInput,
  Schema
>({
  rootPath,
  validation,
}: {
  rootPath: string;
  validation: IValidation<
    EditDTO,
    Filter,
    CreateValidatedInput,
    UpdateValidatedInput,
    Schema
  >;
}) => {
  return {
    get: async (filter?: Filter | null): Promise<THttpResponse<Array<DTO>>> => {
      return await apiService.get<Array<DTO>>(`${rootPath}`, filter);
    },

    getById: async (id?: string): Promise<THttpResponse<DTO | null>> => {
      return await apiService.get<DTO | null>(`${rootPath}/${id}`);
    },

    save: async (dto?: EditDTO|null): Promise<THttpResponse<DTO>> => {
      if (!dto) throw ClientError.create("Data is required", 404);

      const { id } = dto;

      if (!id || id.startsWith("temp/")) {
        const validatedDTO = validation
          .createFactorySchema({ toSanitize: false })
          .parse(dto);

        return await apiService.post<DTO>(`${rootPath}/edit`, validatedDTO);
      }

      const validatedDTO = validation
        .updateFactorySchema({ toSanitize: false })
        .parse(dto);

      return await apiService.put<DTO>(
        `${rootPath}/edit/${dto.id}`,
        validatedDTO
      );
    },

    remove: async (id?: string): Promise<THttpResponse<void>> => {
      return await apiService.delete<void>(`${rootPath}/${id}`);
    },
  };
};
