import path from "path";
import { IExerciseDTO } from "../../shared/models/exercise.model";
import { exerciseValidation } from "../../shared/validations/exercise.validation";
import { exerciseService } from "../src/api/exercises/exercises.service";
import { AppError } from "../src/shared/services/Error.service";
import fs from "fs";
import { foodItemValidation } from "../../shared/validations/foodItem.validation";
import { foodItemService } from "../src/api/foodItem/foodItem.service";
import { prisma } from "./prisma";
import { foodItemSQL } from "../src/api/foodItem/foodItem.sql";
// import { IFoodItemEditDto } from "../../shared/models/foodItem.model";
import {
  IWorkoutEditDTO,
  IWorkoutExerciseEditDTO,
} from "../../shared/models/workout.model";
import { workoutValidation } from "../../shared/validations/workout.validations";
import { workoutsService } from "../src/api/workouts/workouts.service";


// export const seedExercises = async () => {
//   try {
//     const exerciseJson = fs.readFileSync(
//       path.join(__dirname, "jsons", "exercises.json"),
//       "utf-8"
//     );

//     const data: IExerciseDTO[] = JSON.parse(exerciseJson);

//     const exercisesPromises = data.map((exercise) => {
//       const validatedData = exerciseValidation
//         .createExerciseFactorySchema({ toSanitize: false })
//         .parse(exercise);

//       return exerciseService.create(validatedData);
//     });

//     await Promise.all(exercisesPromises);

//     return "Exercises seeded successfully";
//   } catch (error) {
//     const err = AppError.handleResponse(error);
//     console.error(" ~ seedExercises ~ err:", err);
//   }
// };

// const fixRawData = async () => {
//   const data = fs.readFileSync(
//     path.join(__dirname, "jsons", "diet-products.json"),
//     "utf-8"
//   );
//   const data1 = fs.readFileSync(
//     path.join(__dirname, "jsons", "diet-products-1.json"),
//     "utf-8"
//   );
//   const data2 = fs.readFileSync(
//     path.join(__dirname, "jsons", "diet-products-2.json"),
//     "utf-8"
//   );

//   const foodData = await JSON.parse(data);
//   const foodData1 = await JSON.parse(data1);
//   const foodData2 = await JSON.parse(data2);

//   const items: IFoodItemEditDto[] = [
//     ...foodData,
//     ...foodData1,
//     ...foodData2,
//   ].map(
//     (item): IFoodItemEditDto => ({
//       ...item,
//       name: item?.name?.trim().length ? item?.name?.trim() : item?.barcode,
//       brand: [{ name: item?.brand }],
//       categories: item?.categories?.map((cat: string) => ({ name: cat })) ?? [],
//       ingredients: item?.ingredients?.split(",")?.map((ing: string) => ({
//         name: ing.trim(),
//       })),
//       labels: item?.labels?.map((tag: string) => ({ name: tag })),
//       allergens: item?.allergens?.map((all: string) => ({ name: all })),
//     })
//   );

//   const noNameItems = items.filter((item: any) => !item.name);
//   fs.writeFileSync(
//     path.join(__dirname, "jsons", "diet-no-name.json"),
//     JSON.stringify(noNameItems, null, 2)
//   );

//   fs.writeFileSync(
//     path.join(__dirname, "jsons", "diet-products-seed.json"),
//     JSON.stringify(items, null, 2)
//   );
// };

// const checkFoodITems = async () => {
//   const data = fs.readFileSync(
//     path.join(__dirname, "jsons", "foodItems.json"),
//     "utf-8"
//   );

//   const foodData = (await JSON.parse(data)) as IFoodItemEditDto[];

//   //  const noDuplicates = foodData.filter(
//   //     (item, index, self) =>
//   //       index === self.findIndex((t) => t.name === item.name)

//   //   );

//   // fs.writeFileSync(
//   //   path.join(__dirname, "jsons", "noDuplicates.json"),
//   //   JSON.stringify(noDuplicates, null, 2)
//   // );
//   // const noNameItems = foodData.filter((item: any) => !item.name);
//   // fs.writeFileSync(
//   //   path.join(__dirname, "jsons", "diet-no-name.json"),
//   //   JSON.stringify(noNameItems, null, 2)
//   // );
// };

// const seedFood = async () => {
//   try {
//     const data = fs.readFileSync(
//       path.join(__dirname, "jsons", "foodItems.json"),
//       "utf-8"
//     );

//     const foodData = await JSON.parse(data);

//     const foodPromises = foodData.map((foodItem: any) => {
//       let validatedData;
//       try {
//         validatedData = foodItemValidation
//           .createFoodItemFactorySchema({ toSanitize: false })
//           .parse(foodItem);

//         if (!validatedData.name) {
//           throw new Error("No name provided");
//         }
//       } catch (error) {
//         return Promise.reject(`${error}`);
//       }

//       return prisma.foodItem.upsert({
//         where: { name: validatedData.name },
//         update: { ...foodItemSQL.getFoodItemCreate(validatedData) },
//         create: { ...foodItemSQL.getFoodItemCreate(validatedData) },
//       });
//     });

//     const results = await Promise.allSettled(foodPromises);

//     const errors = results
//       .filter((result) => result.status === "rejected")
//       .map((result) => result);

//     fs.writeFileSync(
//       path.join(__dirname, "jsons", "diet-errors.json"),
//       JSON.stringify(errors, null, 2)
//     );

//     return errors;
//   } catch (error) {
//     console.error(" ~ seedFood ~ error:", error);
//   }
// };
// // checkFoodITems();
// // fixRawData();
// // seedFood()
// //   .then((result) => {})
// //   .catch((error) => {
// //     console.error("Error seeding exercises:", error);
// //   });
// seedExercises()
//   .then((result) => {})
//   .catch((error) => {
//     console.error("Error seeding exercises:", error);
//   });

const createWorkoutExercise = ({
  order,
  exercise,
}: {
  order: number;
  exercise?: IExerciseDTO;
}): IWorkoutExerciseEditDTO => {
  return {
    order,
    notes: `This is a note for exercise ${order + 1}`,
    exerciseData: {
      id: exercise?.id || "",
      type: exercise?.type || "cardio",
    },
    crudOperation: "create",
    hasWarmup: Math.random() < 0.5,
    isBodyWeight: Math.random() < 0.2,
    restTime: Math.floor(Math.random() * 300),
  };
};

const seedWorkouts = async () => {
  const exercises = await prisma.exercise.findMany();

  const user = await prisma.user.findMany({
    where: { firstName: "test" },
  });

  const demoWorkouts: IWorkoutEditDTO[] = Array(50)
    .fill(null)
    .map((_, index) => ({
      name: `Demo Workout ${index + 1}`,
      notes: `This is a note for Demo Workout ${index + 1}`,
      isTemplate: Math.random() < 0.5,
      ownerId: user[0]?.id,
      crudOperation: "create",
      workoutExercises: Array.from({ length: 10 }, (_, exerciseIndex) => {
        const randomExercise =
          exercises[Math.floor(Math.random() * (exercises.length - 1))];
        return createWorkoutExercise({
          order: exerciseIndex + 1,
          exercise: randomExercise,
        });
      }),
    }));

  const workoutPromises = demoWorkouts.map((workout) => {
    const validatedData = workoutValidation
      .createFactorySchema({ toSanitize: false })
      .parse(workout);

    return workoutsService.create(validatedData);
  });

  await Promise.allSettled(workoutPromises);

  return "Workouts seeded successfully";
};

seedWorkouts()
  .then((result) => {
  })
  .catch((error) => {
    console.error("Error seeding workouts:", error);
  });

