import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import BackButton from "../../components/UI/BackButton";
import { mealService } from "../../services/meal.service";
import type {
  IMealEditDTO,
  IMealFoodItemEditDTO,
} from "../../../../shared/models/meal.model";
import { mealUtil } from "../../utils/meal.util";
import { useErrors } from "../../hooks/shared/useErrors";
import Loader from "../../components/UI/loader/Loader";
import InputWithError from "../../components/UI/Form/InputWithError";
import { formUtil } from "../../utils/form.util";
import TextArea from "../../components/UI/Form/TextArea";
import Label from "../../components/UI/Form/Label";
import GenericModel from "../../components/UI/GenericModel";
import MealFoodItemEditModel from "../../components/Meal/MealFoodItemEditModel";
import Button from "../../components/UI/Button";
import SelectWithSearch from "../../components/UI/Form/SelectWithSearch/SelectWithSearch";
import { MEAL_TYPES } from "../../../../shared/consts/meal.consts";
import GenericSelectItem from "../../components/UI/Form/SelectWithSearch/GenericSelectItem";
import type { MealType } from "../../../../backend/prisma/generated/prisma";

export default function MealEditPage() {
  const { mealId: mealIdParams } = useParams<{ mealId: string }>();
  const [mealToEdit, setMealToEdit] = useState<IMealEditDTO | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { errors, handleError } = useErrors<IMealEditDTO>();

  useEffect(() => {
    if (!mealIdParams) {
      return setMealToEdit(mealUtil.getEmpty());
    }

    const loadMeal = async () => {
      try {
        setIsLoading(true);
        mealService.getById(mealIdParams).then((meal) => {
          if (!meal) {
            return setMealToEdit(mealUtil.getEmpty());
          }
          const mealEdit = mealUtil.dtoToEditDto(meal);
          setMealToEdit(mealEdit);
        });
      } catch (error) {
        handleError({ error });
      } finally {
        setIsLoading(false);
      }
    };

    loadMeal();
  }, [mealIdParams]);

  const handleType = (mealType: MealType) => {
    setMealToEdit((prev) => (prev ? { ...prev, mealType } : prev));
  };

  const handleMealFoodItem = (mealFoodItem: IMealFoodItemEditDTO) => {
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

  const headerText = !mealId?.startsWith("temp")
    ? `Edit Meal: `
    : `Create New Meal`;

  return (
    <div className="grid-stack bg-black-900 p-4 h-main">
      <form className="text-main-orange">
        <header
          className={`grid grid-rows-[2rem_2.5rem_4.75rem_5rem_2.5rem_auto]
            lg:grid-rows-[2rem_4rem_6.5rem_auto] grid-cols-3
            lg:grid-cols-[1fr_1fr_8.5rem] lg:h-68 gap-4 justify-around items-center px-4`}
        >
          <BackButton />
          <h2 className="text-2xl font-semibold col-span-full truncate">
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
            divStyle="h-fit order-1 w-full col-span-2 lg:col-span-1 self-end"
          />

          <TextArea
            onChange={(e) => formUtil.handleInputChange(e, setMealToEdit)}
            value={mealNotes ?? ""}
            name="notes"
            id={"notes-" + mealId}
            rows={3}
            placeholder=""
            className="w-full h-full block peer outline-offset-0 pl-2 peer resize-none pt-2"
            divStyle="border-1 relative rounded h-full col-span-full lg:col-span-2 order-4"
          >
            <Label
              labelPosition="textArea"
              isMoveUpEffect={true}
              htmlFor={"notes-" + mealId}
            >
              Notes
            </Label>
          </TextArea>
          {errors && (
            <span className="text-error-red text-sm col-span-full order-6">
              {Object.entries(errors)}
            </span>
          )}
          <SelectWithSearch
            options={MEAL_TYPES}
            handleSelect={handleType}
            SelectedComponent={<p>{mealType}</p>}
            filterBy={(item) => item}
            error={errors?.mealType}
            SelectItemComponent={GenericSelectItem}
          />
        </header>
        <div
          className="inline-flex lg:grid lg:grid-cols-2 items-center lg:justify-items-center gap-2 order-5
                w-full h-full lg:h-auto col-span-full lg-col-span-1 lg:col-start-3"
        >
          <GenericModel
            Model={MealFoodItemEditModel}
            modelProps={{ handleMealFoodItem }}
            mode="create"
            buttonProps={{
              buttonStyle: "model",
              className: "mr-auto col-span-2 lg:w-full",
            }}
            isOverlay={false}
            isPortal={true}
          />

          <Button
            className="w-full"
            buttonStyle="warning"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className={`bg-inherit border-1 flex-center  hover:bg-main-orange h-full w-full
                                      hover:text-white rounded transition-all duration-300
                                      hover:cursor-pointer  `}
          >
            {isLoading ? <Loader loaderType="spinner" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}
