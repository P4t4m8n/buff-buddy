import Button from "../../UI/Button";
import GenericModel from "../../UI/GenericModel";
import TextArea from "../../UI/Form/TextArea";
import Input from "../../UI/Form/Input";
import LabelWithError from "../../UI/Form/LabelWithError";
import DateInput from "../../UI/Form/DateInput/DateInput";
import Label from "../../UI/Form/Label";
import ProgramWorkoutEdit from "../ProgramWorkoutEdit/ProgramWorkoutEdit";
import type { IProgramEditDTO } from "../../../../../shared/models/program.model";
import { calendarUtil } from "../../../utils/calendar.util";

interface ProgramEditHeaderProps {
  programToEdit: IProgramEditDTO;
}

export default function ProgramEditHeader({
  programToEdit,
}: ProgramEditHeaderProps) {
  const { name, notes, startDate, endDate, isActive, id } = programToEdit;
  const dateRange = {
    start: calendarUtil.convertDate(startDate),
    end: calendarUtil.convertDate(endDate),
  };

  const headerText = id ? `Edit Program: ${name}` : `Create New Program`;
  return (
    <header
      className={`grid grid-rows-[2rem_2.5rem_2.5rem_5rem_2.5rem]
                         lg:grid-rows-[2rem_3.5rem_9.5rem] grid-cols-3
                         lg:grid-cols-[1fr_1fr_8.5rem] lg:h-68 gap-4 justify-around`}
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
          errors?.name ? "border-red-orange outline-red-orange" : ""
        }`}
        divStyle="bg-main-orange h-fit order-1 w-full col-span-2 lg:col-span-1"
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
        divStyle="bg-main-orange border-1 rounded h-auto col-span-full lg:col-span-2 order-4"
      ></TextArea>
      <div
        className="inline-flex lg:grid items-center lg:justify-items-center gap-2 order-5
                          w-full col-span-full lg-col-span-1 lg:col-start-3"
      >
        <GenericModel
          Model={ProgramWorkoutEdit}
          modelProps={{ handleWorkouts }}
          mode="create"
          buttonProps={{ buttonStyle: "model", className: "mr-auto" }}
          isOverlay={false}
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
                            hover:cursor-pointer ${
                              isLoading ? "opacity-50" : ""
                            } `}
        >
          Save
        </Button>
      </div>
    </header>
  );
}
