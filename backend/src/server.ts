import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import http from "http";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { exerciseRoutes } from "./api/exercises/exercises.routes";
import { programsRoutes } from "./api/programs/programs.routes";
import { authRoutes } from "./api/auth/auth.routes";
import { setupAsyncLocalStorage } from "./middlewares/localStorage.middleware";
import { workoutRoutes } from "./api/workouts/workouts.routes";
import { userWorkoutsRoutes } from "./api/userWorkouts/userWorkouts.routes";

dotenv.config();

export const app = express();
//TODO?? for adding sockets later, remove before deployment if not implemented
export const server = http.createServer(app);

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
    origin: ["http://127.0.0.1:5173", "http://localhost:5173", "10.0.0.3:8081"],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

//Routes
app.use(`/api/v${process.env.CURRENT_API_VERSION}/auth`, authRoutes);
app.use(`/api/v${process.env.CURRENT_API_VERSION}/exercises`, exerciseRoutes);
app.use(`/api/v${process.env.CURRENT_API_VERSION}/programs`, programsRoutes);
app.use(`/api/v${process.env.CURRENT_API_VERSION}/workouts`, workoutRoutes);
app.use(
  `/api/v${process.env.CURRENT_API_VERSION}/user-workouts`,
  userWorkoutsRoutes
);
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
