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
  const user = await prisma.user.create({
    data: data,
    select: userSQL.SMALL_USER_SELECT,
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
  const { email } = dto;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      ...userSQL.SMALL_USER_SELECT,
      ...authSQL.PASSWORD_AUTH_SELECT,
    },
  });

  if (!user) {
    throw AppError.create("Bad Request", 409);
  }

  const match = authUtil.verifyCredentials({
    password: (dto as TSignInInput)?.password ?? null,
    passwordHash: user?.passwordHash,
    googleId: (dto as TGoogleOAuthInput)?.googleId ?? null,
    userGoogleId: user.googleId,
  });

  if (!match) {
    throw AppError.create("Bad Request", 400);
  }

  const token = authUtil.generateToken({ userId: user.id, isAdmin: false });
  const { lastName, firstName, id } = user;
  return {
    user: {
      id,
      firstName,
      lastName,
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
