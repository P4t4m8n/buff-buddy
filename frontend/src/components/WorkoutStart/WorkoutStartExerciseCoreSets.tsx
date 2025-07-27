import type { ICoreSetDTO } from "../../../../shared/models/set.model";
import GenericList from "../UI/GenericList";

interface IWorkoutStartExerciseCoreSetsProps {
  coreSet?: ICoreSetDTO;
}

type TItem = {
  name: string;
  value: string | number;
};
const P_STYLE = `bg-black rounded w-8 aspect-square text-amber flex-center `;
const SPAN_STYLE =
  "inline-flex flex-col gap-1 items-center not-last:border-r not-last:pr-2";
export default function WorkoutStartExerciseCoreSets({
  coreSet,
}: IWorkoutStartExerciseCoreSetsProps) {
  const { reps, weight, isBodyWeight, restTime } = coreSet!;

  const items = [
    {
      name: "Goal Reps",
      value: reps || "",
    },
    {
      name: "Goal Weight per Set",
      value: isBodyWeight ? "BW" : weight ?? "",
    },
    {
      name: "Rest Time",
      value: restTime || "",
    },
  ];
  return (
    <GenericList
      items={items}
      ItemComponent={CoreSet}
      getKey={(item) => item.name}
      ulStyle="flex justify-around sticky top-0 bg-main-orange z-10 border-b pb-2"
    />
  );
}

const CoreSet = ({ item }: { item: TItem }) => {
  const { name, value } = item;

  return (
    <span className={SPAN_STYLE}>
      <h6>{name}</h6>
      <p className={P_STYLE}>{value}</p>
    </span>
  );
};
