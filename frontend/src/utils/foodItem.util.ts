import type {
  IFoodItemEditDTO,
  IFoodItemDTO,
  IFoodItemInfoEditDTO,
} from "../../../shared/models/foodItem.model";
import { getTempId } from "../../../shared/utils/getTempId";

const getEmpty = ({
  barcode,
  name,
}: {
  barcode?: string;
  name?: string;
}): IFoodItemEditDTO => {
  return {
    id: getTempId(),
    carbohydrates: 0,
    fat: 0,
    fiber: 0,
    sugars: 0,
    salt: 0,
    cholesterol: 0,
    saturatedFat: 0,
    name,
    barcode,
    calories: 0,
    proteins: 0,
    brand: [],
    images: [],
    labels: [],
    categories: [],
  };
};

const getEmptyInfo = (): IFoodItemInfoEditDTO => {
  return {
    id: getTempId(),
    name: "",
    crudOperation: "create",
  };
};

const dtoToEditDto = ({ dto }: { dto: IFoodItemDTO }): IFoodItemEditDTO => {
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
