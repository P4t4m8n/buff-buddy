"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workoutStart = void 0;
const Error_service_1 = require("../../shared/services/Error.service");
const localStorage_middleware_1 = require("../../middlewares/localStorage.middleware");
const userWorkouts_service_1 = require("../userWorkouts/userWorkouts.service");
const programs_service_1 = require("../programs/programs.service");
const workoutStart_service_1 = require("./workoutStart.service");
const util_validation_1 = require("../../../../shared/validations/util.validation");
const workoutStart = async (req, res) => {
    try {
        const { workoutId } = req.params;
        const validatedWorkoutId = util_validation_1.validationUtil
            .IDSchemaFactory({ toSanitize: true })
            .parse(workoutId);
        if (!validatedWorkoutId) {
            throw new Error_service_1.AppError("Workout ID is required", 400);
        }
        const userId = localStorage_middleware_1.asyncLocalStorage.getStore()?.sessionUser?.id;
        if (!userId) {
            throw new Error_service_1.AppError("User not authenticated", 401);
        }
        const [userWorkouts, programWorkout] = await Promise.all([
            userWorkouts_service_1.userWorkoutService.getLastUserWorkouts(validatedWorkoutId, userId),
            programs_service_1.programsService.getProgramWorkout(validatedWorkoutId),
        ]);
        if (!programWorkout) {
            return res.status(404).json({
                message: "No Program Workout found for the given ID",
            });
        }
        debugger;
        const plannedUserWorkout = workoutStart_service_1.workoutPlannerService.createUserWorkoutPlan({
            userWorkouts,
            programWorkout,
        });
        res.status(200).json({
            message: "Workout start was successfully planed",
            data: plannedUserWorkout,
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
exports.workoutStart = workoutStart;
