import { useParams } from "react-router";
import { useProgramEdit } from "../../hooks/features/program/useProgramEdit";
import Label from "../../components/UI/Form/Label";
import TextArea from "../../components/UI/Form/TextArea";
import Button from "../../components/UI/Button";
import DateInput from "../../components/UI/Form/DateInput/DateInput";
import Input from "../../components/UI/Form/Input";
import ProgramExercisePreviewList from "../../components/Program/ProgramExercise/ProgramExercisePreviewList";
import { calendarUtil } from "../../utils/calendar.util";
import { useProgramStore } from "../../store/program.store";

export default function ProgramEdit() {
  const { id } = useParams<{ id?: string }>();

  const {
    programToEdit,
    isLoading,
    handleDateSelect,
    onSaveProgram,
    handleProgramExercise,
    groupProgramExercisesByDay,
    navigate,
    handleInputChange,
  } = useProgramEdit(id);
  const error = useProgramStore((state) => state.error);

  //TODO?? add loading component
  if (isLoading || !programToEdit) {
    return (
      <div className="h-main bg-main-orange fixed inset-0">Loading...</div>
    );
  }

  const { name, notes, startDate, endDate, programExercises, isActive } =
    programToEdit;

  const headerText = id ? `Edit Program: ${name}` : `Create New Program`;
  const cleanedProgramExercises = programExercises?.filter(
    (ex) => ex.crudOperation !== "delete"
  );
  const groupedProgramExercises = groupProgramExercisesByDay(
    cleanedProgramExercises || []
  );

  const dateRange = {
    start: calendarUtil.convertDate(startDate),
    end: calendarUtil.convertDate(endDate),
  };

  return (
    <form
      onSubmit={onSaveProgram}
      className="h-main  bg-main-orange p-4 grid grid-rows-[auto_1fr] gap-4"
    >
      <header className="grid grid-row-2 grid-cols-[1fr_1fr_8.5rem] gap-4 justify-around">
        <h2 className="text-2xl font-semibold col-span-full">{headerText}</h2>
        <Input
          value={name || ""}
          type="text"
          name="name"
          id="name"
          placeholder=""
          required
          onChange={handleInputChange}
          className="w-full h-10 peer outline-offset-0  pl-2"
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
        <Input
          onChange={handleInputChange}
          checked={isActive}
          type="checkBox"
          name="isActive"
          id="isActive"
        >
          <Label htmlFor="isActive">Active</Label>
        </Input>
        <TextArea
          onChange={handleInputChange}
          value={notes}
          name="notes"
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
        {error ? (
          <div className="text-red-orange text-center h-fit">
            <p>
              {typeof error === "string"
                ? error
                : Object.entries(error.errors || {}).map(([field, message]) => (
                    <span key={field}>
                      {field}: {message}
                      <br />
                    </span>
                  ))}
            </p>
          </div>
        ) : null}
      </header>
      <ProgramExercisePreviewList
        groupedProgramExercises={groupedProgramExercises}
        programExercisesLength={(cleanedProgramExercises?.length || 0) + 1}
        handleProgramExercise={handleProgramExercise}
      />
    </form>
  );
}
