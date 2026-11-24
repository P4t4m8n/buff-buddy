"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
exports.requireAdmin = requireAdmin;
const localStorage_middleware_1 = require("./localStorage.middleware");
const Error_service_1 = require("../shared/services/Error.service");
const requireAuth = async (_, res, next) => {
    const store = localStorage_middleware_1.asyncLocalStorage.getStore();
    if (!store?.sessionUser) {
        const err = Error_service_1.AppError.create("Not Authenticated", 401);
        res.status(err.status || 500).json({
            message: err.message || "An unexpected error occurred",
        });
        return;
    }
    next();
};
exports.requireAuth = requireAuth;
async function requireAdmin(req, res, next) {
    const store = localStorage_middleware_1.asyncLocalStorage.getStore();
    const sessionUser = store?.sessionUser;
    if (!sessionUser) {
        res.status(401).send("Not Authenticated");
        return;
    }
    if (!sessionUser.isAdmin) {
        res.status(403).send("Not Authorized");
        return;
    }
    next();
}
