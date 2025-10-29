import { useEffect } from "react";
import type { MealType } from "../../../../../backend/prisma/generated/prisma";
import type {
  IMealDTO,
  IMealEditDTO,
  IMealFoodItemEditDTO,
} from "../../../../../shared/models/meal.model";
import { QUERY_KEYS } from "../../../consts/queryKeys.consts";
import { ClientError } from "../../../services/ClientError.service";
import { mealService } from "../../../services/meal.service";
import { useAuthStore } from "../../../store/auth.store";
import { mealUtil } from "../../../utils/meal.util";
import { useErrors } from "../../shared/useErrors";
import { useItemEdit } from "../../shared/useItemEdit";
import useMealIdQuery from "./useMealIdQuery";
import { mealValidation } from "../../../../../shared/validations/meal.validations";
import { formUtil } from "../../../utils/form.util";

const _getValidationFactory = (id?: string) => {
  return id?.startsWith("temp")
    ? mealValidation.createFactorySchema
    : mealValidation.updateFactorySchema;
};

export const useMealEdit = ({ mealId }: { mealId?: string }) => {
  const {
    itemToEdit: mealToEdit,
    setItemToEdit: setMealToEdit,
    mutateAsync,
    queryError,
    isLoading,
    isSaving,
  } = useItemEdit<IMealEditDTO, IMealDTO>({
    itemId: mealId,
    storeMutationKey: QUERY_KEYS.MEAL_MUTATION_KEY,
    queryIdKey: QUERY_KEYS.MEAL_ID_QUERY_KEY,
    saveFn: mealService.save,
    useIdQuery: useMealIdQuery,
    dtoToEditDto: mealUtil.dtoToEditDto,
    getEmpty: mealUtil.getEmpty,
  });
  const { errors, handleError, setSingleFiledError } =
    useErrors<IMealEditDTO>();

  useEffect(() => {
    if (queryError) handleError({ error: queryError, emitToToast: true });
  }, [queryError]);

  const saveMeal = async () => {
    try {
      if (!mealToEdit) {
        throw ClientError.create("Workout to edit is not defined");
      }
      
      const ownerId = useAuthStore.getState().user?.id || null;
      mealToEdit.ownerId = ownerId;
      
      const factory = _getValidationFactory(mealToEdit.id);
      
      const validatedData = factory({ toSanitize: false }).parse(mealToEdit);

      const { data } = await mutateAsync(validatedData);
      return data;
    } catch (error) {
      handleError({ error, emitToToast: true });
    }
  };

  const handleType = (mealType: MealType) => {
    setMealToEdit((prev) => (prev ? { ...prev, mealType } : prev));
  };

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const factory = _getValidationFactory(mealToEdit?.id);

    formUtil.onInputChangeWithValidation({
      event,
      setStateToEdit: setMealToEdit,
      factory,
      setSingleFiledError,
    });
  };

  const handleMealFoodItem = (mealFoodItem: IMealFoodItemEditDTO) => {
    setMealToEdit((prev) => {
      if (!prev) return prev;

      const mealFoodItems = prev.mealFoodItems ?? [];

      const idx =
        mealFoodItems?.findIndex(
          (mfi) => mfi.foodItem?.name === mealFoodItem.foodItem?.name
        ) ?? -1;

      if (idx < 0)
        return {
          ...prev,
          mealFoodItems: [...mealFoodItems, mealFoodItem],
        };

      return {
        ...prev,
        mealFoodItems: mealFoodItems.toSpliced(idx, 1, mealFoodItem),
      };
    });
  };

  const removeMealFoodItem = (mealFoodItemId?: string) => {
    if (!mealFoodItemId) return;
    setMealToEdit((prev) => {
      if (!prev) return prev;
      
      const mealFoodItems = prev.mealFoodItems ?? [];
      
      const idx =
      mealFoodItems?.findIndex((mfi) => mfi.id === mealFoodItemId) ?? -1;
      
      if (idx < 0) return prev;
      
      const mealFoodItem = mealFoodItems[idx];
      
      if (mealFoodItem.id?.startsWith("temp"))
        return {
      ...prev,
      mealFoodItems: mealFoodItems.toSpliced(idx, 1),
    };
    
      const itemToDelete: IMealFoodItemEditDTO = {
        ...mealFoodItem,
        crudOperation: "delete",
      };
      return {
        ...prev,
        mealFoodItems: mealFoodItems.toSpliced(idx, 1, itemToDelete),
      };
    });
  };

  return {
    handleType,
    handleMealFoodItem,
    removeMealFoodItem,
    saveMeal,
    onInputChange,
    errors,
    mealToEdit,
    isLoading,
    isSaving,
  };
};
