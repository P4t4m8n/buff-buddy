import jwt from "jsonwebtoken";
import { AppError } from "../../shared/services/Error.service";

const TOKEN_EXPIRATION = "7d";

const generateToken = (userId: string, isAdmin: boolean) => {
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

const decodeToken = (token: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw AppError.create("JWT_SECRET is not defined", 500);
  }

  return jwt.verify(token, secret) as {
    userId: string;
    isAdmin: boolean;
  };
};
export const authUtil = { generateToken, decodeToken };
