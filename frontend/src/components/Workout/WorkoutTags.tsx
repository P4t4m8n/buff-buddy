import type { IWorkoutExerciseDTO } from "../../../../shared/models/workout.model";
import GenericList from "../UI/GenericList";

interface IWorkoutTagsProps {
  workoutExercises?: IWorkoutExerciseDTO[];
}

export default function WorkoutTags({ workoutExercises }: IWorkoutTagsProps) {
  return (
    <>
      <GenericList
        items={workoutExercises || []}
        ItemComponent={WorkoutTag}
        getKey={(item) => item.id || ""}
        ulStyle="flex w-full overflow-x-scroll gap-2 py-2"
      />
    </>
  );
}

interface IWorkoutTagProps {
  item?: IWorkoutExerciseDTO;
}

function WorkoutTag({ item: workoutExercise }: IWorkoutTagProps) {
  const { name } = workoutExercise?.exercise ?? {};
  return (
    <li
      className="border rounded-4xl px-2 py-1 min-w-fit shadow
       bg-main-black text-main-orange shadow-black"
      key={name}
    >
      {name}
    </li>
  );
}
