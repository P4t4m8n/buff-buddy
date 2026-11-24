"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardController = void 0;
const localStorage_middleware_1 = require("../../middlewares/localStorage.middleware");
const Error_service_1 = require("../../shared/services/Error.service");
const dashboard_service_1 = require("./dashboard.service");
const getDashboard = async (_, res) => {
    try {
        const userId = localStorage_middleware_1.asyncLocalStorage.getStore()?.sessionUser?.id;
        if (!userId) {
            throw Error_service_1.AppError.create("User not authenticated", 401);
        }
        const dashboard = await dashboard_service_1.dashboardService.getDashboard(userId);
        res.status(200).json({
            message: "Dashboard retrieved successfully",
            data: dashboard,
        });
    }
    catch (error) {
        const { status, message, errors } = Error_service_1.AppError.handleResponse(error);
        res.status(status).json({
            message,
            errors,
        });
    }
};
exports.dashboardController = {
    getDashboard,
};
