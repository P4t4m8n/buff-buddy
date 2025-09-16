import express from "express";
import http from "http";
import dotenv from "dotenv";

import { setupMiddlewares } from "./setups/middlewares.setup";
import { setupCors } from "./setups/cors.setup";
import { setupRoutes } from "./setups/routes.setup";

dotenv.config();
export const app = express(); //INFO?? For Jest
export const server = http.createServer(app);

setupCors(app);
setupMiddlewares(app);


setupRoutes(app);

const port = Number(process.env.PORT) || 3030;

if (process.env.NODE_ENV !== "test") {
  server.listen(port,  async () =>
    console.info(`Server ready at: http://10.0.0.4:${port}`)
  );
}
