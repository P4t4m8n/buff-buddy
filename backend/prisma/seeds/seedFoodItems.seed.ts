import fs from "fs";
import path from "path";
import { foodItemValidation } from "../../../shared/validations/foodItem.validation";
import { foodItemService } from "../../src/api/foodItems/foodItems.service";
import { IFoodItemEditDTO } from "../../../shared/models/foodItem.model";

interface DietTrackerProduct {
  barcode: string;
  name: string;
  brand?: { name?: string }[];
  categories?: { name?: string }[];
  labels?: { name?: string }[];
  servingSize?: number; // in grams
  quantity?: string;
  calories?: number;
  proteins?: number;
  carbohydrates?: number;
  fat?: number;
  saturatedFat?: number;
  fiber?: number;
  salt?: number;
  sodium?: number;
  nutritionGrade?: "a" | "b" | "c" | "d" | "e";
  sugars?: number;
  novaGroup?: number;
  images?: string[];
}

const seedFoodItems = async () => {
  console.info("Seeding food items...");
  console.info("Loading JSON file...");
  const foodItemJson = fs.readFileSync(
    path.join(__dirname, "jsons", "foodItems.json"),
    "utf-8"
  );
  let foodItemData: IFoodItemEditDTO = {};
  console.info("JSON file loaded. Parsing and seeding data...");
  try {
    const foodItems: DietTrackerProduct[] = JSON.parse(foodItemJson);
    console.info(`Total items to seed: ${foodItems.length}`);
    const foodItemPromises = foodItems.map((item) => {
      foodItemData = {
        ...item,
        proteins: item.proteins?.toFixed(2) ?? 0,
        brand: item.brand?.[0]?.name
          ? [{ name: item.brand?.[0]?.name, crudOperation: "create" }]
          : null,
        categories:
          item.categories?.map((cat) => ({
            name: cat?.name,
            crudOperation: "create",
          })) || [],
        labels:
          item.labels?.map((label) => ({
            name: label?.name,
            crudOperation: "create",
          })) || [],
        images:
          item.images?.map((url) => ({
            url,
            crudOperation: "create",
          })) || [],
      };
      const validateData = foodItemValidation
        .createFactorySchema({ toSanitize: false })
        .parse(foodItemData);

      return foodItemService.create(validateData);
    });

    const res = await Promise.allSettled(foodItemPromises);
    const fulfilled = res.filter((r) => r.status === "fulfilled");
    const rejected = res.filter((r) => r.status === "rejected");

    fs.writeFileSync(
      path.join(__dirname, "jsons", "seedResults.json"),
      JSON.stringify(fulfilled, null, 2)
    );

    fs.writeFileSync(
      path.join(__dirname, "jsons", "seedErrors.json"),
      JSON.stringify(rejected, null, 2)
    );

    return "Food items seeded successfully";
  } catch (error) {
    console.info(foodItemData);
    console.error("Error seeding food items:", error);
  }
};

seedFoodItems().then((result) => {
  console.info(result);
  process.exit(0);
});
