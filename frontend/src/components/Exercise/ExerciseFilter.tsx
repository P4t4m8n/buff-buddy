//UI
import GenericFilter from "../UI/GenericFilter";
//Types
import type { IExerciseFilter } from "../../../../shared/models/exercise.model";
import type {
  IFilterCheckboxInput,
  IFilterTextInput,
} from "../../models/UI.model";

interface IExerciseFilterProps {
  exerciseFilter: IExerciseFilter;
  isLoading?: boolean;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  onResetForm: () => void;
}

export default function ExerciseFilter({
  exerciseFilter,
  ...rest
}: IExerciseFilterProps) {
  const { name, types, equipment, muscles, isCompounded } =
    exerciseFilter ?? {};

  const textInputs: IFilterTextInput<IExerciseFilter>[] = [
    { label: "name", value: name, name: "name" },
    { label: "types", value: types, name: "types" },
    { label: "equipment", value: equipment, name: "equipment" },
    { label: "muscles", value: muscles, name: "muscles" },
  ] as const;

  const checkBoxInputs: IFilterCheckboxInput<IExerciseFilter>[] = [
    { label: "Compounded", name: "isCompounded", isChecked: !!isCompounded },
  ];

  return (
    <GenericFilter<IExerciseFilter>
      textInputs={textInputs}
      checkBoxInputs={checkBoxInputs}
      {...rest}
    />
  );
}
