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
import ProgramExerciseEditModel from "../../components/Program/ProgramExercise/ProgramExerciseEditModel";

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
    <div>
      <form
        onSubmit={onSaveProgram}
        className="h-main bg-main-orange px-4 pt-4 grid grid-rows-[auto_1fr] gap-4"
      >
        <header
          className="grid grid-rows-[2rem_2.5rem_2.5rem_5rem_2.5rem] lg:grid-rows-[2rem_3.5rem_9.5rem] grid-cols-3
        lg:grid-cols-[1fr_1fr_8.5rem] lg:h-68 gap-4 justify-around"
        >
          <h2 className="text-2xl font-semibold col-span-full">{headerText}</h2>
          <Input
            value={name || ""}
            type="text"
            name="name"
            id="name"
            placeholder=""
            onChange={handleInputChange}
            className={`w-full h-10 peer outline-offset-0 pl-2 border-1 rounded ${
              error?.errors?.name ? "border-red-orange outline-red-orange" : ""
            }`}
            divStyle="bg-main-orange h-fit order-1 w-full col-span-2 lg:col-span-1"
          >
            <Label
              isMoveUpEffect={true}
              htmlFor="name"
              className={`${
                error?.errors?.name
                  ? " text-sm w-fit text-red-orange peer-[:not(:placeholder-shown)]:text-red-orange peer-focus:text-red-orange"
                  : ""
              }`}
            >
              {error?.errors?.name
                ? " Program name is required"
                : "Program Name"}
            </Label>
          </Input>
          <DateInput
            handleDateSelect={handleDateSelect}
            selectedRange={dateRange}
            className=" col-span-full lg:col-span-1 order-3 lg:order-2"
            errorRange={{
              startDate: error?.errors?.startDate,
              endDate: error?.errors?.endDate,
            }}
          />
          <Input
            onChange={handleInputChange}
            checked={isActive}
            type="checkBox"
            name="isActive"
            id="isActive"
            divStyle="flex items-center order-2 justify-self-end lg:justify-self-center"
            hidden
            className="hidden peer"
          >
            <Label htmlFor="isActive" className="switch-label"></Label>
          </Input>
          <TextArea
            onChange={handleInputChange}
            value={notes}
            name="notes"
            rows={3}
            placeholder="Add a note..."
            className="w-full h-full  block peer outline-offset-0  pl-2 peer resize-none"
            divStyle="bg-main-orange border-1 rounded h-auto col-span-full lg:col-span-2 order-4"
          ></TextArea>
          <div
            className="inline-flex lg:grid items-center lg:justify-items-center gap-2 order-5
          w-full col-span-full lg-col-span-1 lg:col-start-3"
          >
            <ProgramExerciseEditModel
              programExerciseLength={(cleanedProgramExercises?.length || 0) + 1}
              handleProgramExercise={handleProgramExercise}
            />
            <Button
              className="w-16 border rounded lg:w-full hover:border-red-orange
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
              className={`bg-inherit border-1 w-16 lg:w-full hover:bg-main-orange h-10
              hover:text-white rounded transition-all duration-300
              hover:cursor-pointer ${isLoading ? "opacity-50" : ""} `}
            >
              Save
            </Button>
          </div>
        </header>
        <ProgramExercisePreviewList
          groupedProgramExercises={groupedProgramExercises}
          handleProgramExercise={handleProgramExercise}
        />
      </form>
    </div>
  );
}
