import type { IProgramWorkoutDTO } from "../../../../shared/models/program.model";
import GenericList from "../UI/GenericList";
import GenericModel from "../UI/GenericModel";
import GenericTags from "../UI/GenericTags";
import IconStart from "../UI/Icons/IconStart";
import LinkComponent from "../UI/Link";
import WorkoutEdit from "../Workout/WorkoutEdit";

interface IProgramWorkoutPreviewProps {
  item: IProgramWorkoutDTO;
}

type TTagItem<T> = {
  header: string;
  items: T[];
  getKey: (item: T) => string;
  getTag: (item: T) => string;
};
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

  const tags: TTagItem<any>[] = [
    {
      header: "Exercise Types",
      items: cleanedTypesUsed ?? [],
      getKey: (item: any) => item,
      getTag: (item: any) => item,
    },
    {
      header: "Exercises",
      items: workoutExercises ?? [],
      getKey: (item: any) => item.id!,
      getTag: (item: any) => item.exercise?.name ?? "",
    },
    {
      header: "Equipment",
      items: cleanedEquipmentUsed ?? [],
      getKey: (item: any) => item,
      getTag: (item: any) => item ?? "",
    },
    {
      header: "Muscles Used",
      items: cleanedMusclesUsed ?? [],
      getKey: (item: any) => item!,
      getTag: (item: any) => item!,
    },
  ];

  return (
    <li className="border rounded flex flex-col gap-2 p-2 h-fit break-inside-avoid mb-4">
      <h4 className="text-center text-xl">{name}</h4>
      <GenericList
        items={tags}
        ItemComponent={TagItem}
        getKey={(item) => item.header}
        ulStyle="flex flex-col  w-full"
      />

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

const TagItem = <T,>({ item }: { item: TTagItem<T> }) => {
  const { header, ...items } = item;
  return (
    <li className="w-full overflow-auto ">
      <h5>{header}</h5>
      <GenericTags {...items} />
    </li>
  );
};
