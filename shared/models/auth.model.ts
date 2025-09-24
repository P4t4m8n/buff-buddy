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
