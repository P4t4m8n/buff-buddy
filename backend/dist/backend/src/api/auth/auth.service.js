"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
//Lib
const prisma_1 = require("../../../prisma/prisma");
//Utils
const auth_util_1 = require("./auth.util");
//Services
const Error_service_1 = require("../../shared/services/Error.service");
//SQL
const auth_sql_1 = require("./auth.sql");
const users_sql_1 = require("../users/users.sql");
const signUp = async (dto) => {
    const authRecord = await auth_util_1.authUtil.getAuthRecord({ dto });
    const data = auth_sql_1.authSQL.getAuthCreate(authRecord);
    const user = await prisma_1.prisma.user
        .create({
        data: data,
        select: users_sql_1.userSQL.SMALL_USER_SELECT,
    })
        //INFO:Catch the record exist error here in case its in the email to prevent sensitive info to leak
        .catch((error) => {
        if ("meta" in error && error.meta?.target?.includes("email")) {
            throw Error_service_1.AppError.create("Bad Request", 409);
        }
        throw error;
    });
    if (!user) {
        throw Error_service_1.AppError.create("User creation failed", 500);
    }
    const token = auth_util_1.authUtil.generateToken({ userId: user.id, isAdmin: false });
    return {
        user,
        token,
    };
};
const signIn = async (dto) => {
    const { email: signInEmail } = dto;
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            email: signInEmail,
        },
        select: {
            ...users_sql_1.userSQL.SMALL_USER_SELECT,
            ...auth_sql_1.authSQL.PASSWORD_AUTH_SELECT,
        },
    });
    if (!user) {
        throw Error_service_1.AppError.create("Wrong credentials", 409);
    }
    const match = await auth_util_1.authUtil.verifyCredentials({
        password: dto?.password,
        passwordHash: user?.passwordHash,
        googleId: dto?.googleId,
        userGoogleId: user.googleId,
    });
    if (!match) {
        throw Error_service_1.AppError.create("Wrong credentials", 409);
    }
    const token = auth_util_1.authUtil.generateToken({ userId: user.id, isAdmin: false });
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
const signInWithGoogle = async (dto) => {
    const { email, googleId } = dto;
    const authRecord = await auth_util_1.authUtil.getAuthRecord({ dto });
    const data = auth_sql_1.authSQL.getAuthCreate(authRecord);
    const user = await prisma_1.prisma.user.upsert({
        where: { email: email },
        update: { googleId: googleId },
        create: data,
        select: users_sql_1.userSQL.SMALL_USER_SELECT,
    });
    if (!user) {
        throw Error_service_1.AppError.create("Google sign-in failed", 500);
    }
    const token = auth_util_1.authUtil.generateToken({ userId: user.id, isAdmin: false });
    return {
        user,
        token,
    };
};
const validateToken = async (token) => {
    if (!token) {
        return null;
    }
    const decoded = auth_util_1.authUtil.decodeToken({ token });
    return await prisma_1.prisma.user.findUnique({
        where: { id: decoded.userId },
        select: users_sql_1.userSQL.SMALL_USER_SELECT,
    });
};
const updateUser = async (userId, dto) => {
    return (await prisma_1.prisma.user.update({
        where: { id: userId },
        data: { firstName: dto.firstName, lastName: dto.lastName },
        select: users_sql_1.userSQL.SMALL_USER_SELECT,
    }));
};
const deleteUser = async (userId) => {
    await prisma_1.prisma.user.delete({
        where: { id: userId },
    });
};
exports.authService = {
    signIn,
    signUp,
    signInWithGoogle,
    validateToken,
    updateUser,
    deleteUser,
};
