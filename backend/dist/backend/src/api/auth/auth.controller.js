"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
//Services
const auth_service_1 = require("./auth.service");
const Error_service_1 = require("../../shared/services/Error.service");
//Middlewares
const localStorage_middleware_1 = require("../../middlewares/localStorage.middleware");
//Validations
const auth_validation_1 = require("../../../../shared/validations/auth.validation");
//Consts
const auth_consts_1 = require("./auth.consts");
const signUp = async (req, res) => {
    try {
        const validateData = auth_validation_1.authValidation
            .signUpFactorySchema({ toSanitize: true })
            .parse(req.body);
        const { user, token } = await auth_service_1.authService.signUp(validateData);
        res.cookie("token", token, auth_consts_1.COOKIE).status(201).json({
            message: "User created successfully",
            data: user,
        });
    }
    catch (error) {
        const { status, message, errors } = Error_service_1.AppError.handleResponse(error);
        res.status(status).json({
            message,
            errors,
        });
    }
};
const signIn = async (req, res) => {
    try {
        const validateData = auth_validation_1.authValidation
            .signInFactorySchema({ toSanitize: true })
            .parse(req.body);
        const { user, token } = await auth_service_1.authService.signIn(validateData);
        res.cookie("token", token, auth_consts_1.COOKIE).status(200).json({
            message: "User signed in successfully",
            data: user,
        });
    }
    catch (error) {
        const { status, message, errors } = Error_service_1.AppError.handleResponse(error);
        res.status(status).json({
            message,
            errors,
        });
    }
};
const signOut = async (req, res) => {
    try {
        res.clearCookie("token", auth_consts_1.COOKIE).status(200).json({
            message: "User signed out successfully",
        });
    }
    catch (error) {
        const { status, message, errors } = Error_service_1.AppError.handleResponse(error);
        res.status(status).json({
            message,
            errors,
        });
    }
};
const getSessionUser = async (_, res) => {
    try {
        const user = localStorage_middleware_1.asyncLocalStorage.getStore()?.sessionUser;
        if (!user) {
            throw Error_service_1.AppError.create("User not authenticated", 401);
        }
        res.status(200).json({
            message: "User session retrieved successfully",
            data: user,
        });
    }
    catch (error) {
        const { status, message, errors } = Error_service_1.AppError.handleResponse(error);
        res.status(status).json({
            message,
            errors,
        });
    }
};
const googleCallback = async (req, res) => {
    try {
        const frontendUrl = process.env.FRONTEND_URL;
        if (!frontendUrl) {
            throw Error_service_1.AppError.create("Frontend URL is not set", 500);
        }
        const { code } = req.query;
        if (!code) {
            throw Error_service_1.AppError.create("Authorization code is required", 400);
        }
        const accessToken = await getGoogleTokenResponse(code.toString());
        const userInfo = await getGoogleUserInfo(accessToken);
        const validateGoogleAuth = auth_validation_1.authValidation
            .googleOAuthFactorySchema({ toSanitize: true })
            .parse({
            email: userInfo.email,
            firstName: userInfo.given_name,
            lastName: userInfo.family_name,
            googleId: userInfo.id,
            imgUrl: userInfo.picture,
        });
        const { token } = await auth_service_1.authService.signInWithGoogle(validateGoogleAuth);
        res.cookie("token", token, auth_consts_1.COOKIE).redirect(frontendUrl);
    }
    catch (error) {
        const { status, message, errors } = Error_service_1.AppError.handleResponse(error);
        res.status(status).json({
            message,
            errors,
        });
    }
};
const updateUser = async (req, res) => {
    try {
        const userId = localStorage_middleware_1.asyncLocalStorage.getStore()?.sessionUser?.id;
        if (!userId) {
            throw Error_service_1.AppError.create("User not authenticated", 401);
        }
        const validateData = auth_validation_1.authValidation
            .updateUserFactorySchema({ toSanitize: true })
            .parse(req.body);
        const user = await auth_service_1.authService.updateUser(userId, validateData);
        res.status(200).json({
            message: "User updated successfully",
            data: user,
        });
    }
    catch (error) {
        const { status, message, errors } = Error_service_1.AppError.handleResponse(error);
        res.status(status).json({
            message,
            errors,
        });
    }
};
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = localStorage_middleware_1.asyncLocalStorage.getStore()?.sessionUser?.id;
        if (!userId) {
            throw Error_service_1.AppError.create("User not authenticated", 401);
        }
        if (userId !== id) {
            throw Error_service_1.AppError.create("Cannot delete another user", 403);
        }
        await auth_service_1.authService.deleteUser(userId);
        res.clearCookie("token", auth_consts_1.COOKIE).status(200).json({
            message: "User deleted successfully",
        });
    }
    catch (error) {
        const { status, message, errors } = Error_service_1.AppError.handleResponse(error);
        res.status(status).json({
            message,
            errors,
        });
    }
};
const getGoogleTokenResponse = async (code) => {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;
    if (!clientId || !clientSecret || !redirectUri) {
        throw Error_service_1.AppError.create("Google OAuth credentials are not set", 500);
    }
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            code: code.toString(),
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            grant_type: "authorization_code",
        }).toString(),
    });
    if (!tokenResponse.ok) {
        throw Error_service_1.AppError.create("Failed to exchange authorization code for tokens", 500);
    }
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    if (!accessToken) {
        throw Error_service_1.AppError.create("Access token is required", 400);
    }
    return accessToken;
};
const getGoogleUserInfo = async (accessToken) => {
    const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    if (!userInfoResponse.ok) {
        throw Error_service_1.AppError.create("Failed to fetch user info from Google", 500);
    }
    const userInfo = await userInfoResponse.json();
    return userInfo;
};
exports.authController = {
    signUp,
    signIn,
    signOut,
    getSessionUser,
    googleCallback,
    updateUser,
    deleteUser,
};
