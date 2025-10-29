//Lib
import { useEffect } from "react";
//Consts
import { QUERY_KEYS } from "../../../consts/queryKeys.consts";
//Services
import { foodItemService } from "../../../services/foodItems.service";
import { ClientError } from "../../../services/ClientError.service";
//Utils
import { foodItemUtil } from "../../../utils/foodItem.util";
import { formUtil } from "../../../utils/form.util";
import { foodItemValidation } from "../../../../../shared/validations/foodItem.validation";
import { validationUtil } from "../../../../../shared/validations/util.validation";
//Hooks
import { useErrors } from "../../shared/useErrors";
import { useItemEdit } from "../../shared/useItemEdit";
import { useFoodItemIdQuery } from "./useFoodItemIdQuery";
import { useAuthStore } from "../../../store/auth.store";
//Types
import type {
  IFoodItemDTO,
  IFoodItemEditDTO,
  IFoodItemInfoDTO,
  TFoodItemInfo,
} from "../../../../../shared/models/foodItem.model";

interface IUseFoodItemEditProps {
  foodItemId?: string;
  foodItemBarcode?: string;
  foodItemName?: string;
}

export const useFoodItemEdit = ({
  foodItemId,
  foodItemBarcode,
  foodItemName,
}: IUseFoodItemEditProps) => {
  const {
    itemToEdit: foodItemToEdit,
    setItemToEdit: setFoodItemToEdit,
    mutateAsync,
    queryError,
    isLoading,
    isSaving,
  } = useItemEdit<IFoodItemEditDTO, IFoodItemDTO>({
    storeMutationKey: QUERY_KEYS.FOOD_ITEM_MUTATION_KEY,
    itemId: foodItemId,
    queryIdKey: QUERY_KEYS.FOOD_ITEM_ID_QUERY_KEY,
    saveFn: foodItemService.save,
    useIdQuery: useFoodItemIdQuery,
    dtoToEditDto: foodItemUtil.dtoToEditDto,
    getEmpty: () =>
      foodItemUtil.getEmpty({ barcode: foodItemBarcode, name: foodItemName }),
  });

  const { handleError, setSingleFiledError, errors } =
    useErrors<IFoodItemEditDTO>();

  useEffect(() => {
    if (queryError) handleError({ error: queryError, emitToToast: true });
  }, [queryError]);

  const saveFoodItem = async () => {
    try {
      if (!foodItemToEdit) {
        throw ClientError.create(
          "No food item to save, this should not happen"
        );
      }

      const ownerId = useAuthStore.getState().user?.id || null;
      foodItemToEdit.ownerId = ownerId;

      const res = await mutateAsync(foodItemToEdit);

      return !!res.data.id;
    } catch (error) {
      handleError({ error, emitToToast: true });
    }
  };

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const factory = _getValidationFactory();
    formUtil.onInputChangeWithValidation({
      event,
      setStateToEdit: setFoodItemToEdit,
      factory,
      setSingleFiledError,
    });
  };

  const handleFoodItemInfo = (
    option: IFoodItemInfoDTO,
    inputName?: TFoodItemInfo
  ) => {
    if (!foodItemToEdit) {
      throw ClientError.create(
        "No food item to handle, this should not happen"
      );
    }

    if (!inputName) {
      throw ClientError.create(
        "handleFoodItemInfo called without inputName, this should not happen"
      );
    }
    const factory = _getValidationFactory();

    const { error } = validationUtil.validateFieldOnly({
      toSanitize: false,
      factory,
      value: [option],
      field: inputName,
    });

    setSingleFiledError({
      key: inputName,
      error,
    });

    setFoodItemToEdit((prev) => {
      if (!prev) return prev;

      const currentItems = prev[inputName] || [];
      const idx = currentItems.findIndex((item) => item.name === option.name);

      if (idx > -1) {
        return {
          ...prev,
          [inputName]: currentItems.map((item) =>
            item.name === option.name
              ? {
                  ...item,
                  crudOperation:
                    item.crudOperation != "delete" ? "delete" : "create",
                }
              : item
          ),
        };
      }

      return {
        ...prev,
        [inputName]: [...currentItems, { ...option, crudOperation: "create" }],
      };
    });
  };

  const _getValidationFactory = () => {
    return foodItemToEdit?.id?.startsWith("temp")
      ? foodItemValidation.createFactorySchema
      : foodItemValidation.updateFactorySchema;
  };

  return {
    foodItemToEdit,
    isLoading,
    isSaving,
    errors,
    saveFoodItem,
    onInputChange,
    handleFoodItemInfo,
  };
};
