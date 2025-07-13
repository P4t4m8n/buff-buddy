import type { ICoreSetDTO } from "../../../models/set.model";

interface WorkoutExerciseCoreSetProps {
  coreSet: ICoreSetDTO;
}
export default function WorkoutExerciseCoreSet({
  coreSet,
}: WorkoutExerciseCoreSetProps) {
  const items = [
    {
      label: "Reps",
      value: coreSet.reps,
    },
    {
      label: "Weight",
      value: coreSet.isBodyWeight ? "BW" : coreSet.weight,
    },
    {
      label: "Rest",
      value: coreSet.restTime,
    },
  ];
  return (
    <div className="grid grid-cols-3 justify-items-center items-center pb-2 gap-y-2">
      <p className="font-bold col-span-full text-center">
        {coreSet.isWarmup ? "Warmup" : "Set"}
      </p>
      {items.map((item) => (
        <span key={item.label} className="inline-flex gap-1 items-center">
          <p>{item.label}:</p>
          <p className="bg-amber rounded w-8 aspect-square flex-center">
            {item.value}
          </p>
        </span>
      ))}
    </div>
  );
}
