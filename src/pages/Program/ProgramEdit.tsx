import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { IProgramEditDTO } from "../../models/program.model";
import { programService } from "../../services/program.service";
import Input from "../../components/UI/Form/Input";
import Label from "../../components/UI/Form/Label";
import TextArea from "../../components/UI/Form/TextArea";
import Button from "../../components/UI/Button";
import DateInput from "../../components/UI/Form/DateInput/DateInput";
import type { IDateRange } from "../../models/calendar.model";

export default function ProgramEdit() {
  const [programToEdit, setProgramToEdit] = useState<IProgramEditDTO | null>(
    null
  );
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadItem();
  }, [id]);

  const loadItem = async () => {
    try {
      setIsLoading(true);
      const item = id
        ? ((await programService.getById(id)) as IProgramEditDTO)
        : programService.getEmpty();
      setProgramToEdit(item);
    } catch (error) {
      console.error("Failed to load program:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDateSelect = (range: IDateRange) => {
    setProgramToEdit((prev) => ({ ...prev!, dateRange: range }));
  };
  if (isLoading || !programToEdit) {
    return <div className="h-main">Loading...</div>;
  }

  const { name, note, dateRange } = programToEdit;
  console.log(" ProgramEdit ~ dateRange:", dateRange)

  const headerText = id ? `Edit Program: ${name}` : `Create New Program`;
  return (
    <form className="h-main fixed inset-0 bg-main-orange p-4 flex flex-col gap-4">
      <header className="grid grid-row-2 grid-cols-2 gap-4 justify-around">
        <h2 className="text-2xl font-semibold col-span-full">{headerText}</h2>
        <Input
          defaultValue={name || ""}
          type="text"
          name="name"
          id="name"
          placeholder=""
          required
          className="w-full h-10 peer outline-offset-0  pl-2 peer"
          divStyle="bg-main-orange border-1 rounded h-fit"
        >
          <Label isMoveUpEffect={true} htmlFor="name">
            Program Name
          </Label>
        </Input>
        <DateInput
          handleDateSelect={handleDateSelect}
          selectedRange={dateRange}
        />
        <TextArea
          defaultValue={note}
          name="note"
          rows={3}
          placeholder="Add a note..."
          className="w-full h-20 block peer outline-offset-0  pl-2 peer resize-none"
          divStyle="bg-main-orange border-1 rounded h-auto col-span-full "
        ></TextArea>
        <div className="inline-flex items-center  place-self-end gap-2 col-span-full">
          <Button
            className="px-2 py-1 border rounded hover:border-red-orange
                           cursor-pointer h-10
                           hover:text-red-orange transition-all duration-300"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            aria-disabled={isLoading}
            className={`bg-inherit border-1 p-2 hover:bg-main-orange h-10
                                  hover:text-white rounded transition-all duration-300
                                  hover:cursor-pointer ${
                                    isLoading ? "opacity-50" : ""
                                  } `}
          >
            Save
          </Button>
        </div>
      </header>
    </form>
  );
}
