import fs from "fs";
import path from "path";
import { prisma } from "../prisma";

interface IEquipmentJson {
  name: string;
  category: string;
}

const seedEquipments = async () => {
  const equipmentJson = fs.readFileSync(
    path.join(__dirname, "jsons", "equipment.json"),
    "utf-8"
  );
  const equipment: IEquipmentJson[] = await JSON.parse(equipmentJson);

  const equipmentPromises = [];
  for (const item of equipment) {
    const equipmentPromise = await seedEquipment(item);
    equipmentPromises.push(equipmentPromise);
  }

  await Promise.all(equipmentPromises);
};

const seedEquipment = async (item: IEquipmentJson) => {
  try {
    return prisma.equipment.upsert({
      where: { name: item.name },
      update: {},
      create: {
        name: item.name,
        categories: {
          connectOrCreate: {
            where: { name: item.category },
            create: { name: item.category },
          },
        },
      },
    });
  } catch (error) {
    console.log("🚀 ~ seedMuscle ~ error:", error);
    console.log("🚀 ~ seedMuscle ~ muscle:", item);
  }
};

seedEquipments().catch((error) => {
  console.error("Error seeding equipment:", error);
  process.exit(1);
});
