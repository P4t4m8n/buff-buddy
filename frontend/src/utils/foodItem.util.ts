import type {
  IFoodItemEditDTO,
  IFoodItemDTO,
  IFoodItemInfoEditBase,
} from "../../../shared/models/foodItem.model";
import { getTempId } from "../../../shared/utils/getTempId";

const getEmpty = (): IFoodItemEditDTO => {
  return {
    id: getTempId(),
    carbohydrates: 0,
    fat: 0,
    fiber: 0,
    sugars: 0,
    salt: 0,
    cholesterol: 0,
    saturatedFat: 0,
    name: "",
    barcode: "",
    calories: 0,
    proteins: 0,
    brand: [],
    images: [],
    labels: [],
    categories: [],
  };
};

const getEmptyInfo = (): IFoodItemInfoEditBase => {
  return {
    id: getTempId(),
    name: "",
    crudOperation: "create",
  };
};

const dtoToEditDto = (dto: IFoodItemDTO): IFoodItemEditDTO => {
  return {
    ...dto,
    brand: dto.brand ? [{ ...dto.brand }] : [],
    images: dto.images?.map((img) => img) || [],
  };
};

export const foodItemUtil = {
  getEmpty,
  dtoToEditDto,
  getEmptyInfo,
};
