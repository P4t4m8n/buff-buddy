import InputWithError from "../../../UI/Form/InputWithError";
import type { IWorkoutExerciseEditDTO } from "../../../../../../shared/models/workout.model";
import type { TErrors } from "../../../../models/errors.model";
import TextArea from "../../../UI/Form/TextArea";
import Label from "../../../UI/Form/Label";

interface WorkoutExerciseEditInputProps {
  workoutExerciseToEdit: IWorkoutExerciseEditDTO;
  workoutExerciseLength?: number;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  workoutExerciseErrors: TErrors<IWorkoutExerciseEditDTO> | null;
}
export default function WorkoutExerciseEditInput({
  workoutExerciseToEdit,
  workoutExerciseLength,
  handleInputChange,
  workoutExerciseErrors,
}: WorkoutExerciseEditInputProps) {
  const {
    order,
    notes,
    isBodyWeight,
    hasWarmup,
    id: WorkoutExerciseId,
  } = workoutExerciseToEdit;
  return (
    <div className=" flex flex-col items gap-4 w-full justify-around px-4 pt-4">
      <InputWithError
        divStyle=" grid grid-cols-[auto_auto_1fr] justify-end gap-2 items-center"
        inputProps={{
          name: "order",
          type: "number",
          defaultValue:
            order && order >= 1 ? order : workoutExerciseLength ?? 1,
          className:
            "border w-[4ch] aspect-square rounded text-center order-2  ",
          min: 1,
          onChange: handleInputChange,
        }}
        labelProps={{
          labelPosition: "input",
          className: "order-1",
          htmlFor: "order",
          children: "Order:",
        }}
        error={workoutExerciseErrors?.order}
      />

      <TextArea
        defaultValue={notes ?? ""}
        name="notes"
        rows={3}
        placeholder=""
        className="w-full h-28 block peer outline-offset-0 p-2 resize-none border-1 rounded "
        divStyle="  h-auto col-span-full relative group "
        onChange={handleInputChange}
      >
        <Label labelPosition="textArea" isMoveUpEffect={true} htmlFor="note">
          Notes
        </Label>
        {workoutExerciseErrors?.notes ? (
          <Label htmlFor="order" className=" text-sm text-red-orange">
            {workoutExerciseErrors?.notes}
          </Label>
        ) : null}
      </TextArea>

      <div className=" col-span-full grid grid-cols-2 gap-4">
        <InputWithError
          divStyle=""
          inputProps={{
            name: "hasWarmup",
            type: "checkbox",
            checked: !!hasWarmup,
            className: " ",
            id: "hasWarmUp-" + WorkoutExerciseId,
            onChange: handleInputChange,
          }}
          labelProps={{
            labelPosition: "input",
            className: "",
            htmlFor: "hasWarmup-" + WorkoutExerciseId,
            children: "Warm up?:",
          }}
          error={workoutExerciseErrors?.hasWarmup}
        />
        <InputWithError
          divStyle=""
          inputProps={{
            name: "isBodyWeight",
            type: "checkbox",
            checked: !!isBodyWeight,
            className: " ",
            id: "isBodyWeight-" + WorkoutExerciseId,
            onChange: handleInputChange,
          }}
          labelProps={{
            labelPosition: "input",
            className: "",
            htmlFor: "isBodyWeight-" + WorkoutExerciseId,
            children: "Body Wight?:",
          }}
          error={workoutExerciseErrors?.isBodyWeight}
        />
      </div>
    </div>
  );
}
