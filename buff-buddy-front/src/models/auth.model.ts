import type { IEntity } from "./entity.model";

export interface IAuthSignInDTO {
  email: string;
  password: string;
}

export interface IAuthSignUpDTO {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  imgUrl?: string;
}

export interface IAuthUserDTO extends IEntity {
  firstName?: string;
  lastName?: string;
  imgUrl?: string;
}
