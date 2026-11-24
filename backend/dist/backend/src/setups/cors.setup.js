"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCors = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const ORIGINS = [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://localhost:5174",
    "https://localhost:5173",
    "https://127.0.0.1:5173",
    "http://10.0.0.8:5173",
];
const setupCors = (app) => {
    if (process.env.NODE_ENV === "production") {
        app.use(express_1.default.static(path_1.default.resolve("public")));
    }
    else {
        const corsOptions = {
            origin: ORIGINS,
            credentials: true,
            exposedHeaders: [
                "X-Total-Count",
                "X-Total-Pages",
                "x-Current-Page",
                "x-Per-Page",
            ],
        };
        app.use((0, cors_1.default)(corsOptions));
    }
};
exports.setupCors = setupCors;
