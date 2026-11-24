"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workoutsController = void 0;
const workouts_service_1 = require("./workouts.service");
const genericControllerFactory_1 = require("../../shared/generics/genericControllerFactory");
const workout_validations_1 = require("../../../../shared/validations/workout.validations");
exports.workoutsController = (0, genericControllerFactory_1.genericControllerFactory)({
    service: workouts_service_1.workoutsService,
    validation: workout_validations_1.workoutValidation,
    entityName: "Workout",
    isAuth: true,
});
