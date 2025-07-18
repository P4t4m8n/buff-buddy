import WorkoutExerciseListItem from "./WorkoutExerciseEditListItem";
import { toTitle } from "../../../../../utils/toTitle";
import type { IWorkoutExerciseEditDTO } from "../../../../../../../shared/models/workout.model";
import GenericList from "../../../../UI/GenericList";

interface IWorkoutExerciseEditListProps {
  workoutExercises?: IWorkoutExerciseEditDTO[];
  handleWorkoutExercise: (workoutExercise: IWorkoutExerciseEditDTO) => void;
}
export default function WorkoutExerciseEditList({
  workoutExercises,
  handleWorkoutExercise,
}: IWorkoutExerciseEditListProps) {
  const tableHeader = ["order", "name", "sets", "Actions"];
  const gridCols =
    "grid-cols-[3rem_minmax(7rem,1fr)_2.25rem_1fr] sm:grid-cols-[3rem_minmax(13.5rem,1fr)_2.25rem_minmax(13.5rem,1fr)] gap-6 p-4";
  const hiddenClass = ` sm:inline`;

  return (
    <div>
      <header className={`border-b grid ${gridCols}`}>
        <ul>
          {tableHeader.map((title, idx) => (
            <li key={title}>
              <p
                className={`${
                  idx > 0 && idx < tableHeader.length - 1 ? hiddenClass : ""
                } $ ${
                  idx === tableHeader.length - 1
                    ? "text-center lg:text-left "
                    : ""
                }`}
              >
                {toTitle(title)}
              </p>
            </li>
          ))}
        </ul>
      </header>
      <GenericList
        items={workoutExercises ?? []}
        getKey={(we) => we.id!}
        className="flex justify-around items-center h-full bg-main-black text-white"
        renderItem={(we) => (
          <WorkoutExerciseListItem
            workoutExercise={we}
            handleWorkoutExercise={handleWorkoutExercise}
            gridCols={gridCols}
          />
        )}
      />
    </div>
  );
}
