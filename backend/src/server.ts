import express from "express";
import http from "http";
import dotenv from "dotenv";

import { setupMiddlewares } from "./setups/middlewares.setup";
import { setupCors } from "./setups/cors.setup";
import { setupRoutes } from "./setups/routes.setup";

dotenv.config();
export const app = express(); //INFO?? For Jest
export const server = http.createServer(app);

setupMiddlewares(app);

setupCors(app);

setupRoutes(app);

const port = Number(process.env.PORT) || 3030;

if (process.env.NODE_ENV !== "test") {
  server.listen(port, "10.0.0.6", async () =>
    console.info(`Server ready at: http://10.0.0.6:${port}`)
  );
}
