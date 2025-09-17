import { CookieOptions } from "express";

const MAX_AGE = 24 * 60 * 60 * 1000; // 7 days

export const COOKIE: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: MAX_AGE,
};
