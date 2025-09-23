import type { IProgramFilter } from "../../../../../shared/models/program.model";
import Button from "../../UI/Button";
import InputWithError from "../../UI/Form/InputWithError";
import { IconSearch } from "../../UI/Icons/IconSearch";

interface IProgramFIlterProps {
  filter: IProgramFilter | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function ProgramFilter({
  filter,
  onSubmit,
}: IProgramFIlterProps) {
  const { name } = filter ?? {};
  return (
    <form
      onSubmit={onSubmit}
      className="border border-main-orange p-4 grid gap-2 mx-2 mt-4 "
    >
      <h2>Search for items</h2>
      <InputWithError
        inputProps={{
          defaultValue: name ?? "",
          type: "text",
          name: "name",
          id: "name-foodItem-filter",
          placeholder: "",
          className: "h-10 pl-2",
        }}
        labelProps={{
          htmlFor: "name-foodItem-filter",
          children: "Meal Name",
          isMoveUpEffect: true,
        }}
        divStyle="h-fit w-full "
      />
      <Button
        type="submit"
        buttonStyle="save"
        className="w-fit aspect-square flex-center"
      >
        <IconSearch className="w-6 h-6 fill-none stroke-main-orange" />
      </Button>
    </form>
  );
}
