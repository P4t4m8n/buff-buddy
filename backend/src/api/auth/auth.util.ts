//Lib
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
//Services
import { AppError } from "../../shared/services/Error.service";
//Types
import type {
  TSignUpInput,
  TGoogleOAuthInput,
} from "../../../../shared/validations/auth.validation";
import type { Prisma } from "../../../prisma/generated/prisma";

const TOKEN_EXPIRATION = "7d";

const generateToken = ({
  userId,
  isAdmin,
}: {
  userId: string;
  isAdmin: boolean;
}) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw AppError.create("JWT_SECRET is not defined", 500);
  }

  const payload = {
    userId,
    isAdmin,
  };
  return jwt.sign(payload, secret, {
    expiresIn: TOKEN_EXPIRATION,
  });
};

const decodeToken = ({ token }: { token: string }) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw AppError.create("JWT_SECRET is not defined", 500);
  }

  return jwt.verify(token, secret) as {
    userId: string;
    isAdmin: boolean;
  };
};

const getAuthRecord = async ({
  dto,
}: {
  dto: TSignUpInput | TGoogleOAuthInput;
}): Promise<Prisma.UserCreateInput> => {
  const { email, firstName, lastName } = dto;
  const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);

  let passwordHash = null;
  let googleId = null;
  if ("password" in dto) {
    passwordHash = await bcrypt.hash(dto.password, saltRounds);
  } else if ("googleId" in dto) {
    googleId = dto.googleId;
  }
  return {
    email,
    firstName,
    lastName,
    passwordHash,
    googleId,
  };
};

const verifyCredentials = async ({
  password,
  passwordHash,
  googleId,
  userGoogleId,
}: {
  password?: string | null;
  passwordHash: string | null;
  googleId?: string | null;
  userGoogleId: string | null;
}): Promise<Boolean> => {
  let match = false;
  if (password && passwordHash) {
    match = await bcrypt.compare(password, passwordHash);
  } else if (googleId && userGoogleId) {
    match = googleId === userGoogleId;
  }
  return match;
};
export const authUtil = {
  generateToken,
  decodeToken,
  getAuthRecord,
  verifyCredentials,
};
