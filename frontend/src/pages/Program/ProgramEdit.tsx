import { useParams } from "react-router";

import { useProgramEdit } from "../../hooks/features/program/useProgramEdit";
import { useProgramStore } from "../../store/program.store";

import { calendarUtil } from "../../utils/calendar.util";

import ProgramWorkoutEdit from "../../components/Program/ProgramEdit/ProgramWorkoutEdit";
import ProgramWorkoutEditWeekList from "../../components/Program/ProgramEdit/ProgramWorkoutEditWeekList";

import Label from "../../components/UI/Form/Label";
import TextArea from "../../components/UI/Form/TextArea";
import Button from "../../components/UI/Button";
import DateInput from "../../components/UI/Form/DateInput/DateInput";
import Input from "../../components/UI/Form/Input";
import Loader from "../../components/UI/Loader";
import LabelWithError from "../../components/UI/Form/LabelWithError";
import GenericModel from "../../components/UI/GenericModel";
import GenericSaveButton from "../../components/UI/GenericSaveButton";


export default function ProgramEdit() {
  const { programId } = useParams<{ programId?: string }>();

  const {
    programToEdit,
    isLoading,
    errors,
    handleDateSelect,
    onSaveProgram,
    handleProgramWorkouts,
    navigate,
    handleInputChange,
  } = useProgramEdit(programId);

  if (isLoading || !programToEdit) {
    return <Loader />;
  }

  const { name, notes, startDate, endDate, programWorkouts, isActive } =
    programToEdit;

  const headerText = programId ? `Edit Program: ${name}` : `Create New Program`;

  const dateRange = {
    start: calendarUtil.convertDate(startDate),
    end: calendarUtil.convertDate(endDate),
  };

  return (
    <div>
      <form
        onSubmit={onSaveProgram}
        className="h-main  px-4 pt-4 grid grid-rows-[auto_1fr] gap-4"
      >
        <header
          className={`grid grid-rows-[2rem_2.5rem_2.5rem_5rem_2.5rem]
                      lg:grid-rows-[2rem_3.5rem_9.5rem] grid-cols-3
                      lg:grid-cols-[1fr_1fr_8.5rem] lg:h-68 gap-4 justify-around`}
        >
          <h2 className="text-2xl font-semibold col-span-full truncate">
            {headerText}
          </h2>
          <Input
            value={name || ""}
            type="text"
            name="name"
            id="name"
            placeholder=""
            onChange={handleInputChange}
            className={`w-full h-10 peer outline-offset-0 pl-2 border-1 rounded ${
              errors?.name ? "border-red-orange outline-red-orange" : ""
            }`}
            divStyle="h-fit order-1 w-full col-span-2 lg:col-span-1"
          >
            <LabelWithError
              htmlFor="name"
              error={errors?.name}
              labelText="Program Name"
            />
          </Input>
          <DateInput
            handleDateSelect={handleDateSelect}
            selectedRange={dateRange}
            className=" col-span-full lg:col-span-1 order-3 lg:order-2"
            errorRange={{
              startDate: errors?.startDate,
              endDate: errors?.endDate,
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
            value={notes ?? ""}
            name="notes"
            rows={3}
            placeholder="Add a note..."
            className="w-full h-full  block peer outline-offset-0  pl-2 peer resize-none"
            divStyle=" border-1 rounded h-auto col-span-full lg:col-span-2 order-4"
          ></TextArea>
          <div
            className="inline-flex lg:grid items-center lg:justify-items-center gap-2 order-5
                       w-full col-span-full lg-col-span-1 lg:col-start-3"
          >
            <GenericModel
              Model={ProgramWorkoutEdit}
              modelProps={{ handleProgramWorkouts }}
              mode="create"
              buttonProps={{ buttonStyle: "model", className: "mr-auto" }}
              isOverlay={false}
            />

            <Button
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
        </header>
        <ProgramWorkoutEditWeekList
          programWorkouts={programWorkouts ?? []}
          handleProgramWorkouts={handleProgramWorkouts}
        />
      </form>
    </div>
  );
}
