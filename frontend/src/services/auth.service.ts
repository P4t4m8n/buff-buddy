import { apiService } from "./api.service";
import { authValidation } from "../../../shared/validations/auth.validation";

import type {
  TSignUpInput,
  TSignInInput,
} from "../../../shared/validations/auth.validation";
import type { THttpResponse } from "../models/apiService.model";
import type { IUserDTO } from "../../../shared/models/user.model";

const ROOT_PATH = "/auth" as const;

const signIn = async (dto: TSignInInput): Promise<THttpResponse<IUserDTO>> => {
  const validatedDTO = authValidation
    .signInFactorySchema({ toSanitize: false })
    .parse(dto);
  return await apiService.post<THttpResponse<IUserDTO>>(
    `${ROOT_PATH}/sign-in`,
    validatedDTO
  );
};

const signUp = async (dto: TSignUpInput): Promise<THttpResponse<IUserDTO>> => {
  const validatedDTO = authValidation
    .signUpFactorySchema({ toSanitize: false })
    .parse(dto);
  return await apiService.post<THttpResponse<IUserDTO>>(
    `${ROOT_PATH}/sign-up`,
    validatedDTO
  );
};

const signOut = async (): Promise<void> => {
  await apiService.post<void>(`${ROOT_PATH}/sign-out`);
};

const getSessionUser = async (): Promise<THttpResponse<IUserDTO | null>> => {
  return await apiService.get<THttpResponse<IUserDTO | null>>(
    `${ROOT_PATH}/session-user`
  );
};

export const authService = {
  signIn,
  signUp,
  signOut,
  getSessionUser,
};
