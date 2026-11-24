"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const middlewares_setup_1 = require("./setups/middlewares.setup");
const cors_setup_1 = require("./setups/cors.setup");
const routes_setup_1 = require("./setups/routes.setup");
dotenv_1.default.config();
//INFO: export for Jest
exports.app = (0, express_1.default)();
exports.server = http_1.default.createServer(exports.app);
(0, cors_setup_1.setupCors)(exports.app);
(0, middlewares_setup_1.setupMiddlewares)(exports.app);
(0, routes_setup_1.setupRoutes)(exports.app);
const port = Number(process.env.PORT) || 3030;
if (process.env.NODE_ENV !== "test") {
    exports.server.listen(port, async () => console.info(`Server ready at: http://localhost:${port}`));
}
