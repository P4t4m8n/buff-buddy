"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserExercises = exports.deleteUserWorkout = exports.getUserWorkoutById = exports.createUserWorkout = void 0;
const localStorage_middleware_1 = require("../../middlewares/localStorage.middleware");
const Error_service_1 = require("../../shared/services/Error.service");
const userWorkouts_service_1 = require("./userWorkouts.service");
const userWorkout_validations_1 = require("../../.././../shared/validations/userWorkout.validations");
const userWorkouts_util_1 = require("./userWorkouts.util");
const util_validation_1 = require("../../../../shared/validations/util.validation");
const createUserWorkout = async (req, res) => {
    try {
        const ownerId = localStorage_middleware_1.asyncLocalStorage.getStore()?.sessionUser?.id;
        if (!ownerId) {
            throw new Error_service_1.AppError("User not authenticated", 401);
        }
        const invalidatedData = req.body;
        invalidatedData.ownerId = ownerId;
        const validatedData = userWorkout_validations_1.userWorkoutValidation
            .createFactorySchema({ toSanitize: true })
            .parse(invalidatedData);
        const userWorkoutData = await userWorkouts_service_1.userWorkoutService.create(validatedData);
        const userWorkoutDTO = userWorkouts_util_1.userWorkoutsUtils.buildDTO(userWorkoutData);
        res.status(201).json({
            message: "User-Workout created successfully",
            data: userWorkoutDTO,
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
exports.createUserWorkout = createUserWorkout;
const getUserWorkoutById = async (req, res) => {
    try {
        const { userWorkoutId, userId } = _validateCredentials(req.params.userWorkoutId);
        const userWorkoutData = await userWorkouts_service_1.userWorkoutService.getById(userWorkoutId, userId);
        if (!userWorkoutData) {
            throw Error_service_1.AppError.create("User Workout not found", 404);
        }
        const userWorkoutDTO = userWorkouts_util_1.userWorkoutsUtils.buildDTO(userWorkoutData);
        res.status(200).json({
            message: "User Workout found",
            data: userWorkoutDTO,
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
exports.getUserWorkoutById = getUserWorkoutById;
// export const getLastWorkouts = async (req: Request, res: Response) => {
//   try {
//     const { workoutId } = req.params;
//     if (!workoutId) {
//       throw new AppError("Workout ID is required", 400);
//     }
//     const userId = asyncLocalStorage.getStore()?.sessionUser?.id;
//     if (!userId) {
//       throw new AppError("User not authenticated", 401);
//     }
//     const userWorkouts = await userWorkoutService.getLastUserWorkouts(
//       workoutId,
//       userId
//     );
//     if (!userWorkouts) {
//       return res.status(404).json({
//         message: "No workout found for the given ID",
//       });
//     }
//     const userWorkoutsDTOs = userWorkouts.map((uw) =>
//       userWorkoutsUtils.buildDTO(uw)
//     );
//     res.status(200).json({
//       message: "Last User-Workout retrieved successfully",
//       data: userWorkoutsDTOs,
//     });
//   } catch (error) {
//     const { status, message, errors } = AppError.handleResponse(error);
//     res.status(status).json({
//       message,
//       errors,
//     });
//   }
// };
const deleteUserWorkout = async (req, res) => {
    try {
        const { userWorkoutId, userId } = _validateCredentials(req.params.userWorkoutId);
        await userWorkouts_service_1.userWorkoutService.remove(userWorkoutId, userId);
        res
            .status(200)
            .json({ message: "User Workout deleted successfully", data: null });
    }
    catch (error) {
        const { status, message, errors } = Error_service_1.AppError.handleResponse(error);
        res.status(status).json({
            message,
            errors,
        });
    }
};
exports.deleteUserWorkout = deleteUserWorkout;
const getUserExercises = async (req, res) => {
    try {
        const userId = localStorage_middleware_1.asyncLocalStorage.getStore()?.sessionUser?.id;
        const userExercises = await userWorkouts_service_1.userWorkoutService.getUserExercises(userId);
        res.status(200).json({
            message: "User exercises retrieved successfully",
            data: userExercises,
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
exports.getUserExercises = getUserExercises;
const _validateCredentials = (rawId) => {
    const userWorkoutId = util_validation_1.validationUtil
        .IDSchemaFactory({ toSanitize: true })
        .parse(rawId);
    if (!userWorkoutId) {
        throw new Error_service_1.AppError("Workout ID is required", 400);
    }
    const userId = localStorage_middleware_1.asyncLocalStorage.getStore()?.sessionUser?.id;
    if (!userId) {
        throw new Error_service_1.AppError("User not authenticated", 401);
    }
    return { userWorkoutId, userId };
};
