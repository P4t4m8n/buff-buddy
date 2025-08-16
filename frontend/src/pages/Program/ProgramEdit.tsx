import { useParams } from "react-router";

import { useProgramEdit } from "../../hooks/features/program/useProgramEdit";
import { useProgramStore } from "../../store/program.store";

import { calendarUtil } from "../../utils/calendar.util";

import Label from "../../components/UI/Form/Label";
import TextArea from "../../components/UI/Form/TextArea";
import Button from "../../components/UI/Button";
import DateInput from "../../components/UI/Form/DateInput/DateInput";
import Loader from "../../components/UI/loader/Loader";
import GenericModel from "../../components/UI/GenericModel";
import GenericSaveButton from "../../components/UI/GenericSaveButton";
import ProgramWorkoutEdit from "../../components/ProgramWorkout/ProgramWorkoutEdit/ProgramWorkoutEdit";
import ProgramWorkoutEditWeekList from "../../components/ProgramWorkout/ProgramWorkoutEdit/ProgramWorkoutEditWeekList";
import InputWithError from "../../components/UI/Form/InputWithError";
import IsActiveInput from "./IsActiveInput";

export default function ProgramEdit() {
  const { programId: programIdParams } = useParams<{ programId?: string }>();

  const {
    programToEdit,
    isLoading,
    errors,
    handleDateSelect,
    onSaveProgram,
    handleProgramWorkouts,
    navigate,
    handleInputChange,
  } = useProgramEdit(programIdParams);
    console.log("🚀 ~ ProgramEdit ~ programToEdit:", programToEdit)

  if (isLoading || !programToEdit) {
    return <Loader loaderType="screen" />;
  }

  const {
    id: programId,
    name,
    notes,
    startDate,
    endDate,
    programWorkouts,
    isActive,
  } = programToEdit;

  const headerText = programId ? `Edit Program: ${name}` : `Create New Program`;

  const dateRange = {
    start: calendarUtil.convertDate(startDate),
    end: calendarUtil.convertDate(endDate),
  };

  return (
    <form
      onSubmit={onSaveProgram}
      className="h-main px-4 pt-4 grid grid-rows-[auto_1fr] gap-4"
    >
      <header
        className={`grid grid-rows-[2rem_2.5rem_4.75rem_5rem_2.5rem_auto]
                    lg:grid-rows-[2rem_4rem_6.5rem_auto] grid-cols-3
                    lg:grid-cols-[1fr_1fr_8.5rem] lg:h-68 gap-4 justify-around items-center`}
      >
        <h2 className="text-2xl font-semibold col-span-full truncate">
          {headerText}
        </h2>
        <InputWithError
          inputProps={{
            value: name || "",
            type: "text",
            name: "name-" + programId,
            id: "name-" + programId,
            placeholder: "",
            onChange: handleInputChange,
            className: "h-10 pl-2",
          }}
          labelProps={{
            htmlFor: "name" + programId,
            children: "Program Name",
            isMoveUpEffect: true,
          }}
          error={errors?.name}
          divStyle="h-fit order-1 w-full col-span-2 lg:col-span-1 self-end"
        />

        <DateInput
          handleDateSelect={handleDateSelect}
          selectedRange={dateRange}
          className="col-span-full lg:col-span-1 order-3 lg:order-2 self-end"
          errorRange={{
            startDate: errors?.startDate,
            endDate: errors?.endDate,
          }}
        />
        <IsActiveInput
          handleInputChange={handleInputChange}
          isActive={isActive}
        />
        <TextArea
          onChange={handleInputChange}
          value={notes ?? ""}
          name="notes"
          id={"notes-" + programId}
          rows={3}
          placeholder=""
          className="w-full h-full  block peer outline-offset-0  pl-2 peer resize-none pt-2"
          divStyle="border-1 relative rounded h-full col-span-full lg:col-span-2 order-4"
        >
          <Label
            labelPosition="textArea"
            isMoveUpEffect={true}
            htmlFor={"notes-" + programId}
          >
            Notes
          </Label>
        </TextArea>
        <div
          className="inline-flex lg:grid lg:grid-cols-2 items-center lg:justify-items-center gap-2 order-5
                       w-full h-full lg:h-auto col-span-full lg-col-span-1 lg:col-start-3"
        >
          <GenericModel
            Model={ProgramWorkoutEdit}
            modelProps={{ handleProgramWorkouts }}
            mode="create"
            buttonProps={{
              buttonStyle: "model",
              className: "mr-auto col-span-2 lg:w-full",
            }}
            isOverlay={false}
          />

          <Button
            className="w-full"
            buttonStyle="warning"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Cancel
          </Button>
          <GenericSaveButton
            itemId={programToEdit.id}
            useStore={useProgramStore}
            type="submit"
          />
        </div>
        {errors?.programWorkouts && (
          <span className="text-error-red text-sm col-span-full order-6">
            {errors.programWorkouts}
          </span>
        )}
      </header>
      <ProgramWorkoutEditWeekList
        programWorkouts={programWorkouts ?? []}
        handleProgramWorkouts={handleProgramWorkouts}
      />
    </form>
  );
}
