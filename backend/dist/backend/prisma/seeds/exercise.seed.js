"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedExercises = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Error_service_1 = require("../../src/shared/services/Error.service");
const exercises_service_1 = require("../../src/api/exercises/exercises.service");
const exercise_validation_1 = require("../../../shared/validations/exercise.validation");
const seedExercises = async () => {
    const exerciseJson = fs_1.default.readFileSync(path_1.default.join(__dirname, "jsons", "exercises.json"), "utf-8");
    const data = JSON.parse(exerciseJson);
    const exercisesPromises = data.map((exercise) => {
        return seedExercise(exercise);
    });
    await Promise.all(exercisesPromises);
    return "Exercises seeded successfully";
};
exports.seedExercises = seedExercises;
const seedExercise = async (exercise) => {
    try {
        const validatedData = exercise_validation_1.exerciseValidation
            .createFactorySchema({ toSanitize: true })
            .parse(exercise);
        return await exercises_service_1.exerciseService.create(validatedData);
    }
    catch (error) {
        const err = Error_service_1.AppError.handleResponse(error);
        console.error(" ~ seedExercises ~ err:", err);
    }
};
(0, exports.seedExercises)()
    .then((result) => { })
    .catch((error) => {
    console.error("Error seeding exercises:", error);
});
