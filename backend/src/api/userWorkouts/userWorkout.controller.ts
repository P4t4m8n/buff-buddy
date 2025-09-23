import { asyncLocalStorage } from "../../middlewares/localStorage.middleware";

import { AppError } from "../../shared/services/Error.service";
import { userWorkoutService } from "./userWorkouts.service";

import { userWorkoutValidation } from "../../.././../shared/validations/userWorkout.validations";
import { userWorkoutsUtils } from "./userWorkouts.util";
import { validationUtil } from "../../../../shared/validations/util.validation";

import type { Request, Response } from "express";

export const createUserWorkout = async (req: Request, res: Response) => {
  try {
    const ownerId = asyncLocalStorage.getStore()?.sessionUser?.id;

    if (!ownerId) {
      throw new AppError("User not authenticated", 401);
    }
    const invalidatedData = req.body;

    invalidatedData.ownerId = ownerId;

    const validatedData = userWorkoutValidation
      .createUserWorkoutFactorySchema({ toSanitize: true })
      .parse(invalidatedData);

    const userWorkoutData = await userWorkoutService.create(validatedData);
    const userWorkoutDTO = userWorkoutsUtils.buildDTO(userWorkoutData);

    res.status(201).json({
      message: "User-Workout created successfully",
      data: userWorkoutDTO,
    });
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({
      message,
      errors,
    });
  }
};

export const getUserWorkoutById = async (req: Request, res: Response) => {
  try {
    const { userWorkoutId, userId } = _validateCredentials(
      req.params.userWorkoutId
    );

    const userWorkoutData = await userWorkoutService.getById(
      userWorkoutId,
      userId
    );

    if (!userWorkoutData) {
      throw AppError.create("User Workout not found", 404);
    }
    const userWorkoutDTO = userWorkoutsUtils.buildDTO(userWorkoutData);

    res.status(200).json({
      message: "User Workout found",
      data: userWorkoutDTO,
    });
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({
      message,
      errors,
    });
  }
};

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

export const deleteUserWorkout = async (req: Request, res: Response) => {
  try {
    const { userWorkoutId } = _validateCredentials(req.params.userWorkoutId);

    await userWorkoutService.remove(userWorkoutId);
    res.status(200).json({ message: "User Workout deleted successfully" });
  } catch (error) {
    const { status, message, errors } = AppError.handleResponse(error);
    res.status(status).json({
      message,
      errors,
    });
  }
};

const _validateCredentials = (rawId?: string) => {
  const userWorkoutId = validationUtil
    .IDSchemaFactory({ toSanitize: true })
    .parse(rawId);

  if (!userWorkoutId) {
    throw new AppError("Workout ID is required", 400);
  }

  const userId = asyncLocalStorage.getStore()?.sessionUser?.id;

  if (!userId) {
    throw new AppError("User not authenticated", 401);
  }
  return { userWorkoutId, userId };
};
