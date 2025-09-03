import GenericList from "../UI/GenericList";

type TItem = {
  name: string;
  value: string | number;
};

interface IWorkoutStartExerciseCoreSetProps {
  items?: TItem[];
}

export default function WorkoutStartExerciseCoreSet({
  items,
}: IWorkoutStartExerciseCoreSetProps) {
  return (
    <GenericList
      items={items ?? []}
      ItemComponent={CoreSet}
      getKey={(item) => item.name}
      ulStyle="flex justify-around sticky -top-2 z-10 border-b border-t py-2 bg-black-900"
    />
  );
}

const CoreSet = ({ item }: { item: TItem }) => {
  const { name, value } = item;

  const P_STYLE = `bg-black rounded w-8
   aspect-square text-amber flex-center`;

  const SPAN_STYLE = `inline-flex flex-col gap-1 items-center
     not-last:border-r not-last:pr-2`;

  return (
    <span className={SPAN_STYLE}>
      <h6>{name}</h6>
      <p className={P_STYLE}>{value}</p>
    </span>
  );
};
