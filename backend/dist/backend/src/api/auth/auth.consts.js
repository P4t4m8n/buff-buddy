"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COOKIE = void 0;
const MAX_AGE = 1000 * 60 * 60 * 24 * 7; // 7 days
exports.COOKIE = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE,
};
