"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const dashboard_controller_1 = require("./dashboard.controller");
exports.dashboardRoutes = (0, express_1.Router)();
exports.dashboardRoutes.get("/", auth_middleware_1.requireAuth, dashboard_controller_1.dashboardController.getDashboard);
