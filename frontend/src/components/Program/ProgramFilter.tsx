import type { IProgramFilter } from "../../../../shared/models/program.model";
import type {
  IFilterCheckboxInput,
  IFilterTextInput,
} from "../../models/UI.model";
import GenericFilter from "../UI/GenericFilter";

interface IProgramFilterProps {
  programFilter: IProgramFilter;
  isLoading?: boolean;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  onResetForm: () => void;
}

export default function ProgramFilter({
  programFilter,
  ...rest
}: IProgramFilterProps) {
  const { name, isActive } = programFilter ?? {};

  const textInputs: IFilterTextInput<IProgramFilter>[] = [
    {
      label: "program",
      name: "name",
      value: name,
    },
  ];

  const checkBoxInputs: IFilterCheckboxInput<IProgramFilter>[] = [
    { label: "active", name: "isActive", isChecked: !!isActive },
  ];

  return (
    <GenericFilter<IProgramFilter>
      textInputs={textInputs}
      checkBoxInputs={checkBoxInputs}
      {...rest}
    />
  );
}
