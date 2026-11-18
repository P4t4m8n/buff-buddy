import { apiService } from "./api.service";

import type {
  TSignUpInput,
  TSignInInput,
  TUpdateUserInput,
} from "../../../shared/validations/auth.validation";
import type { THttpResponse } from "../models/apiService.model";
import type { IUserDTO } from "../../../shared/models/user.model";

const ROOT_PATH = "/auth" as const;

const signIn = (dto: TSignInInput): Promise<THttpResponse<IUserDTO>> => {
  return apiService.post<IUserDTO>(`${ROOT_PATH}/sign-in`, dto);
};

const signUp = (dto: TSignUpInput): Promise<THttpResponse<IUserDTO>> => {
  return apiService.post<IUserDTO>(`${ROOT_PATH}/sign-up`, dto);
};

const signOut = (): Promise<THttpResponse<void>> => {
  return apiService.post<void>(`${ROOT_PATH}/sign-out`);
};

const getSessionUser = (): Promise<THttpResponse<IUserDTO | null>> => {
  return apiService.get<IUserDTO | null>(`${ROOT_PATH}/session-user`);
};

const updateUser = (dto: TUpdateUserInput): Promise<THttpResponse<IUserDTO>> => {
  return apiService.put<IUserDTO>(`${ROOT_PATH}/update-user`, dto);
};

export const authService = {
  signIn,
  signUp,
  signOut,
  getSessionUser,
  updateUser,
};
