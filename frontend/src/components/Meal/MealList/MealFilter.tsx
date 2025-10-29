//UI
import GenericFilter from "../../UI/GenericFilter";
//Types
import type { IMealFilter } from "../../../../../shared/models/meal.model";
import type { IFilterTextInput } from "../../../models/UI.model";

interface IMealFilterProps {
  mealFilter: IMealFilter;
  isLoading?: boolean;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  onResetForm: () => void;
}
export default function MealFilter({ mealFilter, ...rest }: IMealFilterProps) {
  const { name } = mealFilter ?? {};

  const textInputs: IFilterTextInput<IMealFilter>[] = [
    { label: "name", value: name, name: "name" },
  ] as const;
  return (
    <GenericFilter<IMealFilter>
      textInputs={textInputs}
      checkBoxInputs={[]}
      {...rest}
    />
  );
}
