import { useNavigate, useParams } from "react-router";

import { calendarUtil } from "../../utils/calendar.util";

import { useProgramEdit } from "../../hooks/features/program/useProgramEdit";

import ProgramWorkoutEdit from "../../components/Program/ProgramWorkout/ProgramWorkoutEdit/ProgramWorkoutEdit";
import ProgramWorkoutEditWeekList from "../../components/Program/ProgramWorkout/ProgramWorkoutEdit/ProgramWorkoutEditWeekList";

import Label from "../../components/UI/Form/Label";
import TextArea from "../../components/UI/Form/TextArea";
import Button from "../../components/UI/Button";
import DateInput from "../../components/UI/Form/DateInput/DateInput";
import Loader from "../../components/UI/loader/Loader";
import GenericModel from "../../components/UI/GenericModel";
import InputWithError from "../../components/UI/Form/InputWithError";
import SwitchInput from "../../components/UI/Form/SwitchInput";
import GenericSaveButton from "../../components/UI/GenericSaveButton";

export default function ProgramEditPage() {
  const { programId: programIdParams } = useParams<{ programId?: string }>();
  const navigate = useNavigate();

  const {
    programToEdit,
    isSaving,
    isLoading,
    mutationErrors,
    handleDateSelect,
    saveProgram,
    handleInputChange,
    handleProgramWorkouts,
    deleteProgramWorkout,
  } = useProgramEdit(programIdParams);

  const onSaveProgram = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      e.stopPropagation();

      const id = await saveProgram();
      if (id) navigate(`/programs/${id}`);
    } catch (error) {
      //INFO: The try catch block in need to let the error be catched some where. errors are handled in the mutation hook
    }
  };

  if (isLoading || !programToEdit) {
    return <Loader loaderType="screen" />;
  }

  const {
    id: programId,
    name,
    notes,
    startDate,
    endDate,
    isActive,
    programWorkouts,
  } = programToEdit;

  const headerText = !programId?.startsWith("temp")
    ? `Edit Program: `
    : `Create New Program`;

  const dateRange = {
    start: calendarUtil.convertDate(startDate),
    end: calendarUtil.convertDate(endDate),
  };

  return (
    <form
      onSubmit={onSaveProgram}
      className="w-full h-main grid-stack  pt-4 grid grid-rows-[auto_1fr] grid-cols gap-4 bg-black-900"
    >
      <header
        className={`grid grid-rows-[2rem_2.5rem_4.75rem_5rem_2.5rem_auto]
          lg:grid-rows-[2rem_4rem_6.5rem_auto] grid-cols-3
          lg:grid-cols-[1fr_1fr_8.5rem] lg:h-68 gap-4 justify-around items-center px-4`}
      >
        <h2 className="text-2xl font-semibold col-span-full truncate">
          {headerText}
        </h2>
        <InputWithError
          inputProps={{
            value: name || "",
            type: "text",
            name: "name",
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
          error={mutationErrors?.name}
          divStyle="h-fit order-1 w-full col-span-2 lg:col-span-1 self-end"
        />

        <DateInput
          handleDateSelect={handleDateSelect}
          selectedRange={dateRange}
          className="col-span-full lg:col-span-1 order-3 lg:order-2 self-end"
          errorRange={{
            startDate: mutationErrors?.startDate,
            endDate: mutationErrors?.endDate,
          }}
        />
        <SwitchInput
          handleInputChange={handleInputChange}
          isActive={!!isActive}
          inputName="isActive"
        />
        <TextArea
          onChange={handleInputChange}
          value={notes ?? ""}
          name="notes"
          id={"notes-" + programId}
          rows={3}
          placeholder=""
          className="w-full h-full block peer outline-offset-0 pl-2 peer resize-none pt-2"
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
          <GenericSaveButton isSaving={isSaving} />
        </div>
        {mutationErrors?.programWorkouts && (
          <span className="text-error-red text-sm col-span-full order-6">
            {mutationErrors.programWorkouts}
          </span>
        )}
      </header>
      <ProgramWorkoutEditWeekList
        deleteProgramWorkout={deleteProgramWorkout}
        programWorkouts={programWorkouts}
        handleProgramWorkouts={handleProgramWorkouts}
      />
    </form>
  );
}
