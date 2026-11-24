"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUtil = void 0;
//Lib
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//Services
const Error_service_1 = require("../../shared/services/Error.service");
const TOKEN_EXPIRATION = "7d";
const generateToken = ({ userId, isAdmin, }) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw Error_service_1.AppError.create("JWT_SECRET is not defined", 500);
    }
    const payload = {
        userId,
        isAdmin,
    };
    return jsonwebtoken_1.default.sign(payload, secret, {
        expiresIn: TOKEN_EXPIRATION,
    });
};
const decodeToken = ({ token }) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw Error_service_1.AppError.create("JWT_SECRET is not defined", 500);
    }
    return jsonwebtoken_1.default.verify(token, secret);
};
const getAuthRecord = async ({ dto, }) => {
    const { email, firstName, lastName } = dto;
    const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);
    let passwordHash = null;
    let googleId = null;
    if ("password" in dto) {
        passwordHash = await bcrypt_1.default.hash(dto.password, saltRounds);
    }
    else if ("googleId" in dto) {
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
const verifyCredentials = async ({ password, passwordHash, googleId, userGoogleId, }) => {
    let match = false;
    if (password && passwordHash) {
        match = await bcrypt_1.default.compare(password, passwordHash);
    }
    else if (googleId && userGoogleId) {
        match = googleId === userGoogleId;
    }
    return match;
};
exports.authUtil = {
    generateToken,
    decodeToken,
    getAuthRecord,
    verifyCredentials,
};
