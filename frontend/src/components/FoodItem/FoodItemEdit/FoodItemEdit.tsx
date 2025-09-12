import { useEffect, useState } from "react";
import { useFoodItemMutationKeyStore } from "../../../store/foodItemMutationKey.store";
import type {
  IFoodItemBrandEditDto,
  IFoodItemDto,
  IFoodItemEditDto,
  IFoodItemInfoEditBase,
  TFoodItemInfo,
} from "../../../../../shared/models/foodItem.model";
import useFoodItemIdQuery from "../../../hooks/queryHooks/useFoodItemIdQuery";
import { useErrors } from "../../../hooks/shared/useErrors";
import { useMutation } from "@tanstack/react-query";
import { foodItemService } from "../../../services/foodItems.service";
import { queryClient } from "../../../lib/queryClient";
import { foodItemUtil } from "../../../utils/foodItem.util";
import Loader from "../../UI/loader/Loader";
import InputWithError from "../../UI/Form/InputWithError";
import GenericList from "../../UI/GenericList";
import NutritionEditNumber from "../NutritionEditNumber";
import Button from "../../UI/Button";
import { formUtil } from "../../../utils/form.util";
import type { IModelProps } from "../../../models/UI.model";
import { usePageBack } from "../../../hooks/shared/usePageBack";
import IconArrow from "../../UI/Icons/IconArrow";
import FoodItemEditInfo from "./FoodItemEditInfo";
import { toTitle } from "../../../utils/toTitle";
import FoodItemEditBrand from "./FoodItemBrand/FoodItemEditBrand";

interface IFoodItemEditProps extends IModelProps<HTMLFormElement> {
  foodItemId?: string;
}
export default function FoodItemEdit({
  foodItemId,
  ...props
}: IFoodItemEditProps) {
  const getKey = useFoodItemMutationKeyStore((store) => store.getMutationKey);
  const [foodItemToEdit, setFoodItemToEdit] = useState<IFoodItemEditDto | null>(
    null
  );
  const { handleModel, setIsOpen, modelRef } = props;
  const { onBack } = usePageBack();

  const { data, isLoading } = useFoodItemIdQuery(foodItemId);
  const { errors, handleError } = useErrors<IFoodItemEditDto>();

  const mutation = useMutation({
    mutationFn: (dto: IFoodItemEditDto) => foodItemService.save(dto),
    onSuccess({ data }) {
      //INFO: Update the list base on the cache key
      queryClient.setQueryData<IFoodItemDto[]>(getKey(), (old) => {
        const idx =
          old?.findIndex((oldFoodItem) => oldFoodItem.name === data.name) ?? -1;
        if (idx < 0) return [...(old ?? []), data];
        return [...(old?.toSpliced(idx, 1, data) ?? [])];
      });
      //INFO: Update the EDIT and Details route
      queryClient.setQueryData<IFoodItemDto>(
        ["foodItemId", data.id],
        (old) => ({ ...old, ...data })
      );
    },
    onError(error) {
      handleError({ error, emitToToast: true });
    },
  });

  const { status } = mutation;

  useEffect(() => {
    const init = async () => {
      const foodItem =
        foodItemId && data
          ? foodItemUtil.dtoToEditDto(data)
          : foodItemUtil.getEmpty();
      setFoodItemToEdit(foodItem);
      return;
    };
    init();
  }, [foodItemId, data]);

  if (isLoading || !foodItemToEdit) return <Loader />;

  const {
    id: foodItemToEditId,
    barcode,
    name,
    brand,
    labels,
    categories,
    images,
    ...rest
  } = foodItemToEdit;

  const numberInputs: [string, string | number | unknown][] =
    Object.entries(rest);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    await mutation.mutateAsync(foodItemToEdit);
    if (setIsOpen) setIsOpen(false);
    else onBack();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    formUtil.handleInputChange(e, setFoodItemToEdit);
  };

  const addItemInfo = (name: TFoodItemInfo, infoName: string) => {
    setFoodItemToEdit((prev) => {
      if (!prev) return prev;
      const items = (prev[name] ?? []) as IFoodItemInfoEditBase[];

      const isInArray = items.includes({ name: infoName });
      if (isInArray) {
        handleError({ error: `${infoName} is in ${name}`, emitToToast: true });
        return prev;
      }

      const newItem = foodItemUtil.getEmptyInfo();
      newItem.name = infoName;

      return {
        ...prev,
        [name]: [...items, newItem],
      };
    });
  };

  const removeItemInfo = (name: TFoodItemInfo, infoName: string) => {
    setFoodItemToEdit((prev) => {
      if (!prev) return prev;
      const items = (prev[name] ?? []) as IFoodItemInfoEditBase[];

      const idx = items.findIndex((info) => info.name === infoName) ?? -1;
      if (idx < 0) {
        console.warn("item not found");
        return prev;
      }

      const removedItem = { ...items?.[idx] };

      removedItem.crudOperation = "delete";
      const updatedItems = items.toSpliced(idx, 1, removedItem);

      return {
        ...prev,
        [name]: updatedItems,
      };
    });
  };

  const handleEditBrand = (name: string) => {
    setFoodItemToEdit((prev) => {
      if (!prev) return prev;

      const brand: IFoodItemBrandEditDto[] =
        prev.brand
          ?.filter((b) => b.crudOperation !== "create")
          .map((b) =>
            b.crudOperation !== "delete" ? { ...b, crudOperation: "delete" } : b
          ) ?? [];

      const newBrand = foodItemUtil.getEmptyInfo();
      newBrand.name = name;
      brand.push(newBrand);

      return {
        ...prev,
        brand,
      };
    });
  };
  return (
    <form
      onSubmit={onSubmit}
      ref={modelRef}
      className="h-main fixed inset-0 z-50 flex flex-col w-full p-4 gap-4 bg-black-900"
    >
      <Button
        className="border-main-orange border rounded-full w-10 aspect-auto -rotate-90"
        onClick={handleModel ?? onBack}
      >
        <IconArrow className="w-full aspect-square fill-main-orange" />
      </Button>

      <InputWithError
        inputProps={{
          type: "text",
          name: "name",
          id: "name" + foodItemToEditId,
          placeholder: "",
          value: name,
          className: "h-10 pl-2 ",
          onChange: onChange,
        }}
        divStyle=""
        labelProps={{
          htmlFor: "name" + foodItemToEditId,
          children: "Food Name",
          isMoveUpEffect: true,
        }}
        error={errors?.name}
      />

      <InputWithError
        inputProps={{
          type: "text",
          name: "barcode",
          id: "barcode" + foodItemToEditId,
          placeholder: "",
          value: barcode ?? "",
          className: "h-10 pl-2",
          onChange: onChange,
        }}
        divStyle=""
        labelProps={{
          htmlFor: "barcode" + foodItemToEditId,
          children: "Barcode or Name",
          isMoveUpEffect: true,
        }}
        error={errors?.barcode}
      />
      <FoodItemEditBrand brand={brand} handleEditBrand={handleEditBrand} />

      <FoodItemEditInfo
        name="labels"
        items={labels}
        foodItemToEditId={foodItemToEditId}
        addItem={addItemInfo}
        removeItem={removeItemInfo}
      />
      <FoodItemEditInfo
        name="categories"
        items={categories}
        foodItemToEditId={foodItemToEditId}
        addItem={addItemInfo}
        removeItem={removeItemInfo}
      />

      <GenericList
        items={numberInputs}
        ItemComponent={NutritionEditNumber}
        getKey={(item) => item[0] ?? ""}
        itemComponentProps={{ inputId: foodItemToEditId!, onChange }}
        ulStyle="grid-cols-3 grid items-center justify-items-center"
      />

      <Button
        type="submit"
        className={`bg-inherit border-1 flex-center hover:bg-main-orange h-fit w-full px-2 py-1
                  hover:text-white rounded transition-all duration-300 mt-auto  `}
      >
        {false ? <Loader loaderType="spinner" /> : "Save"}
      </Button>
    </form>
  );
}
