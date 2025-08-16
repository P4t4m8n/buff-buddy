import type { ExerciseType } from "../../../../../backend/prisma/generated/prisma";
import type { IUserCardioSetEditDTO } from "../../../../../shared/models/cardioSet.model";
import type { TValidationError } from "../../../models/errors.model";
import Button from "../../UI/Button";
import Input from "../../UI/Form/Input";
import Label from "../../UI/Form/Label";
import GenericList from "../../UI/GenericList";
import GenericModel from "../../UI/GenericModel";
import WorkoutStartExerciseSkipEdit from "../WorkoutStartExerciseSkipEdit";
import WorkoutStartUserCardioLast from "./WorkoutStartUserCardioLast";

interface IWorkoutStartUserCardioSetsProps {
  item: IUserCardioSetEditDTO;
  errors?: TValidationError<IUserCardioSetEditDTO>;
  handleUserCardioSetsChange?: (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void;
  handleUserSet: (userSetId?: string, type?: ExerciseType) => void;
}
export default function WorkoutStartUserCardioSets({
  item: userSet,
  errors,
  handleUserCardioSetsChange,
  handleUserSet,
}: IWorkoutStartUserCardioSetsProps) {
  const {
    id,
    workTime,
    distance,
    avgHeartRate,
    avgSpeed,
    caloriesBurned,
    isCompleted,
    lastSet,
    skippedReason,
  } = userSet;

  const numberInputs = [
    {
      name: `workTime-${id}`,
      value: workTime || "",
      label: "Work Time",
      isError: !!errors?.workTime,
    },
    {
      name: `distance-${id}`,
      value: distance || "",
      label: "Distance",
      isError: !!errors?.distance,
    },
    {
      name: `avgHeartRate-${id}`,
      value: avgHeartRate || "",
      label: "Avg Heart Rate",
      isError: !!errors?.avgHeartRate,
    },
    {
      name: `avgSpeed-${id}`,
      value: avgSpeed || "",
      label: "Avg Speed",
      isError: !!errors?.avgSpeed,
    },
    {
      name: `caloriesBurned-${id}`,
      value: caloriesBurned || "",
      label: "Calories Burned",
      isError: !!errors?.caloriesBurned,
    },
  ];

  return (
    <div className="flex flex-col gap-4 items-center ">
      <WorkoutStartUserCardioLast lastSet={lastSet} />
      <GenericList
        items={numberInputs}
        getKey={(item) => item.label}
        ItemComponent={Item}
        itemComponentProps={{ handleUserCardioSetsChange }}
      />
      {/*
       * INFO: Render skip edit model
       */}
      <GenericModel
        Model={WorkoutStartExerciseSkipEdit}
        modelProps={{ handleUserCardioSetsChange, skippedReason }}
        buttonProps={{
          className:
            "text-amber hover:text-black w-full col-span-2 opacity-50 cursor-not-allowed text-black",
          buttonStyle: "model",
          type: "button",
          children: "Skip",
        }}
      />

      <Button
        className={`text-amber hover:text-black col-span-2 w-full ${
          isCompleted ? "bg-main-green" : ""
        }`}
        buttonStyle="model"
        onClick={() => handleUserSet(id, "cardio")}
        type="button"
      >
        {isCompleted ? "Update" : "Complete"}
      </Button>
    </div>
  );
}

type TNumberInput = {
  name: string;
  value: string | number;
  label: string;
  isError: boolean;
};

interface IItemProps {
  item: TNumberInput;
  handleUserCardioSetsChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Item = ({ item, handleUserCardioSetsChange }: IItemProps) => {
  const { name, value, label, isError } = item;
  const divStyle = "inline-flex flex-row-reverse gap-1 items-center";
  const inputStyle = `bg-amber rounded w-8 aspect-square  text-center border outline-none`;

  return (
    <Input
      key={name}
      name={name}
      type="number"
      value={value}
      divStyle={divStyle + " col-span-2"}
      className={inputStyle + " " + (isError ? "border-red-500" : "")}
      min={1}
      step={"any"}
      onChange={handleUserCardioSetsChange}
    >
      <Label className="" htmlFor={name}>
        {label}:
      </Label>
    </Input>
  );
};
