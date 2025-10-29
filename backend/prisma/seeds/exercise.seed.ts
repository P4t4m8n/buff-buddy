import fs from "fs";
import path from "path";

import { AppError } from "../../src/shared/services/Error.service";
import { exerciseService } from "../../src/api/exercises/exercises.service";

import { exerciseValidation } from "../../../shared/validations/exercise.validation";

import type { IExerciseEditDTO } from "../../../shared/models/exercise.model";

export const seedExercises = async () => {
  const exerciseJson = fs.readFileSync(
    path.join(__dirname, "jsons", "exercises.json"),
    "utf-8"
  );

  const data: IExerciseEditDTO[] = JSON.parse(exerciseJson);

  const exercisesPromises = data.map((exercise) => {
    return seedExercise(exercise);
  });

  await Promise.all(exercisesPromises);

  return "Exercises seeded successfully";
};

const seedExercise = async (exercise: IExerciseEditDTO) => {
  try {
    const validatedData = exerciseValidation
      .createFactorySchema({ toSanitize: true })
      .parse(exercise);

    return await exerciseService.create(validatedData);
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
