import { Request, Response } from "express";
import {
  CreateUserSchema,
  GoogleOAuthSchema,
  SignInSchema,
} from "./auth.validations";
import { authService } from "./auth.service";
import { AppError } from "../../shared/services/Error.service";
import { COOKIE } from "./auth.consts";
import { asyncLocalStorage } from "../../middlewares/localStorage.middleware";

type TGoogleUserResponse = {
  email: string;
  given_name: string;
  family_name: string;
  picture: string;
  id: string;
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const validateData = CreateUserSchema.parse(req.body);
    const { user, token } = await authService.signUp(validateData);

    res.cookie("token", token, COOKIE).status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    const err = AppError.handleResponse(error);
    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const validateData = SignInSchema.parse(req.body);
    const { user, token } = await authService.signIn(validateData);

    res.cookie("token", token, COOKIE).status(200).json({
      message: "User signed in successfully",
      data: user,
    });
  } catch (error) {
    const err = AppError.handleResponse(error);
    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};

export const signOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", COOKIE).status(200).json({
      message: "User signed out successfully",
    });
  } catch (error) {
    const err = AppError.handleResponse(error);
    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};

export const getSessionUser = async (req: Request, res: Response) => {
  try {
    const user = asyncLocalStorage.getStore()?.sessionUser;
    res.status(200).json({
      message: "User session retrieved successfully",
      data: user,
    });
  } catch (error) {
    const err = AppError.handleResponse(error);
    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};

export const googleRedirect = async (req: Request, res: Response) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  if (!clientId || !redirectUri) {
    throw AppError.create("Google OAuth credentials are not set", 500);
  }
  const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth
  ?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile`;
  res.redirect(googleAuthURL);
};

export const googleCallback = async (req: Request, res: Response) => {
  try {
    const { code } = req.query;
    if (!code) {
      throw AppError.create("Authorization code is required", 400);
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
      throw AppError.create("Google OAuth credentials are not set", 500);
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
      throw AppError.create(
        "Failed to exchange authorization code for tokens",
        500
      );
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      throw AppError.create("Access token is required", 400);
    }

    const userInfoResponse = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!userInfoResponse.ok) {
      throw AppError.create("Failed to fetch user info from Google", 500);
    }
    const userInfo = (await userInfoResponse.json()) as TGoogleUserResponse;
    const validateGoogleAuth = GoogleOAuthSchema.parse({
      email: userInfo.email,
      firstName: userInfo.given_name,
      lastName: userInfo.family_name,
      googleId: userInfo.id,
      imgUrl: userInfo.picture,
    });
    const { token } = await authService.signInWithGoogle(validateGoogleAuth);

    const frontendUrl = process.env.FRONTEND_URL;
    console.log("🚀 ~ googleCallback ~ frontendUrl:", frontendUrl)
    res.cookie("token", token, COOKIE).redirect(frontendUrl!);
  } catch (error) {
    const err = AppError.handleResponse(error);
    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userId = asyncLocalStorage.getStore()?.sessionUser?.id;

    if (!userId) {
      throw AppError.create("User not authenticated", 401);
    }

    await authService.deleteUser(id);
    res.clearCookie("token", COOKIE).status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    const err = AppError.handleResponse(error);
    res.status(err.status || 500).json({
      message: err.message || "An unexpected error occurred",
      errors: err.errors || {},
    });
  }
};
