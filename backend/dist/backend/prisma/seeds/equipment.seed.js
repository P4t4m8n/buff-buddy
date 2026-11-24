"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma_1 = require("../prisma");
const seedEquipments = async () => {
    const equipmentJson = fs_1.default.readFileSync(path_1.default.join(__dirname, "jsons", "equipment.json"), "utf-8");
    const equipment = await JSON.parse(equipmentJson);
    const equipmentPromises = [];
    for (const item of equipment) {
        const equipmentPromise = await seedEquipment(item);
        equipmentPromises.push(equipmentPromise);
    }
    await Promise.all(equipmentPromises);
};
const seedEquipment = async (item) => {
    try {
        return prisma_1.prisma.equipment.upsert({
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
    }
    catch (error) {
    }
};
seedEquipments().catch((error) => {
    console.error("Error seeding equipment:", error);
    process.exit(1);
});
