import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import http from "http";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { setupAsyncLocalStorage } from "./middlewares/localStorage.middleware";
import { setupRoutes } from "./config/routes";

dotenv.config();
export const app = express(); //INFO For Jest
export const server = http.createServer(app); //TODO for adding sockets later, remove before deployment if not implemented

//Middlewares
app.use(express.json());

//TODO?? build cookie parser and signed cookies, using library for now
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(setupAsyncLocalStorage);

//CORS
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve("public")));
} else {
  const corsOptions: cors.CorsOptions = {
    origin: [
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "https://localhost:5173",
      "https://127.0.0.1:5173",
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

//Routes
const apiVersion = process.env.CURRENT_API_VERSION || "1";
setupRoutes(app, apiVersion);
// Catch-all route
app.all("/{*any}", (req: Request, res: Response) => {
  res.sendFile(path.resolve("public/index.html"));
});
const port = process.env.PORT || 3030;

if (process.env.NODE_ENV !== "test") {
  server.listen(port, async () =>
    console.info(`Server ready at: http://localhost:${port}`)
  );
}
