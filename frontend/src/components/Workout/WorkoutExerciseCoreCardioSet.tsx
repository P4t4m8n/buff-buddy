import type {
  ICoreCardioSetEditDTO,
} from "../../../../shared/models/cardioSet.model";
import type { TValidationError } from "../../models/errors.model";
import { toTitle } from "../../utils/toTitle";
import Input from "../UI/Form/Input";
import Label from "../UI/Form/Label";
import GenericList from "../UI/GenericList";

interface IWorkoutExerciseCoreCardioSetProps {
  coreCardioSet?: ICoreCardioSetEditDTO;
  handleChange: (e: React.ChangeEvent) => void;
  errors?: TValidationError<ICoreCardioSetEditDTO>;
}

type TInput = {
  name: string;
  value?: number | string | null;
  error?: string;
  label?: string;
};
export default function WorkoutExerciseCoreCardioSet({
  coreCardioSet,
  handleChange,
  errors,
}: IWorkoutExerciseCoreCardioSetProps) {
  const {
    id,
    workTime,
    warmupTime,
    avgHeartRate,
    avgSpeed,
    distance,
    calorieTarget,
  } = coreCardioSet || {};

  const inputs: TInput[] = [
    {
      name: "warmupTime",
      value: warmupTime,
      error: errors?.warmupTime,
      label: "Warmup Time (s)",
    },
    {
      name: "workTime",
      value: workTime,
      error: errors?.workTime,
      label: "Work Time (s)",
    },
    {
      name: "avgHeartRate",
      value: avgHeartRate,
      error: errors?.avgHeartRate,
      label: "Avg Heart Rate",
    },
    {
      name: "border",
    },
    {
      name: "avgSpeed",
      value: avgSpeed,
      error: errors?.avgSpeed,
      label: "Avg Speed (km/h)",
    },
    {
      name: "distance",
      value: distance,
      error: errors?.distance,
      label: "Distance (km)",
    },
    {
      name: "calorieTarget",
      value: calorieTarget,
      error: errors?.calorieTarget,
      label: "Calorie Target",
    },
  ];

  return (
    <div className=" p-2 rounded w-full">
      <h3 className="underline text-lg font-semibold px-4 text-center">
        Core Cardio Sets
      </h3>

      <GenericList
        items={inputs}
        ItemComponent={WorkoutExerciseCoreCardioSetInput}
        itemComponentProps={{ handleChange, itemId: id! }}
        ulStyle="grid grid-cols-3 items-center justify-items-center
         justify-between border rounded p-2 gap-2"
        getKey={(item) => item.name + id}
      />
    </div>
  );
}

const WorkoutExerciseCoreCardioSetInput = ({
  item,
  handleChange,
  itemId,
}: {
  item: TInput;
  handleChange: (e: React.ChangeEvent) => void;
  itemId: string;
}) => {
  const { name, value, error, label } = item;

  if (name === "border") {
    return <span className="col-span-3 border-b w-full" />;
  }
  return (
    <li>
      <Input
        name={`${name}-${itemId}`}
        type="number"
        value={value ?? ""}
        step="any"
        onChange={handleChange}
        divStyle="flex flex-col-reverse items-center gap-2"
        min={0}
        className="border w-input aspect-square rounded text-center"
      >
        <Label className="text-sm text-center" htmlFor={name}>
          {toTitle(label || name)}
        </Label>
        <Label className="text-red-orange text-sm" htmlFor={name}>
          {error}
        </Label>
      </Input>
    </li>
  );
};
