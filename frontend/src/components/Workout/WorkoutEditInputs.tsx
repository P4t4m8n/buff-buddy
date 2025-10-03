//UI
import InputWithError from "../UI/Form/InputWithError";
import Label from "../UI/Form/Label";
import SwitchInput from "../UI/Form/SwitchInput";
import TextArea from "../UI/Form/TextArea";
//Types
import type { IWorkoutEditDTO } from "../../../../shared/models/workout.model";
import type { TErrors } from "../../models/errors.model";

interface IWorkoutEditInputsProps {
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  workoutToEdit: IWorkoutEditDTO;
  errors: TErrors<IWorkoutEditDTO> | null;
}
export default function WorkoutEditInputs({
  handleInputChange,
  workoutToEdit,
  errors,
}: IWorkoutEditInputsProps) {
  const { notes, name, id: workoutToEditId, isTemplate } = workoutToEdit;
  return (
    <>
      <SwitchInput
        handleInputChange={handleInputChange}
        isActive={!!isTemplate}
        inputName="isTemplate"
        afterContentText={{ active: "Template", inactive: "Private" }}
      />
      <InputWithError
        inputProps={{
          value: name ?? "",
          type: "text",
          name: "name",
          id: "name-" + workoutToEditId,
          placeholder: "",
          className: "h-10 pl-2",
          onChange: handleInputChange,
        }}
        labelProps={{
          labelPosition: "input",
          htmlFor: "name-" + workoutToEditId,
          children: "Workout Name",
          isMoveUpEffect: true,
        }}
        divStyle=" h-fit"
        error={errors?.name}
      />
      <TextArea
        value={notes || ""}
        name="notes"
        id={"notes-" + workoutToEditId}
        rows={3}
        placeholder=""
        className="w-full h-full block peer outline-offset-0 p-2 resize-none border-1 rounded  "
        divStyle="  h-auto col-span-full relative group "
        onChange={handleInputChange}
      >
        <Label
          labelPosition="textArea"
          isMoveUpEffect={true}
          htmlFor={"notes-" + workoutToEditId}
        >
          Notes
        </Label>
      </TextArea>
    </>
  );
}
