import type {
  IFoodItemEditDto,
  IFoodItemDto,
} from "../../../shared/models/foodItem.model";
import { appUtil } from "./app.util";

const getEmpty = (): IFoodItemEditDto => {
  return {
    id: appUtil.getTempId(),
    carbohydrates: "",
    fats: "",
    fiber: "",
    sugar: "",
    sodium: "",
    cholesterol: "",
    name: "",
    barcode: "",
    calories: "",
    protein: "",
    brand: "",
    images: [],
    labels: [],
  };
};

const dtoToEditDto = (dto: IFoodItemDto): IFoodItemEditDto => {
  return {
    ...dto,
    brand: dto.brand?.name || "",
    images: dto.images?.map((img) => img.url) || [],
    labels: dto.labels?.map((label) => label.name) || [],
  };
};

export const foodItemUtil = {
  getEmpty,
  dtoToEditDto,
};
