"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncLocalStorage = void 0;
exports.setupAsyncLocalStorage = setupAsyncLocalStorage;
const async_hooks_1 = require("async_hooks");
const auth_service_1 = require("../api/auth/auth.service");
const Error_service_1 = require("../shared/services/Error.service");
exports.asyncLocalStorage = new async_hooks_1.AsyncLocalStorage();
async function setupAsyncLocalStorage(req, _, next) {
    const storage = {};
    exports.asyncLocalStorage.run(storage, async () => {
        try {
            const alsStore = exports.asyncLocalStorage.getStore();
            if (!alsStore) {
                throw Error_service_1.AppError.create("No async local storage found");
            }
            alsStore.sessionUser = null;
            if (req.method === "OPTIONS") {
                return;
            }
            if (!req.cookies) {
                return;
            }
            const { token } = req.cookies;
            if (!token || typeof token !== "string") {
                return;
            }
            const user = await auth_service_1.authService.validateToken(token);
            if (user) {
                alsStore.sessionUser = user;
            }
        }
        catch (error) {
            // res.clearCookie("token", COOKIE);
        }
        finally {
            next();
        }
    });
}
