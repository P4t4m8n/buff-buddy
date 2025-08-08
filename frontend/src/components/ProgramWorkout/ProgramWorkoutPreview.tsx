import type { IProgramWorkoutDTO } from "../../../../shared/models/program.model";
import GenericModel from "../UI/GenericModel";
import GenericTags from "../UI/GenericTags";
import IconStart from "../UI/Icons/IconStart";
import LinkComponent from "../UI/Link";
import WorkoutEdit from "../Workout/WorkoutEdit";

interface IProgramWorkoutPreviewProps {
  item: IProgramWorkoutDTO;
}
export default function ProgramWorkoutPreview({
  item: programWorkout,
}: IProgramWorkoutPreviewProps) {
  const { programId, workout } = programWorkout;
  const { name, workoutExercises, id } = workout ?? {};

  const typesUsed = workoutExercises?.map((we) => we.exercise?.type);
  const cleanedTypesUsed = [...new Set(typesUsed)];

  const musclesUses = workoutExercises
    ?.map((we) => we.exercise?.muscles)
    .flat();
  const cleanedMusclesUsed = [...new Set(musclesUses)];

  const equipmentUsed = workoutExercises
    ?.map((we) => we.exercise?.equipment)
    .flat();
  const cleanedEquipmentUsed = [...new Set(equipmentUsed)];

  return (
    <li className="border rounded flex flex-col gap-2 p-2 h-fit break-inside-avoid mb-4">
      <h4 className="text-center text-xl">{name}</h4>
      <ul className=" flex flex-col  w-full">
        <li className="w-fit overflow-auto ">
          <h5>Exercises Types:</h5>
          {/* Exercises type tags*/}
          <GenericTags
            items={cleanedTypesUsed ?? []}
            getKey={(item) => item!}
            getTag={(item) => item ?? ""}
          />
        </li>

        <li className="w-fit overflow-auto">
          <h5>Exercises:</h5>
          {/* Exercises name tags */}
          <GenericTags
            items={workoutExercises ?? []}
            getKey={(item) => item.id!}
            getTag={(item) => item.exercise?.name ?? ""}
          />
        </li>
        <li className="w-fit overflow-auto">
          <h5>Equipment:</h5>
          {/* Exercises name tags */}
          <GenericTags
            items={cleanedEquipmentUsed ?? []}
            getKey={(item) => item!}
            getTag={(item) => item ?? ""}
          />
        </li>
        <li className="w-fit overflow-auto">
          <h5>Muscles USed:</h5>
          {/* Muscles name tags */}
          <GenericTags
            items={cleanedMusclesUsed ?? []}
            getKey={(item) => item!}
            getTag={(item) => item!}
          />
        </li>
      </ul>
      <div className="gap-2 inline-flex justify-between shadow-border-t mt-2 pt-2">
        <GenericModel
          Model={WorkoutEdit}
          modelProps={{ workout }}
          mode="edit"
          buttonProps={{ buttonStyle: "model" }}
        />
        <LinkComponent
          linkStyle="model"
          mode="details"
          className="bg-main-orange w-14 hover:text-black group"
          to={`/workouts/${id}`}
        />

        <LinkComponent
          linkStyle="model"
          mode="details"
          className="p-1 w-14  ml-auto "
          to={`/workouts/workout-start/${programId}/${id}`}
        >
          <IconStart
            className="fill-none stroke-black-900  h-full aspect-square
             group-hover:stroke-main-orange group-hover:fill-amber transition-all duration-300"
          />{" "}
        </LinkComponent>
      </div>
    </li>
  );
}
