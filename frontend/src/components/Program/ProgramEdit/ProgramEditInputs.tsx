//Utils
import { calendarUtil } from "../../../utils/calendar.util";
//Hooks
import { usePageBack } from "../../../hooks/shared/usePageBack";
//Components
import ProgramWorkoutEdit from "../ProgramWorkout/ProgramWorkoutEdit/ProgramWorkoutEdit";
//UI
import DateInput from "../../UI/Form/DateInput/DateInput";
import InputWithError from "../../UI/Form/InputWithError";
import Label from "../../UI/Form/Label";
import TextArea from "../../UI/Form/TextArea";
import GenericModel from "../../UI/GenericModel";
import GenericSaveButton from "../../UI/GenericSaveButton";
import Button from "../../UI/Button";
//Types
import type {
  IProgramEditDTO,
  IProgramWorkoutEditDTO,
} from "../../../../../shared/models/program.model";
import type { IDateRange } from "../../../models/calendar.model";
import type { TErrors } from "../../../models/errors.model";
import CheckBox from "../../UI/Form/CheckBox";

interface IProgramEditInputsProps {
  programToEdit?: IProgramEditDTO | null;
  errors: TErrors<IProgramEditDTO> | null;
  isSaving: boolean;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleDateSelect: (range: IDateRange) => void;
  handleProgramWorkouts: (programWorkout: IProgramWorkoutEditDTO) => void;
}
export default function ProgramEditInputs({
  programToEdit,
  errors,
  isSaving,
  handleInputChange,
  handleDateSelect,
  handleProgramWorkouts,
}: IProgramEditInputsProps) {
  const { onBack } = usePageBack();

  const {
    name,
    notes,
    startDate,
    endDate,
    isActive,
    isPublic,
    id: programId,
  } = programToEdit ?? {};
  const dateRange = calendarUtil.getDateRange(startDate, endDate);
  return (
    <div className="flex flex-col md:flex-row gap-4 p-desktop">
      <div className="grid gap-4 w-full">
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
          error={errors?.name}
          divStyle=""
        />

        <DateInput
          handleDateSelect={handleDateSelect}
          selectedRange={dateRange}
          className=""
          errorRange={{
            startDate: errors?.startDate,
            endDate: errors?.endDate,
          }}
        />
        <div className="flex items-center gap-8">
          <CheckBox
            name="isActive"
            id={"isActive-" + programId}
            checked={!!isActive}
            labelText={isActive ? "Active" : "Inactive"}
            error={errors?.isActive}
            onChange={handleInputChange}
          />
          <CheckBox
            name="isPublic"
            id={"isPublic-" + programId}
            checked={!!isPublic}
            labelText={isPublic ? "Public" : "Private"}
            error={errors?.isPublic}
            onChange={handleInputChange}
          />
        </div>
        <TextArea
          onChange={handleInputChange}
          value={notes ?? ""}
          name="notes"
          id={"notes-" + programId}
          rows={3}
          placeholder=""
          className="w-full h-full block peer outline-offset-0 p-2 resize-none border-1 rounded  "
          divStyle="col-span-full w-full  h-auto col-span-full relative group "
        >
          <Label
            labelPosition="textArea"
            isMoveUpEffect={true}
            htmlFor={"notes-" + programId}
          >
            Notes
          </Label>
        </TextArea>
      </div>
      <div className="flex md:grid md:grid-rows-[1fr_2.5rem_2.5rem] gap-4 md:w-48 h-full">
        <GenericModel
          Model={ProgramWorkoutEdit}
          modelProps={{ handleProgramWorkouts }}
          mode="create"
          buttonProps={{
            buttonStyle: "model",
            className: "",
          }}
          isOverlay={false}
          isPortal={true}
        />

        <Button
          className="w-full mt-auto"
          buttonStyle="warning"
          onClick={onBack}
        >
          Cancel
        </Button>
        <GenericSaveButton isSaving={isSaving} />
      </div>

      {errors?.programWorkouts && (
        <span className="text-error-red text-sm col-span-full order-6">
          {errors.programWorkouts}
        </span>
      )}
    </div>
  );
}
