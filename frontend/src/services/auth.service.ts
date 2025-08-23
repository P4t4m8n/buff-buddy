import { apiService } from "./api.service";
import { authValidation } from "../../../shared/validations/auth.validation";

import type {
  TSignUpInput,
  TSignInInput,
} from "../../../shared/validations/auth.validation";
import type {
  IAuthUserDTO,
  IAuthSignUpDTO,
} from "../../../shared/models/auth.model";
import type { THttpPostResponse } from "../models/apiService.model";

export const authService = {
  rootPath: "/auth",

  async signIn(dto: TSignInInput): Promise<IAuthUserDTO> {
    const validatedDTO = authValidation
      .signInFactorySchema({ toSanitize: false })
      .parse(dto);
    return await apiService.post<IAuthUserDTO>(
      `${this.rootPath}/sign-in`,
      validatedDTO
    );
  },

  async signUp(dto: TSignUpInput): Promise<IAuthUserDTO> {
    const validatedDTO = authValidation
      .signUpFactorySchema({ toSanitize: false })
      .parse(dto);
    return await apiService.post<IAuthUserDTO>(
      `${this.rootPath}/sign-up`,
      validatedDTO
    );
  },

  async signOut(): Promise<void> {
    await apiService.post<void>(`${this.rootPath}/sign-out`);
  },

  async getSessionUser(): Promise<THttpPostResponse<IAuthUserDTO | null>> {
    return await apiService.get<THttpPostResponse<IAuthUserDTO | null>>(
      `${this.rootPath}/session-user`
    );
  },

  getEmptyUser(): IAuthSignUpDTO {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
};
