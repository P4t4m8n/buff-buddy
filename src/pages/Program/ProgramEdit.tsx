import { useNavigate, useParams } from "react-router";
import { useProgramEdit } from "../../hooks/features/program/useProgramEdit";
import Label from "../../components/UI/Form/Label";
import TextArea from "../../components/UI/Form/TextArea";
import Button from "../../components/UI/Button";
import DateInput from "../../components/UI/Form/DateInput/DateInput";
import Input from "../../components/UI/Form/Input";
import ProgramExercisePreviewList from "../../components/Program/ProgramExercise/ProgramExercisePreviewList";

export default function ProgramEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  const {
    programToEdit,
    isLoading,
    handleDateSelect,
    onSaveProgram,
    handleProgramExercise,
    groupProgramExercisesByDay,
  } = useProgramEdit(id);

  //TODO?? add loading component
  if (isLoading || !programToEdit) {
    return <div className="h-main">Loading...</div>;
  }

  const { name, note, startDate, endDate, programExercises } = programToEdit;

  const headerText = id ? `Edit Program: ${name}` : `Create New Program`;
  const cleanedProgramExercises = programExercises?.filter(
    (ex) => ex.crudOperation !== "delete"
  );
  const groupedProgramExercises = groupProgramExercisesByDay(
    cleanedProgramExercises || []
  );
  return (
    <form
      onSubmit={onSaveProgram}
      className="h-main fixed inset-0 bg-main-orange p-4 grid grid-rows-[auto_1fr] gap-4"
    >
      <header className="grid grid-row-2 grid-cols-[1fr_1fr_8.5rem] gap-4 justify-around">
        <h2 className="text-2xl font-semibold col-span-full">{headerText}</h2>
        <Input
          defaultValue={name || ""}
          type="text"
          name="name"
          id="name"
          placeholder=""
          required
          className="w-full h-10 peer outline-offset-0  pl-2"
          divStyle="bg-main-orange border-1 rounded h-fit"
        >
          <Label isMoveUpEffect={true} htmlFor="name">
            Program Name
          </Label>
        </Input>
        <DateInput
          handleDateSelect={handleDateSelect}
          selectedRange={{ start: startDate, end: endDate }}
        />
        <Input type="checkBox" name="isActive" id="isActive">
          <Label htmlFor="isActive">Active</Label>
        </Input>
        <TextArea
          defaultValue={note}
          name="note"
          rows={3}
          placeholder="Add a note..."
          className="w-full h-20 block peer outline-offset-0  pl-2 peer resize-none"
          divStyle="bg-main-orange border-1 rounded h-auto col-span-full "
        ></TextArea>
        <div className="inline-flex items-center   gap-2 ">
          <Button
            className="w-16 border rounded hover:border-red-orange
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
            className={`bg-inherit border-1 w-16 hover:bg-main-orange h-10
                                  hover:text-white rounded transition-all duration-300
                                  hover:cursor-pointer ${
                                    isLoading ? "opacity-50" : ""
                                  } `}
          >
            Save
          </Button>
        </div>
      </header>
      <ProgramExercisePreviewList
        groupedProgramExercises={groupedProgramExercises}
        programExercisesLength={cleanedProgramExercises?.length || 0}
        handleProgramExercise={handleProgramExercise}
      />
    </form>
  );
}
