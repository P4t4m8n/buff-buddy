import type {
  IAuthSignInDTO,
  IAuthUserDTO,
  IAuthSignUpDTO,
} from "../../../shared/models/auth.model";
import type { THttpPostResponse } from "../models/apiService.model";
import { SignInSchema } from "../validations/auth.validation";
import { apiService } from "./api.service";

export const authService = {
  rootPath: "/auth",

  async signIn(dto: IAuthSignInDTO): Promise<IAuthUserDTO> {
    const validatedDTp = SignInSchema.parse(dto);
    return await apiService.post<IAuthUserDTO>(`${this.rootPath}/sign-in`, validatedDTp);
  },

  async signUp(dto: IAuthSignUpDTO): Promise<IAuthUserDTO> {
    const
    return await apiService.post<IAuthUserDTO>(`${this.rootPath}/sign-up`, dto);
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
