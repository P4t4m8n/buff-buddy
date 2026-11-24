"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma_1 = require("../prisma");
const seedExerciseMuscles = async () => {
    const musclesJson = fs_1.default.readFileSync(path_1.default.join(__dirname, "jsons", "muscles.json"), "utf-8");
    const muscles = JSON.parse(musclesJson);
    const musclesPromises = [];
    for (const muscle of muscles) {
        const musclePromise = await seedMuscle(muscle);
        musclesPromises.push(musclePromise);
    }
    await Promise.all(musclesPromises);
};
const seedMuscle = async (muscle) => {
    try {
        return prisma_1.prisma.muscle.upsert({
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
    }
    catch (error) {
    }
};
seedExerciseMuscles().catch((error) => {
    console.error("Error seeding exercise muscles:", error);
    process.exit(1);
});
