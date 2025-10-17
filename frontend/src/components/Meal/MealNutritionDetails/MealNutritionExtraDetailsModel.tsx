import type { TNutritionKey } from "../../../models/meal.model";
import type { IModelProps } from "../../../models/model.model";
import { toTitle } from "../../../utils/toTitle";
import Button from "../../UI/Button";
import IconPlus from "../../UI/Icons/IconPlus";

const nutritionStyling: Record<
  TNutritionKey,
  { borderColor: string; textColor: string }
> = {
  calories: {
    borderColor: "border-l-amber-400",
    textColor: "text-amber-400/75",
  },
  proteins: {
    borderColor: "border-l-pink-500",
    textColor: "text-pink-500/75",
  },
  fat: {
    borderColor: "border-l-blue-500",
    textColor: "text-blue-500/75",
  },
  saturatedFat: {
    borderColor: "border-l-purple-500",
    textColor: "text-purple-500/75",
  },
  sugars: {
    borderColor: "border-l-green-500",
    textColor: "text-green-500/75",
  },
  carbohydrates: {
    borderColor: "border-l-cyan-500",
    textColor: "text-cyan-500/75",
  },
  fiber: {
    borderColor: "border-l-yellow-500",
    textColor: "text-yellow-500/75",
  },
  salt: {
    borderColor: "border-l-red-500",
    textColor: "text-red-500/75",
  },
  cholesterol: {
    borderColor: "border-l-gray-400",
    textColor: "text-gray-400/75",
  },
};

const nutrientsWithGrams: TNutritionKey[] = [
  "proteins",
  "fat",
  "saturatedFat",
  "carbohydrates",
  "sugars",
  "fiber",
  "salt",
  "cholesterol",
];

interface IMealNutritionExtraDetailsModelProps
  extends IModelProps<HTMLDivElement> {
  totalNutrition: Partial<Record<TNutritionKey, number>>;
}
export default function MealNutritionExtraDetailsModel({
  totalNutrition,
  modelRef,
  handleModel,
}: IMealNutritionExtraDetailsModelProps) {
  const totalNutritionArr = (
    Object.entries(totalNutrition) as [TNutritionKey, number][]
  ).map(([key, value]) => {
    const styles = nutritionStyling[key] ?? nutritionStyling.calories;
    const showGrams = nutrientsWithGrams.includes(key);

    return (
      <li
        key={key}
        className={`${styles.borderColor} border-l-4 px-2 flex items-end gap-1`}
      >
        <p className="text-2xl">{value ?? 0}</p>
        {showGrams && <p className="text-main-orange/65">gr</p>}
        <h5 className={`${styles.textColor} pl-1 truncate`}>{toTitle(key)}</h5>
      </li>
    );
  });

  return (
    <div
      ref={modelRef}
      className=" border rounded p-4 bg-black-500 w-[calc(100%-1rem)]
                   max-w-96"
    >
      <Button
        className="border rounded-full p-1 stroke-main-orange float-end "
        onClick={handleModel}
      >
        <IconPlus className="w-6 h-6 rotate-45" />
      </Button>
      <ul className="grid   gap-4">{totalNutritionArr}</ul>
    </div>
  );
}
