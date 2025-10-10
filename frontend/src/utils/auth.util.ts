import type {
  IAuthSignInDTO,
  IAuthSignUpDTO,
} from "../../../shared/models/auth.model";

const getEmptySignUp = (): IAuthSignUpDTO => {
  return {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
};

const getEmptySignIn = (): IAuthSignInDTO => {
  return {
    email: "",
    password: "",
  };
};

export const authUtil = {
  getEmptySignUp,
  getEmptySignIn,
};
