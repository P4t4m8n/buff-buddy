import express from "express";
import path from "path";
import cors from "cors";

import type { Express } from "express";

const ORIGINS = [
  "http://127.0.0.1:5173",
  "http://localhost:5173",
  "https://localhost:5173",
  "https://127.0.0.1:5173",
  "http://10.0.0.8:5173",
];

export const setupCors = (app: Express): void => {
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve("public")));
  } else {
    const corsOptions: cors.CorsOptions = {
      origin: ORIGINS,
      credentials: true,
      exposedHeaders: [
        "X-Total-Count",
        "X-Total-Pages",
        "x-Current-Page",
        "x-Per-Page",
      ],
    };
    app.use(cors(corsOptions));
  }
};
