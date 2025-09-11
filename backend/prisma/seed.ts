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
import { IFoodItemEditDto } from "../../shared/models/foodItem.model";

export const seedExercises = async () => {
  try {
    const exerciseJson = fs.readFileSync(
      path.join(__dirname, "jsons", "exercises.json"),
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
    console.error("🚀 ~ seedExercises ~ err:", err);
  }
};

const fixRawData = async () => {
  const data = fs.readFileSync(
    path.join(__dirname, "jsons", "diet-products.json"),
    "utf-8"
  );
  const data1 = fs.readFileSync(
    path.join(__dirname, "jsons", "diet-products-1.json"),
    "utf-8"
  );
  const data2 = fs.readFileSync(
    path.join(__dirname, "jsons", "diet-products-2.json"),
    "utf-8"
  );

  const foodData = await JSON.parse(data);
  const foodData1 = await JSON.parse(data1);
  const foodData2 = await JSON.parse(data2);

  const items: IFoodItemEditDto[] = [
    ...foodData,
    ...foodData1,
    ...foodData2,
  ].map(
    (item): IFoodItemEditDto => ({
      ...item,
      name: item?.name?.trim().length ? item?.name?.trim() : item?.barcode,
      brand: [{ name: item?.brand }],
      categories: item?.categories?.map((cat: string) => ({ name: cat })) ?? [],
      ingredients: item?.ingredients?.split(",")?.map((ing: string) => ({
        name: ing.trim(),
      })),
      labels: item?.labels?.map((tag: string) => ({ name: tag })),
      allergens: item?.allergens?.map((all: string) => ({ name: all })),
    })
  );

  const noNameItems = items.filter((item: any) => !item.name);
  fs.writeFileSync(
    path.join(__dirname, "jsons", "diet-no-name.json"),
    JSON.stringify(noNameItems, null, 2)
  );

  fs.writeFileSync(
    path.join(__dirname, "jsons", "diet-products-seed.json"),
    JSON.stringify(items, null, 2)
  );
};

const checkFoodITems = async () => {
  const data = fs.readFileSync(
    path.join(__dirname, "jsons", "foodItems.json"),
    "utf-8"
  );

  const foodData = (await JSON.parse(data)) as IFoodItemEditDto[];

  //  const noDuplicates = foodData.filter(
  //     (item, index, self) =>
  //       index === self.findIndex((t) => t.name === item.name)

  //   );

  // fs.writeFileSync(
  //   path.join(__dirname, "jsons", "noDuplicates.json"),
  //   JSON.stringify(noDuplicates, null, 2)
  // );
  // const noNameItems = foodData.filter((item: any) => !item.name);
  // fs.writeFileSync(
  //   path.join(__dirname, "jsons", "diet-no-name.json"),
  //   JSON.stringify(noNameItems, null, 2)
  // );
};

const seedFood = async () => {
  try {
    const data = fs.readFileSync(
      path.join(__dirname, "jsons", "foodItems.json"),
      "utf-8"
    );

    const foodData = await JSON.parse(data);

    const foodPromises = foodData.map((foodItem: any) => {
      let validatedData;
      try {
        validatedData = foodItemValidation
          .createFoodItemFactorySchema({ toSanitize: false })
          .parse(foodItem);

        if (!validatedData.name) {
          throw new Error("No name provided");
        }
      } catch (error) {
        return Promise.reject(`${error}`);
      }

      return prisma.foodItem.upsert({
        where: { name: validatedData.name },
        update: { ...foodItemSQL.getFoodItemCreate(validatedData) },
        create: { ...foodItemSQL.getFoodItemCreate(validatedData) },
      });
    });

    const results = await Promise.allSettled(foodPromises);

    const errors = results
      .filter((result) => result.status === "rejected")
      .map((result) => result);

    fs.writeFileSync(
      path.join(__dirname, "jsons", "diet-errors.json"),
      JSON.stringify(errors, null, 2)
    );

    return errors;
  } catch (error) {
    console.error("🚀 ~ seedFood ~ error:", error);
  }
};
checkFoodITems();
// fixRawData();
// seedFood()
//   .then((result) => {})
//   .catch((error) => {
//     console.error("Error seeding exercises:", error);
//   });
// seedExercises()
//   .then((result) => {})
//   .catch((error) => {
//     console.error("Error seeding exercises:", error);
//   });
