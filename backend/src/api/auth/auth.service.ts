import { prisma } from "../../../prisma/prisma";
import bcrypt from "bcrypt";

import { AppError } from "../../shared/services/Error.service";

import type {
  TSignUpInput,
  TSignInInput,
  TGoogleOAuthInput,
} from "../../../../shared/validations/auth.validation";
import { authUtil } from "./auth.util";

const signUp = async (dto: TSignUpInput | TGoogleOAuthInput) => {
  const { email, firstName, lastName } = dto;
  const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);

  let passwordHash = null;
  let googleId = null;
  if ("password" in dto) {
    passwordHash = await bcrypt.hash(dto.password, saltRounds);
  } else if ("googleId" in dto) {
    googleId = dto.googleId;
  }

  const user = await prisma.user.create({
    data: {
      email: email,
      firstName: firstName,
      lastName: lastName,
      passwordHash: passwordHash,
      googleId: googleId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });

  if (!user) {
    throw AppError.create("User creation failed", 500);
  }
  const token = authUtil.generateToken(user.id, false);
  return {
    user,
    token,
  };
};
const signIn = async (dto: TSignInInput | TGoogleOAuthInput) => {
  const { email } = dto;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      passwordHash: true,
      googleId: true,
    },
  });

  if (!user) {
    throw AppError.create("Bad Request", 409);
  }

  let match = false;
  if ("password" in dto && user?.passwordHash) {
    match = await bcrypt.compare(dto?.password, user?.passwordHash || "");
  } else if ("googleId" in dto && user?.googleId) {
    match = user.googleId === dto.googleId;
  }
  if (!match) {
    throw AppError.create("Bad Request", 400);
  }

  const token = authUtil.generateToken(user.id, false);
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
const signInWithGoogle = async (dto: TGoogleOAuthInput) => {
  const { email, firstName, lastName, googleId } = dto;

  const user = await prisma.user.upsert({
    where: { email: email },
    update: { googleId: googleId },
    create: {
      email: email,
      firstName: firstName,
      lastName: lastName,
      googleId: googleId,
      imgUrl: dto.imgUrl,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });

  if (!user) {
    throw AppError.create("Google sign-in failed", 500);
  }

  const token = authUtil.generateToken(user.id, false);
  return {
    user,
    token,
  };
};
const validateToken = async (token: string) => {
  if (!token) {
    return null;
  }

  const decoded = authUtil.decodeToken(token);
  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: { id: true, firstName: true, lastName: true, isAdmin: true },
  });

  if (!user) {
    throw AppError.create("User not found", 404);
  }

  return {
    ...user,
    isAdmin: user.isAdmin,
  };
};
const deleteUser = async (userId: string) => {
  const user = await prisma.user.delete({
    where: { id: userId },
    select: { id: true, firstName: true, lastName: true },
  });

  if (!user) {
    throw AppError.create("User not found", 404);
  }

  return user;
};
export const authService = {
  signIn,
  signUp,
  signInWithGoogle,
  validateToken,
  deleteUser,
};
