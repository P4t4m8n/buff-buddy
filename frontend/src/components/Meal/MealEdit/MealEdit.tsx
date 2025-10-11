import { useEffect, useState } from "react";

import useQueryIdHook from "../../../hooks/queryHooks/useQueryIdHook";
import useItemMutation from "../../../hooks/queryHooks/useItemMutation";
import { usePageBack } from "../../../hooks/shared/usePageBack";

import { QUERY_KEYS } from "../../../consts/queryKeys.consts";
import { MEAL_TYPES } from "../../../../../shared/consts/meal.consts";

import { mealService } from "../../../services/meal.service";

import { useAuthStore } from "../../../store/auth.store";

import { mealUtil } from "../../../utils/meal.util";
import { formUtil } from "../../../utils/form.util";

import MealFoodItemEditModel from "./MealFoodItemEditModel";
import MealFoodItemPreview from "../MealFoodItemPreview";

import Loader from "../../UI/loader/Loader";
import BackButton from "../../UI/BackButton";
import InputWithError from "../../UI/Form/InputWithError";
import TextArea from "../../UI/Form/TextArea";
import Label from "../../UI/Form/Label";
import SelectWithSearch from "../../UI/Form/SelectWithSearch/SelectWithSearch";
import GenericSelectItem from "../../UI/Form/SelectWithSearch/GenericSelectItem";
import GenericModel from "../../UI/GenericModel";
import Button from "../../UI/Button";
import GenericList from "../../UI/GenericList";

import type {
  IMealDTO,
  IMealEditDTO,
  IMealFoodItemEditDTO,
} from "../../../../../shared/models/meal.model";
import type { MealType } from "../../../../../backend/prisma/generated/prisma";
import { useErrors } from "../../../hooks/shared/useErrors";

interface IMealEditProps {
  mealIdParams?: string;
}
export default function MealEdit({ mealIdParams }: IMealEditProps) {
  const [mealToEdit, setMealToEdit] = useState<IMealEditDTO | null>(null);

  const { data, isLoading } = useQueryIdHook({
    id: mealIdParams,
    queryKey: QUERY_KEYS.MEAL_ID_QUERY_KEY,
    queryFn: mealService.getById,
  });
  const x = data?.data;

  const ownerId = useAuthStore((store) => store.user?.id);
  const { errors, handleError } = useErrors<IMealEditDTO>();

  const { mutateAsync } = useItemMutation<IMealEditDTO, IMealDTO>({
    listKey: [QUERY_KEYS.MEALS_QUERY_KEY],
    itemIdKey: [QUERY_KEYS.MEAL_ID_QUERY_KEY, mealIdParams ?? ""],
    saveFn: mealService.save,
    filterFn: (oldItem, savedItem) => oldItem.id === savedItem.id,
  });

  const { onBack } = usePageBack();

  useEffect(() => {
    const init = async () => {
      const meal =
        mealIdParams && data
          ? mealUtil.dtoToEditDto(x!)
          : mealUtil.getEmpty(ownerId);
      setMealToEdit(meal);
      return;
    };
    init();
  }, [mealIdParams, data]);

  if (isLoading || !mealToEdit) {
    return <Loader loaderType="screen" />;
  }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      await mutateAsync(mealToEdit);
      onBack();
    } catch (error) {
      handleError({ error });
    }
  };

  const handleType = (mealType: MealType) => {
    setMealToEdit((prev) => (prev ? { ...prev, mealType } : prev));
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
        mealFoodItems: mealFoodItems.toSpliced(1, idx, mealFoodItem),
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
          mealFoodItems: mealFoodItems.toSpliced(1, idx),
        };

      const itemToDelete: IMealFoodItemEditDTO = {
        ...mealFoodItem,
        crudOperation: "delete",
      };
      return {
        ...prev,
        mealFoodItems: mealFoodItems.toSpliced(1, idx, itemToDelete),
      };
    });
  };

  const {
    id: mealId,
    name: mealName,
    notes: mealNotes,
    mealType,
    mealFoodItems,
  } = mealToEdit;

  const headerText = !mealId?.startsWith("temp")
    ? `Edit Meal: `
    : `Create New Meal`;

  const cleanMealFoodItems =
    mealFoodItems?.filter((m) => m.crudOperation !== "delete") ?? [];

  return (
    <div className=" bg-black-900 p-4 h-main">
      <BackButton />
      <form onSubmit={onSubmit} className="text-main-orange grid  gap-4">
        <header className="grid gap-4">
          <h2 className="text-2xl font-semibold truncate text-center">
            {headerText}
          </h2>
          <InputWithError
            inputProps={{
              value: mealName || "",
              type: "text",
              name: "name",
              id: "name-" + mealId,
              placeholder: "",
              onChange: (e) => formUtil.handleInputChange(e, setMealToEdit),
              className: "h-10 pl-2",
            }}
            labelProps={{
              htmlFor: "name" + mealId,
              children: "Meal Name",
              isMoveUpEffect: true,
            }}
            error={errors?.name}
            divStyle=""
          />

          <TextArea
            onChange={(e) => formUtil.handleInputChange(e, setMealToEdit)}
            value={mealNotes ?? ""}
            name="notes"
            id={"notes-" + mealId}
            rows={3}
            placeholder=""
            className="peer outline-offset-0 pl-2 resize-none"
            divStyle="border-1 relative rounded "
          >
            <Label
              labelPosition="textArea"
              isMoveUpEffect={true}
              htmlFor={"notes-" + mealId}
            >
              Notes
            </Label>
          </TextArea>

          <SelectWithSearch
            options={MEAL_TYPES}
            handleSelect={handleType}
            SelectedComponent={<p>{mealType}</p>}
            filterBy={(item) => item}
            error={errors?.mealType}
            SelectItemComponent={GenericSelectItem}
          />
        </header>
        <div className="grid grid-cols-[calc(50%-2rem)_25%_25%] h-10 grid-rows-1 gap-4 ">
          <GenericModel
            Model={MealFoodItemEditModel}
            modelProps={{ handleMealFoodItem }}
            mode="create"
            buttonProps={{
              buttonStyle: "model",
              className: " h-full aspect-square",
            }}
            isOverlay={false}
            isPortal={true}
          />

          <Button className="w-full" buttonStyle="warning" onClick={onBack}>
            Cancel
          </Button>
          <Button
            type="submit"
            buttonStyle="save"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? <Loader loaderType="spinner" /> : "Save"}
          </Button>
        </div>
        <GenericList
          items={cleanMealFoodItems}
          ItemComponent={MealFoodItemPreview}
          itemComponentProps={{ removeMealFoodItem, handleMealFoodItem }}
          getKey={(item) => item.id ?? ""}
        />
      </form>
    </div>
  );
}
