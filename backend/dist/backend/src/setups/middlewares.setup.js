"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMiddlewares = void 0;
//Middlewares
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const localStorage_middleware_1 = require("../middlewares/localStorage.middleware");
const setupMiddlewares = (app) => {
    app.use(express_1.default.json());
    //TODO: build cookie parser and signed cookies, using library for now
    app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
    //INFO: Need cookie parser to run before
    app.use(localStorage_middleware_1.setupAsyncLocalStorage);
};
exports.setupMiddlewares = setupMiddlewares;
