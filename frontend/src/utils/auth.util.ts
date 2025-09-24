import type { IAuthSignUpDTO } from "../../../shared/models/auth.model";

const getEmptyUser = (): IAuthSignUpDTO => {
  return {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
};

export const authUtil = {
  getEmptyUser,
};
