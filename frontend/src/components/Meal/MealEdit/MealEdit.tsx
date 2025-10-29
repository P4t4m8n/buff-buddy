//Hooks
import { usePageBack } from "../../../hooks/shared/usePageBack";
import { useMealEdit } from "../../../hooks/features/meal/useMealEdit";
//Consts
import { MEAL_TYPES } from "../../../../../shared/consts/meal.consts";
//Components
import MealFoodItemEditModel from "./MealFoodItemEditModel";
import MealFoodItemPreview from "../MealFoodItemPreview";
import MealNutritionDetails from "../MealNutritionDetails/MealNutritionDetails";
//UI
import Loader from "../../UI/loader/Loader";
import InputWithError from "../../UI/Form/InputWithError";
import SelectWithSearch from "../../UI/Form/SelectWithSearch/SelectWithSearch";
import GenericSelectItem from "../../UI/Form/SelectWithSearch/GenericSelectItem";
import GenericModel from "../../UI/GenericModel";
import Button from "../../UI/Button";
import GenericList from "../../UI/GenericList";
import GenericSaveButton from "../../UI/GenericSaveButton";
import TextAreaWithError from "../../UI/Form/TextAreaWithError";

interface IMealEditProps {
  mealIdParams?: string;
}
export default function MealEdit({ mealIdParams }: IMealEditProps) {
  const {
    handleType,
    handleMealFoodItem,
    removeMealFoodItem,
    saveMeal,
    onInputChange,
    errors,
    mealToEdit,
    isLoading,
    isSaving,
  } = useMealEdit({ mealId: mealIdParams });

  const { onBack } = usePageBack();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await saveMeal();
    if (!res) {
      console.error(
        "Meal not saved, and error was not thrown this should not happen"
      );
      return;
    }

    onBack();
  };

  if (isLoading || !mealToEdit) {
    return <Loader loaderType="screen" />;
  }

  const {
    id: mealId,
    name: mealName,
    notes: mealNotes,
    mealType,
    mealFoodItems,
  } = mealToEdit;

  const cleanMealFoodItems =
    mealFoodItems?.filter((m) => m.crudOperation !== "delete") ?? [];

  return (
    <form
      onSubmit={onSubmit}
      className="text-main-orange grid  gap-4 bg-black-900 p-4 "
    >
      <header className="flex flex-col gap-4">
        <InputWithError
          inputProps={{
            value: mealName || "",
            type: "text",
            name: "name",
            id: "name-" + mealId,
            placeholder: "",
            onChange: onInputChange,
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

        <TextAreaWithError
          onChange={onInputChange}
          value={mealNotes ?? ""}
          name="notes"
          error={errors?.notes}
          placeholder=""
        />

        <SelectWithSearch
          options={MEAL_TYPES}
          handleSelect={handleType}
          SelectedComponent={<p>{mealType}</p>}
          filterBy={(item) => item}
          error={errors?.mealType}
          SelectItemComponent={GenericSelectItem}
        />
      </header>
      <MealNutritionDetails mealFoodItems={cleanMealFoodItems } route="edit"/>
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
        <GenericSaveButton isSaving={isSaving} />
      </div>
      <GenericList
        items={cleanMealFoodItems}
        ItemComponent={MealFoodItemPreview}
        itemComponentProps={{ removeMealFoodItem, handleMealFoodItem }}
        getKey={(item) => item.id ?? ""}
        ulStyle="grid  grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]
                             grid-rows-[repeat(auto-fill,auto)] gap-4 overflow-y-auto "
      />
    </form>
  );
}
