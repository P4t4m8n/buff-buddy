//Hooks
import { usePageBack } from "../../../hooks/shared/usePageBack";
import { useFoodItemEdit } from "../../../hooks/features/foodItem/useFoodItemEdit";
import { useFoodItemCategoriesQuery } from "../../../hooks/features/foodItem/useFoodItemCategoriesQuery";
import { useFoodItemLabelsQuery } from "../../../hooks/features/foodItem/useFoodItemLabelsQuery";
import { useFoodItemBrandsQuery } from "../../../hooks/features/foodItem/useFoodItemBrandsQuery";
//Components
import NutritionEditNumber from "./NutritionEditNumber";
import FoodItemEditAddInfo from "./FoodItemEditAddInfo";
//UI
import Loader from "../../UI/loader/Loader";
import InputWithError from "../../UI/Form/InputWithError";
import GenericList from "../../UI/GenericList";
import Button from "../../UI/Button";
import IconArrow from "../../UI/Icons/IconArrow";
import GenericItemEditInfoSelect from "../../UI/GenericItemEditInfoSelect";
import GenericSaveButton from "../../UI/GenericSaveButton";
//Types
import type { IModelProps } from "../../../models/model.model";
import type { TFoodItemInfo } from "../../../../../shared/models/foodItem.model";

interface IFoodItemEditProps extends IModelProps<HTMLFormElement> {
  foodItemId?: string;
  foodItemBarcode?: string;
  foodItemName?: string;
}
export default function FoodItemEdit({
  foodItemId,
  foodItemBarcode,
  foodItemName,
  modelRef,
  handleModel,
  setIsOpen,
}: IFoodItemEditProps) {
  const {
    foodItemToEdit,
    isLoading,
    isSaving,
    errors,
    saveFoodItem,
    onInputChange,
    handleFoodItemInfo,
  } = useFoodItemEdit({ foodItemId, foodItemName, foodItemBarcode });

  const { onBack } = usePageBack();

  if (isLoading || !foodItemToEdit) return <Loader />;

  const {
    id: foodItemToEditId,
    barcode,
    name,
    brand,
    labels,
    categories,
    images,
    ownerId,
    ...rest
  } = foodItemToEdit;

  const numberInputs: [string, string | number | unknown][] =
    Object.entries(rest);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const isSuccess = await saveFoodItem();

    if (!isSuccess || !setIsOpen) {
      console.warn(
        "Could not save food item or no setIsOpen function provided, this should not happen"
      );
      return;
    }
    if (isSuccess && setIsOpen) setIsOpen(false);
  };

  const foodItemInfos = [
    {
      inputName: "brand",
      selectedList: brand,
      queryHook: useFoodItemBrandsQuery,
    },
    {
      inputName: "categories",
      selectedList: categories,
      queryHook: useFoodItemCategoriesQuery,
    },
    {
      inputName: "labels",
      selectedList: labels,
      queryHook: useFoodItemLabelsQuery,
    },
  ];

  const inputs = [
    { label: "Food Name", name: "name", value: name },
    { label: "Barcode or Name", name: "barcode", value: barcode?.toString() },
  ];

  return (
    <form
      onSubmit={onSubmit}
      ref={modelRef}
      className="bg-black-500 p-4 grid gap-4 rounded w-[calc(100%-1rem)]
                   max-w-96 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 border"
    >
      <Button
        className="border-main-orange border rounded-full w-10 aspect-auto -rotate-90"
        onClick={handleModel ?? onBack}
      >
        <IconArrow className="w-full aspect-square fill-main-orange" />
      </Button>

      {inputs.map(({ label, name, value }) => (
        <InputWithError
          key={name}
          inputProps={{
            type: "text",
            name: name,
            id: name + foodItemToEditId,
            placeholder: "",
            value: value??"",
            className: "h-10 pl-2 ",
            onChange: onInputChange,
          }}
          divStyle=""
          labelProps={{
            htmlFor: name + foodItemToEditId,
            children: <>{label}</>,
            isMoveUpEffect: true,
          }}
          error={errors?.[name as keyof typeof errors]}
        />
      ))}

      {foodItemInfos.map(({ inputName, queryHook, selectedList }) => (
        <GenericItemEditInfoSelect
          key={inputName}
          queryHook={queryHook}
          filter={{}}
          inputName={inputName as TFoodItemInfo}
          selectedList={selectedList}
          parentModelRef={modelRef}
          handleSelectInfo={handleFoodItemInfo}
          AddComponent={(props) => (
            <FoodItemEditAddInfo
              {...props}
              inputName={inputName as TFoodItemInfo}
              handleFoodItemInfo={handleFoodItemInfo}
            />
          )}
        />
      ))}

      <GenericList
        items={numberInputs}
        ItemComponent={NutritionEditNumber}
        getKey={(item) => item[0] ?? ""}
        itemComponentProps={{
          inputId: foodItemToEditId!,
          onChange: onInputChange,
        }}
        ulStyle="grid-cols-3 grid items-center justify-items-center"
      />

      <div className="grid grid-cols-2 gap-8">
        <Button
          type="button"
          buttonStyle="warning"
          className="w-full"
          onClick={handleModel}
        >
          Cancel
        </Button>
        <GenericSaveButton isSaving={isSaving} />
      </div>
    </form>
  );
}
