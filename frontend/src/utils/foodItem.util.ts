import type {
  IFoodItemEditDto,
  IFoodItemDto,
  IFoodItemInfoEditBase,
} from "../../../shared/models/foodItem.model";
import { appUtil } from "./app.util";

const getEmpty = (): IFoodItemEditDto => {
  return {
    id: appUtil.getTempId(),
    carbohydrates: 0,
    fats: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0,
    cholesterol: 0,
    saturatedFat: 0,
    name: "",
    barcode: "",
    calories: 0,
    protein: 0,
    brand: [],
    images: [],
    labels: [],
    categories: [],
  };
};

const getEmptyInfo = (): IFoodItemInfoEditBase => {
  return {
    id: appUtil.getTempId(),
    name: "",
    crudOperation: "create",
  };
};

const dtoToEditDto = (dto: IFoodItemDto): IFoodItemEditDto => {
  return {
    ...dto,
    brand: dto.brand ? [{ ...dto.brand }] : [],
    images: dto.images?.map((img) => img.url) || [],
  };
};

export const foodItemUtil = {
  getEmpty,
  dtoToEditDto,
  getEmptyInfo,
};
