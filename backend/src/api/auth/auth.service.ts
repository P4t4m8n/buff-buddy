//Lib
import { prisma } from "../../../prisma/prisma";
//Utils
import { authUtil } from "./auth.util";
//Services
import { AppError } from "../../shared/services/Error.service";
//SQL
import { authSQL } from "./auth.sql";
import { userSQL } from "../users/users.sql";
//Types
import type {
  TSignUpInput,
  TSignInInput,
  TGoogleOAuthInput,
} from "../../../../shared/validations/auth.validation";
import type { IUser } from "../users/users.model";
import type { TAuthRecordResponse } from "./auth.model";

const signUp = async (
  dto: TSignUpInput | TGoogleOAuthInput
): Promise<TAuthRecordResponse<IUser>> => {
  const authRecord = await authUtil.getAuthRecord({ dto });
  const data = authSQL.getAuthCreate(authRecord);
  const user = await prisma.user
    .create({
      data: data,
      select: userSQL.SMALL_USER_SELECT,
    })
    //INFO:Catch the record exist error here in case its in the email to prevent sensitive info to leak
    .catch((error) => {
      if ("meta" in error && error.meta?.target?.includes("email")) {
        throw AppError.create("Bad Request", 409);
      }
      throw error;
    });

  if (!user) {
    throw AppError.create("User creation failed", 500);
  }
  const token = authUtil.generateToken({ userId: user.id, isAdmin: false });
  return {
    user,
    token,
  };
};
const signIn = async (
  dto: TSignInInput | TGoogleOAuthInput
): Promise<TAuthRecordResponse<IUser>> => {
  const { email: signInEmail } = dto;

  const user = await prisma.user.findUnique({
    where: {
      email: signInEmail,
    },
    select: {
      ...userSQL.SMALL_USER_SELECT,
      ...authSQL.PASSWORD_AUTH_SELECT,
    },
  });

  if (!user) {
    throw AppError.create("Wrong credentials", 409);
  }

  const match = await authUtil.verifyCredentials({
    password: (dto as TSignInInput)?.password,
    passwordHash: user?.passwordHash,
    googleId: (dto as TGoogleOAuthInput)?.googleId,
    userGoogleId: user.googleId,
  });

  if (!match) {
    throw AppError.create("Wrong credentials", 409);
  }

  const token = authUtil.generateToken({ userId: user.id, isAdmin: false });
  const { lastName, firstName, id, email, imgUrl } = user;
  return {
    user: {
      id,
      firstName,
      lastName,
      email,
      imgUrl,
    },
    token,
  };
};

const signInWithGoogle = async (
  dto: TGoogleOAuthInput
): Promise<TAuthRecordResponse<IUser>> => {
  const { email, googleId } = dto;
  const authRecord = await authUtil.getAuthRecord({ dto });
  const data = authSQL.getAuthCreate(authRecord);

  const user = await prisma.user.upsert({
    where: { email: email },
    update: { googleId: googleId },
    create: data,
    select: userSQL.SMALL_USER_SELECT,
  });

  if (!user) {
    throw AppError.create("Google sign-in failed", 500);
  }

  const token = authUtil.generateToken({ userId: user.id, isAdmin: false });
  return {
    user,
    token,
  };
};
const validateToken = async (token: string) => {
  if (!token) {
    return null;
  }

  const decoded = authUtil.decodeToken({ token });

  return await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: userSQL.SMALL_USER_SELECT,
  });
};
const deleteUser = async (userId: string) => {
  await prisma.user.delete({
    where: { id: userId },
  });
};
export const authService = {
  signIn,
  signUp,
  signInWithGoogle,
  validateToken,
  deleteUser,
};
