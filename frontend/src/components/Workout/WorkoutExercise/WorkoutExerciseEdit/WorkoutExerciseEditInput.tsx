//Lib
import { useMemo } from "react";
//Util
import getTempId from "../../../../../../shared/utils/getTempId";
import toTitle from "../../../../utils/toTitle";
//UI
import InputWithError from "../../../UI/Form/InputWithError";
import TextArea from "../../../UI/Form/TextArea";
import Label from "../../../UI/Form/Label";
import CheckBox from "../../../UI/Form/CheckBox";
import GenericList from "../../../UI/GenericList";
import NumberInputWIthError from "../../../UI/Form/NumberInputWIthError";
//Types
import type { IWorkoutExerciseEditDTO } from "../../../../../../shared/models/workout.model";
import type { TErrors } from "../../../../models/errors.model";
import type {
  ICheckBoxProps,
  INumberInputWithErrorProps,
} from "../../../../models/UI.model";

interface WorkoutExerciseEditInputProps {
  workoutExerciseToEdit?: IWorkoutExerciseEditDTO | null;
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
  const { order, notes, maxNumberOfReps, numberOfSets, restTime, ...rest } =
    workoutExerciseToEdit ?? {};

  const checkBoxInputs: ICheckBoxProps[] = [];
  const numberInputs: INumberInputWithErrorProps[] = [
    {
      name: "maxNumberOfReps",
      value: maxNumberOfReps || undefined,
      labelText: "Max Reps",
      error: workoutExerciseErrors?.maxNumberOfReps,
      onChange: handleInputChange,
    },
    {
      name: "numberOfSets",
      value: numberOfSets || undefined,
      labelText: "Sets",
      error: workoutExerciseErrors?.numberOfSets,
      onChange: handleInputChange,
    },
    {
      name: "restTime",
      value: restTime || undefined,
      labelText: "Rest Time",
      error: workoutExerciseErrors?.restTime,
      onChange: handleInputChange,
    },
  ];
  useMemo(
    () =>
      Object.entries(rest).forEach(([key, value]) => {
        if (typeof value === "boolean") {
          checkBoxInputs.push({
            name: key,
            id: key,
            checked: !!value,
            labelText: toTitle(key),
            error:
              workoutExerciseErrors?.[key as keyof IWorkoutExerciseEditDTO],
            onChange: handleInputChange,
          });
        }
      }),
    [rest]
  );

  return (
    <div className=" flex flex-col items gap-4 w-full justify-around ">
      <InputWithError
        divStyle="grid grid-cols-[auto_auto_1fr] justify-end gap-2 items-center"
        inputProps={{
          name: "order",
          type: "number",
          value: order && order >= 1 ? order : workoutExerciseLength ?? 1,
          className:
            "border w-[4ch] aspect-square rounded text-center order-2  ",
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
        className="w-full h-28 block peer outline-offset-0 p-2 resize-none border rounded "
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

      <GenericList
        items={checkBoxInputs}
        ItemComponent={ListCheckBoxWrapper}
        getKey={(item) => item.name ?? getTempId()}
        ulStyle="grid grid-cols-2 gap-2 items-center justify-items-center w-full"
      />

      <GenericList
        items={numberInputs}
        ItemComponent={ListNumberInputWrapper}
        getKey={(item) => item.name ?? getTempId()}
        ulStyle="grid grid-cols-3 gap-2 items-center justify-items-center w-full text-sm text-center"
      />
    </div>
  );
}

const ListCheckBoxWrapper = ({ item }: { item: ICheckBoxProps }) => {
  return <CheckBox {...item} divStyle="" />;
};

const ListNumberInputWrapper = ({
  item,
}: {
  item: INumberInputWithErrorProps;
}) => {
  return <NumberInputWIthError {...item} divStyle="" className="text-xs" />;
};
