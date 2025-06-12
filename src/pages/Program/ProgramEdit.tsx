import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { IProgramEditDTO } from "../../models/program.model";
import { programService } from "../../services/program.service";
import Input from "../../components/UI/Form/Input";
import Label from "../../components/UI/Form/Label";
import TextArea from "../../components/UI/Form/TextArea";
import Button from "../../components/UI/Button";
import DateInput from "../../components/UI/Form/DateInput";

export default function ProgramEdit() {
  const [programToEdit, setProgramToEdit] = useState<IProgramEditDTO | null>(
    null
  );
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadItems();
  }, [id]);

  const loadItems = async () => {
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
  console.log(" ProgramEdit ~ id:", id);

  if (isLoading || !programToEdit) {
    return <div className="h-main">Loading...</div>;
  }

  const { name, note } = programToEdit;
  return (
    <form className="h-main fixed inset-0 bg-main-orange p-4 flex flex-col gap-4">
      <header className="flex">
        <h2>Program Edit</h2>
        <Input
          defaultValue={name || ""}
          name="name"
          id="name"
          placeholder="Name"
        >
          <Label htmlFor="name">Program Name</Label>
        </Input>
        <DateInput />
        <TextArea defaultValue={note} name="note" rows={3}></TextArea>
        <div className="inline-flex items-center justify-between gap-2">
          <Button
            className="px-2 py-1 border rounded hover:border-red-orange
                           cursor-pointer
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
            className={`bg-inherit border-1 p-2 hover:bg-main-orange
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
