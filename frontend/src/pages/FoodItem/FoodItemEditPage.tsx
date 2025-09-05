import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFoodItemMutationKeyStore } from "../../store/foodItemMutationKey.store";
import type { IFoodItemEditDto } from "../../../../shared/models/foodItem.model";
import { foodItemService } from "../../services/foodItems.service";
import { foodItemUtil } from "../../utils/foodItem.util";
import useFoodItemIdQuery from "../../hooks/queryHooks/useFoodItemIdQuery";
import Loader from "../../components/UI/loader/Loader";
import InputWithError from "../../components/UI/Form/InputWithError";
import { useErrors } from "../../hooks/shared/useErrors";
import BackButton from "../../components/UI/BackButton";
import { formUtil } from "../../utils/form.util";
import GenericList from "../../components/UI/GenericList";
import NutritionEditNumber from "../../components/FoodItem/NutritionEditNumber";
import Button from "../../components/UI/Button";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../lib/queryClient";

export default function FoodItemEditPage() {
  const { foodItemId } = useParams<{ foodItemId?: string }>();
  const getKey = useFoodItemMutationKeyStore((store) => store.getMutationKey);
  const [foodItemToEdit, setFoodItemToEdit] = useState<IFoodItemEditDto | null>(
    null
  );

  const { data, isLoading } = useFoodItemIdQuery(foodItemId);
  const { errors } = useErrors<IFoodItemEditDto>();

  const mutation = useMutation({
    mutationFn: (dto: IFoodItemEditDto) => foodItemService.save(dto),
    onSuccess({ data }) {
      queryClient.setQueryData(["foodItems", getKey()], data);
    },
    onError(error) {
      console.error(error);
    },
  });

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
  }, [foodItemId]);

  if (isLoading || !foodItemToEdit) return <Loader />;

  const {
    images,
    labels,
    barcode,
    brand,
    name,
    id: foodItemToEditId,
  } = foodItemToEdit;

  const filterKeys = ["images", "labels", "brand", "name", "id", "barcode"];

  const numberInputs: [string, string | number | unknown][] = Object.entries(
    foodItemToEdit
  ).filter(([key, _]) => !filterKeys.includes(key));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const key = getKey();

    mutation.mutate(foodItemToEdit);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formUtil.handleInputChange(e, setFoodItemToEdit);
  };
  return (
    <form onSubmit={onSubmit} className="h-main flex flex-col w-full p-4 gap-8">
      <BackButton />

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
          name: "brand",
          id: "brand" + foodItemToEditId,
          placeholder: "",
          value: brand ?? "",
          className: "h-10 pl-2",
          onChange: onChange,
        }}
        divStyle=""
        labelProps={{
          htmlFor: "brand" + foodItemToEditId,
          children: "Brand Name",
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
          value: barcode,
          className: "h-10 pl-2",
          onChange: onChange,
        }}
        divStyle=""
        labelProps={{
          htmlFor: "barcode" + foodItemToEditId,
          children: "Barcode Name",
          isMoveUpEffect: true,
        }}
        error={errors?.name}
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
        className={`bg-inherit border-1 flex-center  hover:bg-main-orange h-full w-full
                                   hover:text-white rounded transition-all duration-300
                                   hover:cursor-pointer  `}
      >
        {false ? <Loader loaderType="spinner" /> : "Save"}
      </Button>
    </form>
  );
}
