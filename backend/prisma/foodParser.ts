import * as fs from "fs";
import * as readline from "readline";
import { Transform } from "stream";

interface DietTrackerProduct {
  // Core identification
  code: string;
  name: string;
  brand?: string;

  // Categorization
  categories?: string[];
  mainCategory?: string;

  // Serving information
  servingSize?: number; // in grams
  quantity?: string;

  // Essential nutrition per 100g
  energy?: number; // kcal
  energyKj?: number; // kJ
  proteins?: number;
  carbohydrates?: number;
  sugars?: number;
  fat?: number;
  saturatedFat?: number;
  fiber?: number;
  salt?: number;
  sodium?: number;

  // Diet-relevant info
  nutritionGrade?: "a" | "b" | "c" | "d" | "e";
  novaGroup?: number; // 1-4 processing level

  // Allergens and dietary restrictions
  allergens?: string[];
  traces?: string[];
  labels?: string[];

  // Additional useful fields
  ingredients?: string;
  images?: string[];
  countries?: string[];

  // Metadata
  lastModified?: Date;
  completeness?: number; // How complete the data is (0-1)
}

interface rawImage {
  [key: string]: {
    sizes: {
      [size: string]: {
        w: number;
        h: number;
      };
    };
    rev: string;
    uploader: string;
    uploaded_t: number;
  };
}

interface RawProduct {
  code?: string;
  product_name?: string;
  brands?: string;
  categories?: string;
  categories_tags?: string[];
  main_category?: string;
  serving_size?: string | number;
  quantity?: string;
  nutriments: {
    // Nutrition facts per 100g
    energy_100g?: string | number;
    energy_kcal_100g?: string | number;
    proteins_100g?: string | number;
    carbohydrates_100g?: string | number;
    sugars_100g?: string | number;
    fat_100g?: string | number;
    "saturated-fat_100g"?: string | number;
    fiber?: string | number;
    salt_100g?: string | number;
    sodium_100g?: string | number;
  };

  // Quality indicators
  nutrition_grade_fr?: string;
  nova_group?: string | number;

  // Dietary info
  allergens_tags?: string[];
  traces_tags?: string[];
  labels_tags?: string[];

  // Additional fields
  ingredients_text?: string;
  images?: rawImage;
  countries_tags?: string[];
  last_modified_datetime?: string;
  completeness?: string | number;
}

function safeParseNumber(value: any): number | undefined {
  if (typeof value === "number") return isNaN(value) ? undefined : value;
  if (typeof value === "string") {
    const cleaned = value.replace(/[^\d.-]/g, "");
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? undefined : parsed;
  }
  return undefined;
}

function cleanTags(tags: string[] | undefined): string[] | undefined {
  if (!tags || !Array.isArray(tags)) return undefined;

  const cleaned = tags
    .map((tag) => tag.replace(/^en:/, "").replace(/-/g, " ").trim())
    .filter((tag) => tag.length > 0)
    .filter((tag, index, arr) => arr.indexOf(tag) === index);

  return cleaned.length > 0 ? cleaned : undefined;
}

const parseImage = (image: rawImage, code: string) => {
  const images: string[] = [];
  const breakCode = code.replace(/(\d{3})(\d{3})(\d{3})(\d{4})/, "$1/$2/$3/$4");
  const baseUrl =
    "https://images.openfoodfacts.org/images/products/" + breakCode;
  Object.entries(image).forEach(([key, value]) => {
    const rev = value?.rev ?? null;
    Object.entries(value.sizes).forEach(([sizeKey, sizeValue]) => {
      if (rev) {
        images.push(`${baseUrl}/${key}.${rev}.${sizeKey}.jpg`);
      } else {
        images.push(`${baseUrl}/${key}.${sizeKey}.jpg`);
      }
    });
  });
  return images;
};

function transformProduct(raw: RawProduct): DietTrackerProduct | null {
  // Skip products without essential data
  if (!raw.code) {
    return null;
  }

  const { nutriments } = raw;
  const product: DietTrackerProduct = {
    code: raw.code,
    name: raw.product_name ?? raw.code,
    brand: raw.brands || undefined,

    categories: cleanTags(raw.categories_tags),
    mainCategory: raw.main_category || undefined,

    servingSize: safeParseNumber(raw.serving_size),

    // Convert kJ to kcal if kcal not available (1 kcal = 4.184 kJ)
    energy:
      safeParseNumber(nutriments.energy_kcal_100g) ||
      (safeParseNumber(nutriments.energy_100g)
        ? Math.round(safeParseNumber(nutriments.energy_100g)! / 4.184)
        : undefined),
    energyKj: safeParseNumber(nutriments.energy_100g),
    proteins: safeParseNumber(nutriments.proteins_100g),
    carbohydrates: safeParseNumber(nutriments.carbohydrates_100g),
    sugars: safeParseNumber(nutriments.sugars_100g),
    fat: safeParseNumber(nutriments.fat_100g),
    saturatedFat: safeParseNumber(nutriments["saturated-fat_100g"]),
    fiber: safeParseNumber(nutriments.fiber),
    salt: safeParseNumber(nutriments.salt_100g),
    sodium: safeParseNumber(nutriments.sodium_100g),

    nutritionGrade: (raw.nutrition_grade_fr as any) || undefined,
    novaGroup: safeParseNumber(raw.nova_group),

    allergens: cleanTags(raw.allergens_tags),
    traces: cleanTags(raw.traces_tags),
    labels: cleanTags(raw.labels_tags),

    ingredients: raw.ingredients_text || undefined,
    images: raw?.images ? parseImage(raw?.images, raw.code) : undefined,
    countries: cleanTags(raw.countries_tags),

    lastModified: raw.last_modified_datetime
      ? new Date(raw.last_modified_datetime)
      : undefined,
  };

  return product;
}

/**
 * Processes Open Food Facts JSONL file and creates diet tracker JSON
 */
async function processOpenFoodFactsData(
  inputFilePath: string,
  outputFilePath: string,
  options: {
    maxProducts?: number;
    countries?: string[]; // Filter by countries (e.g., ['en:united-states', 'en:france'])
    categories?: string[]; // Filter by categories
    batchSize?: number;
  } = {}
): Promise<void> {
  const {
    maxProducts = Infinity,
    countries,
    categories,
    batchSize = 10000,
  } = options;

  let processedCount = 0;
  let validProductsCount = 0;
  const products: DietTrackerProduct[] = [];

  console.info(` Starting to process ${inputFilePath}`);
  console.info(` Filters:  maxProducts=${maxProducts}`);

  const fileStream = fs.createReadStream(inputFilePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  try {
    for await (const line of rl) {
      if (!line.trim()) continue;

      try {
        const rawProduct: RawProduct = JSON.parse(line);

        // Apply country filter if specified
        if (countries && rawProduct.countries_tags) {
          const hasMatchingCountry = countries.some((country) =>
            rawProduct.countries_tags?.includes(country)
          );
          if (!hasMatchingCountry) continue;
        }

        // Apply category filter if specified
        if (categories && rawProduct.categories_tags) {
          const hasMatchingCategory = categories.some((category) =>
            rawProduct.categories_tags?.some((tag) => tag.includes(category))
          );
          if (!hasMatchingCategory) continue;
        }

        const transformedProduct = transformProduct(rawProduct);

        if (transformedProduct) {
          products.push(transformedProduct);
          validProductsCount++;

          // Process in batches to avoid memory issues
          if (products.length >= batchSize) {
            await saveBatch(
              products,
              outputFilePath,
              validProductsCount === products.length
            );
            products.length = 0; // Clear array
          }

          if (validProductsCount >= maxProducts) {
            break;
          }
        }

        processedCount++;

        // Progress logging
        if (processedCount % 50000 === 0) {
          console.info(
            `📈 Processed ${processedCount} products, found ${validProductsCount} valid products`
          );
        }
      } catch (error) {
        // Skip invalid JSON lines
        continue;
      }
    }

    // Save remaining products
    if (products.length > 0) {
      await saveBatch(products, outputFilePath, false);
    }

    console.info(` Processing complete!`);
    console.info(` Total processed: ${processedCount}`);
    console.info(` Valid products: ${validProductsCount}`);
    console.info(` Saved to: ${outputFilePath}`);
  } catch (error) {
    console.error(" Error processing file:", error);
    throw error;
  } finally {
    rl.close();
  }
}

/**
 * Saves a batch of products to JSON file
 */
async function saveBatch(
  products: DietTrackerProduct[],
  outputFilePath: string,
  isFirstBatch: boolean
): Promise<void> {
  const jsonContent = JSON.stringify(products, null, 2);

  if (isFirstBatch) {
    // Create new file with array opening
    await fs.promises.writeFile(
      outputFilePath,
      `[\n${jsonContent.slice(1, -1)}`
    );
  } else {
    // Append to existing file
    await fs.promises.appendFile(
      outputFilePath,
      `,\n${jsonContent.slice(1, -1)}`
    );
  }
}

/**
 * Finalizes the JSON array in the output file
 */
async function finalizeOutputFile(outputFilePath: string): Promise<void> {
  await fs.promises.appendFile(outputFilePath, "\n]");
}

async function loadFoodData() {
  try {
    await processOpenFoodFactsData(
      "backend\\prisma\\jsons\\openfoodfacts-products.jsonl", // Input file
      "backend\\prisma\\jsons\\diet-products-2.json", // Output file
      {
        countries: ["en:israel"],
        batchSize: 5000, // Process in batches
      }
    );

    await finalizeOutputFile("./diet-products.json");
    console.info("Food data ready for Prisma!");
  } catch (error) {
    console.error(" Error:", error);
  }
}

loadFoodData();
