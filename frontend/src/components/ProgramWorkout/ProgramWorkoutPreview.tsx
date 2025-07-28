import type { IProgramWorkoutDTO } from "../../../../shared/models/program.model";
import GenericTags from "../UI/GenericTags";
import LinkComponent from "../UI/Link";

interface IProgramWorkoutPreviewProps {
  item: IProgramWorkoutDTO;
}
export default function ProgramWorkoutPreview({
  item: programWorkout,
}: IProgramWorkoutPreviewProps) {
  const { programId, workout } = programWorkout;
  const { name, workoutExercises, id } = workout ?? {};

  const typesUsed = workoutExercises?.map((we) => we.exercise?.types).flat();
  const cleanedTypesUsed = [...new Set(typesUsed)];

  return (
    <li className="border rounded w-full h-full grid p-2 gap-4 items-center">
      <h4 className="text-center text-xl">{name}</h4>
      <div>
        <h5>Exercises Types:</h5>
        {/* Exercises type tags*/}
        <GenericTags
          items={cleanedTypesUsed ?? []}
          getKey={(item) => item!}
          getTag={(item) => item ?? ""}
        />
      </div>

      <div>
        <h5>Exercises:</h5>
        {/* Exercises name tags */}
        <GenericTags
          items={workoutExercises ?? []}
          getKey={(item) => item.id!}
          getTag={(item) => item.exercise?.name ?? ""}
        />
      </div>

      <div className="gap-4  inline-flex justify-between">
        <LinkComponent
          linkStyle="model"
          mode="details"
          className="text-amber w-36 hover:text-black"
          to={`/workouts/${id}`}
        >
          Details
        </LinkComponent>

        <LinkComponent
          linkStyle="model"
          mode="details"
          className="text-amber w-36 hover:text-black"
          to={`/workouts/workout-start/${programId}/${id}`}
        >
          Start Workout
        </LinkComponent>
      </div>
    </li>
  );
}
