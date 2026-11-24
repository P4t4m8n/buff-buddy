"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRoutes = setupRoutes;
//Lib
const path_1 = __importDefault(require("path"));
//Routes
const auth_routes_1 = require("../api/auth/auth.routes");
const exercises_routes_1 = require("../api/exercises/exercises.routes");
const programs_routes_1 = require("../api/programs/programs.routes");
const workouts_routes_1 = require("../api/workouts/workouts.routes");
const userWorkouts_routes_1 = require("../api/userWorkouts/userWorkouts.routes");
const workoutStart_routes_1 = require("../api/workoutStart/workoutStart.routes");
const dashboard_routes_1 = require("../api/dashboard/dashboard.routes");
const ROUTES = [
    "auth",
    "exercises",
    "programs",
    "workouts",
    "user-workouts",
    "workout-start",
    "dashboard",
];
function setupRoutes(app) {
    const routesMap = new Map([
        ["auth", auth_routes_1.authRoutes],
        ["exercises", exercises_routes_1.exerciseRoutes],
        ["programs", programs_routes_1.programsRoutes],
        ["workouts", workouts_routes_1.workoutRoutes],
        ["user-workouts", userWorkouts_routes_1.userWorkoutsRoutes],
        ["workout-start", workoutStart_routes_1.workoutPlannerRoutes],
        ["dashboard", dashboard_routes_1.dashboardRoutes],
    ]);
    const apiVersion = process.env.CURRENT_API_VERSION || "1";
    const baseUrl = `/api/v${apiVersion}`;
    routesMap.forEach((router, path) => {
        app.use(`${baseUrl}/${path}`, router);
    });
    app.all("/{*any}", (_, res) => {
        res.sendFile(path_1.default.resolve("public/index.html"));
    });
}
