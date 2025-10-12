import { dbUtil } from "../../shared/utils/db.util";

import type { IFoodItemInfoEditBase } from "../../../../shared/models/foodItem.model";
import type {
  TFoodItemCreateValidatedInput,
  TFoodItemUpdateValidatedInput,
} from "../../../../shared/validations/foodItem.validation";
import type { Prisma } from "../../../prisma/generated/prisma";

const FOOD_ITEM_SQL: Prisma.FoodItemSelect = {
  id: true,
  barcode: true,
  name: true,
  servingSize: true,
  calories: true,
  proteins: true,
  carbohydrates: true,
  sugars: true,
  fat: true,
  saturatedFat: true,
  fiber: true,
  salt: true,
  cholesterol: true,
  brand: {
    select: {
      name: true,
    },
  },
  categories: {
    select: {
      name: true,
    },
  },
  labels: {
    select: {
      name: true,
    },
  },
  images: true,
};

const getFoodItemCreate = (
  dto: TFoodItemCreateValidatedInput
): Prisma.FoodItemCreateInput => {
  const baseInput: Prisma.FoodItemCreateInput = {
    name: dto.name,
    barcode: dto.barcode,
    calories: dto.calories,
    proteins: dto.proteins,
    carbohydrates: dto.carbohydrates ?? 0,
    saturatedFat: dto.saturatedFat,
    fat: dto.fat,
    fiber: dto.fiber,
    sugars: dto.sugars,
    salt: dto.salt,
    cholesterol: dto.cholesterol,
  };

  if (dto.images?.length) {
    baseInput.images = {
      connectOrCreate: dto.images.map((image) => ({
        where: { url: image.url },
        create: { url: image.url, altText: image.altText },
      })),
    };
  }
  if (dto.labels?.length) {
    baseInput.labels = {
      connectOrCreate: (dto?.labels ?? []).map(({ name }) => ({
        where: { name },
        create: { name, createdAt: new Date() },
      })),
    };
  }

  if (dto.brand) {
    baseInput.brand = {
      connectOrCreate: {
        where: { name: dto.brand[0].name },
        create: { name: dto.brand[0].name },
      },
    };
  }

  if (dto.categories?.length) {
    baseInput.categories = {
      connectOrCreate: (dto?.categories ?? []).map(({ name }) => ({
        where: { name },
        create: { name },
      })),
    };
  }

  return baseInput;
};

const handleFoodItemInfoUpdate = (
  baseInput: Prisma.FoodItemUpdateInput,
  key: "labels" | "categories",
  infos?: Array<IFoodItemInfoEditBase | undefined> | undefined
) => {
  const infoToConnect = infos?.filter(
    (info) => info?.crudOperation === "create"
  );
  const infoToDisconnect = infos?.filter(
    (info) => info?.crudOperation === "delete"
  );

  //TODO:Theoretically name must exist, maybe add name validation also here?
  // if (infoToConnect?.length) {
  //   baseInput[key] = {
  //     connectOrCreate: infoToConnect.map((info) => ({
  //       where: { name: info?.name! },
  //       create: { name: info?.name!, createdAt: new Date() },
  //     })),
  //   };
  // }

  baseInput[key] = {
    connectOrCreate: infoToConnect?.map((info) => ({
      where: { name: info?.name! },
      create: { name: info?.name!, createdAt: new Date() },
    })),
    disconnect: infoToDisconnect?.map((info) => ({
      name: info?.name!,
    })),
  };
  return;
};

const getFoodItemUpdate = (
  dto: TFoodItemUpdateValidatedInput
): Prisma.FoodItemUpdateInput => {
  const baseInput: Prisma.FoodItemUpdateInput = dbUtil.cleanData({
    name: dto.name,
    barcode: dto.barcode,
    calories: dto.calories,
    proteins: dto.proteins,
    carbohydrates: dto.carbohydrates ?? 0,
    fat: dto.fat,
    fiber: dto.fiber,
    sugars: dto.sugars,
    salt: dto.salt,
    cholesterol: dto.cholesterol,
    saturatedFat: dto.saturatedFat,
  });

  if (dto.images?.length) {
    baseInput.images = {
      connectOrCreate: dto.images.map((image) => ({
        where: { url: image.url },
        create: { url: image.url, altText: image.altText },
      })),
    };
  }

  debugger;
  handleFoodItemInfoUpdate(baseInput, "labels", dto?.labels);
  handleFoodItemInfoUpdate(baseInput, "categories", dto?.categories);

  const brandToDisconnect = dto?.brand?.filter(
    (label) => label?.crudOperation === "delete"
  );
  const brandToConnect = dto?.brand?.filter(
    (label) => label?.crudOperation === "create"
  );

  if (brandToConnect?.length) {
    baseInput.brand = {
      connectOrCreate: {
        where: { name: brandToConnect[0]?.name! },
        create: { name: brandToConnect[0]?.name! },
      },
    };
  }

  // if (brandToDisconnect?.length) {
  //   baseInput.brand = {
  //     ...baseInput.brand,
  //     disconnect: {
  //       name: brandToDisconnect[0]?.name!,
  //     },
  //   };
  // }
  return baseInput;
};

export const foodItemSQL = {
  FOOD_ITEM_SQL,
  getFoodItemCreate,
  getFoodItemUpdate,
};
