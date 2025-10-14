import { apiService } from "./api.service";

import { foodItemValidation } from "../../../shared/validations/foodItem.validation";
import { genericServiceFactory } from "./generic.service";

import type {
  IFoodItemInfoDTO,
  IFoodItemDTO,
  IFoodItemEditDTO,
  IFoodItemFilter,
  IFoodItemInfoFilter,
  TFoodItemInfo,
} from "../../../shared/models/foodItem.model";

import type {
  TFoodItemCreateValidatedInput,
  TFoodItemUpdateValidatedInput,
  TFoodItemQuery,
} from "../../../shared/validations/foodItem.validation";

const rootPath = "/food-items";

const genericFoodItemService = genericServiceFactory<
  IFoodItemDTO,
  IFoodItemEditDTO,
  IFoodItemFilter,
  TFoodItemCreateValidatedInput,
  TFoodItemUpdateValidatedInput,
  TFoodItemQuery
>({
  rootPath,
  validation: foodItemValidation,
});

const getFoodItemInfo = (
  filter: IFoodItemInfoFilter | null,
  endPointInfo: TFoodItemInfo
) => {
  return apiService.get<IFoodItemInfoDTO[]>(
    `${rootPath}/info/${endPointInfo}`,
    filter
  );
};

export const foodItemService = {
  ...genericFoodItemService,
  getFoodItemInfo,
};
