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

export const seedExercises = async () => {
  try {
    const data: IExerciseDTO[] = [
      {
        name: "Stiff Legged Deadlift",
        youtubeUrl: "https://www.youtube.com/watch?v=cYKYGwcg0U8",
        type: "strength",
        equipment: ["dumbbell"],
        muscles: ["glutes", "hamstrings"],
      },
      {
        name: "Squat",
        youtubeUrl:
          "https://www.youtube.com/watch?v=i7J5h7BJ07g&amp;list=PLyqKj7LwU2RuAg-us4mzap6izNcc1fuRW&amp;index=5",
        type: "strength",
        equipment: ["dumbbell", "barbell"],
        muscles: ["hamstrings", "glutes"],
      },
      {
        name: "Stair Calves Rises",
        youtubeUrl:
          "https://www.youtube.com/watch?v=__qfDhdByMY&amp;list=PLyqKj7LwU2RtQyn5wWMJbD0rCV-cSkiK3&amp;index=5",
        type: "strength",
        equipment: ["dumbbell"],
        muscles: ["calves"],
      },
      {
        name: "Sissy Squat",
        youtubeUrl: "https://www.youtube.com/watch?v=Kwcpzy1C6UE",
        type: "strength",
        equipment: ["dumbbell"],
        muscles: ["quads"],
      },
      {
        name: "Hip Thrust",
        youtubeUrl:
          "https://www.youtube.com/watch?v=EF7jXP17DPE&amp;list=PLyqKj7LwU2RtZnGDmtpyhDdvUHFvVyZnA",
        type: "strength",
        equipment: ["dumbbell"],
        muscles: ["glutes"],
      },
      {
        name: "Underhand Pullup",
        youtubeUrl:
          "https://www.youtube.com/watch?v=9JC1EwqezGY&amp;list=PLyqKj7LwU2RsCtKw3UlE85HYgPM3-xoO1&amp;index=32",
        type: "strength",
        equipment: ["pull_up_bar"],
        muscles: ["lats", "traps"],
      },
      {
        name: "Dumbbell Pullover",
        youtubeUrl:
          "https://www.youtube.com/watch?v=jQjWlIwG4sI&amp;list=PLyqKj7LwU2RsCtKw3UlE85HYgPM3-xoO1&amp;index=9",
        type: "strength",
        equipment: ["dumbbell"],
        muscles: ["lats"],
      },
      {
        name: "Single Arm Supported Dumbbell Row",
        youtubeUrl:
          "https://www.youtube.com/watch?v=DMo3HJoawrU&amp;list=PLyqKj7LwU2RsCtKw3UlE85HYgPM3-xoO1&amp;index=23",
        type: "strength",
        equipment: ["dumbbell"],
        muscles: ["lats", "traps"],
      },
      {
        name: "Dumbbell Shrug",
        youtubeUrl:
          "https://www.youtube.com/watch?v=_t3lrPI6Ns4&amp;list=PLyqKj7LwU2RvynkwL93EcfuPUaDrWNOEc&amp;index=9",
        type: "strength",
        equipment: ["dumbbell"],
        muscles: ["traps"],
      },
      {
        name: "dumbbell deadlift",
        youtubeUrl: "https://www.youtube.com/watch?v=gLogcYIvgRA",
        type: "strength",
        equipment: ["dumbbell"],
        muscles: ["hamstrings", "glutes", "quads", "lower_back"],
      },
      {
        name: "Incline Dumbbell Curl",
        youtubeUrl:
          "https://www.youtube.com/watch?v=aTYlqC_JacQ&amp;list=PLyqKj7LwU2Rt1cwOsHwdXa2TiRzjA6uoB&amp;index=14",
        type: "strength",
        equipment: ["dumbbell"],
        muscles: ["chest"],
      },
      {
        name: "Incline Dumbbell Flye",
        youtubeUrl:
          "https://www.youtube.com/watch?v=8oR5hBwbIBc&amp;list=PLyqKj7LwU2RuyZwWCIiDHuFZGN11QW3Ff&amp;index=12",
        type: "strength",
        equipment: ["dumbbell"],
        muscles: ["chest"],
      },
      {
        name: "Incline Dumbbell Press",
        youtubeUrl:
          "https://www.youtube.com/watch?v=5CECBjd7HLQ&amp;list=PLyqKj7LwU2RuyZwWCIiDHuFZGN11QW3Ff&amp;index=13",
        type: "strength",
        equipment: ["dumbbell"],
        muscles: ["chest"],
      },
      {
        name: "Bent Lateral Raise",
        youtubeUrl:
          "https://www.youtube.com/watch?v=34gVHrkaiz0&amp;list=PLyqKj7LwU2Rv-tzrJev2STMTIGt_JeugT",
        type: "strength",
        equipment: ["dumbbell"],
        muscles: ["chest"],
      },
      {
        name: "Lateral Raise",
        youtubeUrl:
          "https://www.youtube.com/watch?v=OuG1smZTsQQ&amp;list=PLyqKj7LwU2RuNVJBl0CtfZdxQ99IhKCcu&amp;index=5",
        type: "strength",
        equipment: ["dumbbell"],
        muscles: ["chest"],
      },
      {
        name: "Dumbbell Upright Row",
        youtubeUrl:
          "https://www.youtube.com/watch?v=Ub6QruNKfbY&amp;list=PLyqKj7LwU2RuNVJBl0CtfZdxQ99IhKCcu&amp;index=4",
        type: "strength",
        equipment: ["dumbbell"],
        muscles: ["chest"],
      },
      {
        name: "Dumbbell Skullcrusher",
        youtubeUrl: "https://www.youtube.com/watch?v=HurmGkvE5s0",
        type: "strength",
        equipment: ["dumbbell"],
        muscles: ["chest"],
      },
      {
        name: "Deficit Pushup",
        youtubeUrl: "https://www.youtube.com/watch?v=gmNlqsE3Onc",
        type: "strength",
        equipment: ["dumbbell"],
        muscles: ["chest"],
      },
      {
        name: "Dumbbell Row to Chest",
        youtubeUrl:
          "https://www.youtube.com/watch?v=UPGuwx7GQ9s&amp;list=PLyqKj7LwU2RsCtKw3UlE85HYgPM3-xoO1&amp;index=6",
        type: "strength",
        equipment: ["dumbbell"],
        muscles: ["lats", "traps", "rhomboids"],
      },
      {
        name: "Standing Dumbbell Shoulder Press",
        youtubeUrl:
          "https://www.youtube.com/watch?v=Raemd3qWgJc&amp;list=PLyqKj7LwU2RtjiVutSXk5uC2h7KVMu1Az&amp;index=10",
        type: "strength",
        equipment: ["dumbbell"],
        muscles: ["front_delts", "side_delts", "rear_delts"],
      },
    ];

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

const seedFood = async () => {
  try {
    const foodJson = fs.readFileSync(
      path.join(__dirname, "jsons", "diet-products-2.json"),
      "utf-8"
    );
    if (!foodJson) {
      throw new Error("Failed to read food JSON file");
    }
    const foodData = JSON.parse(foodJson);

    const foodPromises = foodData.map((foodItem: any) => {
      let validatedData;
      try {
        validatedData = foodItemValidation
          .createFoodItemFactorySchema({ toSanitize: false })
          .parse(foodItem);
      } catch (error) {
        return Promise.reject();
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
    console.log("🚀 ~ seedFood ~ error:", error);
  }
};

seedFood()
  .then((result) => {})
  .catch((error) => {
    console.error("Error seeding exercises:", error);
  });
// seedExercises()
//   .then((result) => {})
//   .catch((error) => {
//     console.error("Error seeding exercises:", error);
//   });
