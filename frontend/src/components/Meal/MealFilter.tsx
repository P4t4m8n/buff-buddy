import type { IMealFilter } from "../../../../shared/models/meal.model";
import InputWithError from "../UI/Form/InputWithError";

interface IMealFilterProps {
  filter?: IMealFilter | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function MealFilter({ filter, onChange }: IMealFilterProps) {
  const { name } = filter ?? {};
  return (
    <form className="border border-main-orange p-4 grid gap-2 rounded ">
      <h2>Search for Meals</h2>
      <InputWithError
        inputProps={{
          value: name ?? "",
          type: "text",
          name: "name",
          id: "name-foodItem-filter",
          placeholder: "",
          onChange,
          className: "h-10 pl-2",
        }}
        labelProps={{
          htmlFor: "name-foodItem-filter",
          children: "Meal Name",
          isMoveUpEffect: true,
        }}
        divStyle="h-fit w-full "
      />
    </form>
  );
}
