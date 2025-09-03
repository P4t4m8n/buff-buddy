import express from "express";
import cookieParser from "cookie-parser";

import { setupAsyncLocalStorage } from "../middlewares/localStorage.middleware";

import type { Express } from "express";

export const setupMiddlewares = (app: Express): void => {
  app.use(express.json());
  //TODO?? build cookie parser and signed cookies, using library for now
  app.use(cookieParser(process.env.COOKIE_SECRET));
  //INFO?? Need cookie parser to run before
  app.use(setupAsyncLocalStorage);
};
