import type { IAuthUserDTO } from "./auth.model";

export interface IUserDTO extends IAuthUserDTO {
  email?: string|null;
}
