import fs from "fs";
import path from "path";

import { AppError } from "../../src/shared/services/Error.service";
import { exerciseService } from "../../src/api/exercises/exercises.service";

import { exerciseValidation } from "../../../shared/validations/exercise.validation";

import type { IExerciseDTO } from "../../../shared/models/exercise.model";

export const seedExercises = async () => {
  try {
    const exerciseJson = fs.readFileSync(
      path.join("prisma", "jsons", "exercises.json"),
      "utf-8"
    );

    const data: IExerciseDTO[] = JSON.parse(exerciseJson);

    const exercisesPromises = data.map((exercise) => {
      const validatedData = exerciseValidation
        .createExerciseFactorySchema({ toSanitize: false })
        .parse(exercise);

      return exerciseService.create(validatedData);
    });

    await Promise.all(exercisesPromises);

    return "Exercises seeded successfully";
  } catch (error) {
    const err = AppError.handleResponse(error);
    console.error(" ~ seedExercises ~ err:", err);
  }
};

seedExercises()
  .then((result) => {})
  .catch((error) => {
    console.error("Error seeding exercises:", error);
  });
