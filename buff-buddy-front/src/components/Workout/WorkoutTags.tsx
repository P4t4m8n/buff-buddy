import type {
  IWorkoutDTO,
  IWorkoutExerciseDTO,
} from "../../../../shared/models/workout.model";
import GenericList from "../UI/GenericList";

interface IWorkoutTagsProps {
  workout?: IWorkoutDTO;
}

export default function WorkoutTags({ workout }: IWorkoutTagsProps) {
  const { name, workoutExercises } = workout!;
  console.log("🚀 ~ WorkoutTags ~ workoutExercises:", workoutExercises)

  return (
    <>
      <h4>{name}</h4>
      <GenericList
        items={workoutExercises || []}
        ItemComponent={WorkoutTag}
        getKey={(item) => item.id || ""}
        ulStyle="flex w-full overflow-auto gap-2 py-2"
      />
      
    </>
  );
}

interface IWorkoutTagProps {
  item?: IWorkoutExerciseDTO;
}

function WorkoutTag({ item:workoutExercise }: IWorkoutTagProps) {
  console.log("🚀 ~ WorkoutTag ~ workoutExercise:", workoutExercise)
  const { name } = workoutExercise?.exercise ?? {};
  return (
    <li
      className="border rounded-4xl px-2 py-1 min-w-fit shadow bg-main-black text-main-orange shadow-black"
      key={name}
    >
      {name}
    </li>
  );
}
