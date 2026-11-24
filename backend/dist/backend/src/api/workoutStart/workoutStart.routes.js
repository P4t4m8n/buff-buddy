"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workoutPlannerRoutes = void 0;
const express_1 = require("express");
const workoutStart_controller_1 = require("./workoutStart.controller");
exports.workoutPlannerRoutes = (0, express_1.Router)();
exports.workoutPlannerRoutes.get("/:workoutId", workoutStart_controller_1.workoutStart);
