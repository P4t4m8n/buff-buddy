import fs from "fs";
import path from "path";
import { prisma } from "../prisma";

interface IExerciseMuscleJson {
  name: string;
  aliases: string[];
}
const seedExerciseMuscles = async () => {
  const musclesJson = fs.readFileSync(
    path.join(__dirname, "jsons", "muscles.json"),
    "utf-8"
  );
  const muscles: IExerciseMuscleJson[] = JSON.parse(musclesJson);

  const musclesPromises = [];
  for (const muscle of muscles) {
    const musclePromise = prisma.muscle.upsert({
      where: { name: muscle.name },
      update: {},
      create: {
        name: muscle.name,
        aliases: {
          connectOrCreate: muscle.aliases.map((alias) => ({
            where: { name: alias },
            create: { name: alias },
          })),
        },
      },
    });
    musclesPromises.push(musclePromise);
  }
  await Promise.all(musclesPromises);
};

seedExerciseMuscles().catch((error) => {
  console.error("Error seeding exercise muscles:", error);
  process.exit(1);
});
