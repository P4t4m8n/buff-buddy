//Components
import WorkoutEditModel from "../../Workout/WorkoutEditModel";
//UI
import GenericModel from "../../UI/GenericModel";
import IconStart from "../../UI/Icons/IconStart";
import LinkComponent from "../../UI/Link";
import GenericCarousel from "../../UI/GenericCarousel";
import Tag from "../../UI/Tag";
//Types
import type { IProgramWorkoutDTO } from "../../../../../shared/models/program.model";
import type { IWorkoutExerciseDTO } from "../../../../../shared/models/workout.model";

interface IProgramWorkoutPreviewProps {
  item: IProgramWorkoutDTO;
}

export default function ProgramWorkoutPreview({
  item: programWorkout,
}: IProgramWorkoutPreviewProps) {
  const { programId, workout } = programWorkout;
  const { name, workoutExercises, id } = workout ?? {};

  const {
    cleanedTypesUsed,
    cleanedMusclesUsed,
    cleanedEquipmentUsed,
    cleanedWorkoutExercises,
  } = getCarouselArrays(workoutExercises);

  return (
    <li className="border rounded flex flex-col gap-2 p-2 h-fit break-inside-avoid mb-4">
      <h4 className="text-center text-xl">{name}</h4>
      <GenericCarousel
        items={cleanedTypesUsed ?? []}
        props={{}}
        ItemComponent={Tag}
        getKey={(item) => item}
        listName="Types"
      />
      <GenericCarousel
        items={cleanedWorkoutExercises ?? []}
        props={{}}
        ItemComponent={Tag}
        getKey={(item) => item}
        listName="Exercises"
      />
      <GenericCarousel
        items={cleanedMusclesUsed ?? []}
        props={{}}
        ItemComponent={Tag}
        getKey={(item) => item}
        listName="Muscles Used"
      />
      <GenericCarousel
        items={cleanedEquipmentUsed ?? []}
        props={{}}
        ItemComponent={Tag}
        getKey={(item) => item}
        listName="Equipment"
      />

      <div className="gap-2 inline-flex justify-between shadow-border-t mt-2 pt-2">
        <GenericModel
          Model={WorkoutEditModel}
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

const getCarouselArrays = (
  workoutExercises: IWorkoutExerciseDTO[] | undefined
) => {
  const cleanedTypesUsed = mapToSet(
    workoutExercises ?? [],
    (we) => we.exercise?.type
  );

  const cleanedMusclesUsed = mapToSet(workoutExercises ?? [], (we) =>
    we.exercise?.muscles?.map((m) => m.name)
  );

  const cleanedEquipmentUsed = mapToSet(workoutExercises ?? [], (we) =>
    we.exercise?.equipment?.map((m) => m.name)
  );

  const cleanedWorkoutExercises = mapToSet(
    workoutExercises ?? [],
    (we) => we.exercise?.name
  );

  return {
    cleanedTypesUsed,
    cleanedMusclesUsed,
    cleanedEquipmentUsed,
    cleanedWorkoutExercises,
  };
};

//INFO: TS is annoying because of optional values added filter to shut it up
const mapToSet = <T, P>(
  arr: T[],
  mapCallBack: (value: T, index: number, array: T[]) => string | P
) => {
  return [
    ...new Set(
      arr
        .map(mapCallBack)
        .flat()
        .filter((i) => !!i)
    ),
  ] as string[];
};
