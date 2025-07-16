import { Fragment } from "react/jsx-runtime";
import type { IWorkoutExerciseEditDTO } from "../../../../../models/workout.model";
import WorkoutExerciseListItem from "./WorkoutExerciseEditListItem";
import { toTitle } from "../../../../../utils/toTitle";

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
        {tableHeader.map((title, idx) => (
          <p
            key={title}
            className={`${
              idx > 0 && idx < tableHeader.length - 1 ? hiddenClass : ""
            } $ ${
              idx === tableHeader.length - 1 ? "text-center lg:text-left " : ""
            }`}
          >
            {toTitle(title)}
          </p>
        ))}
      </header>
      <ul>
        {workoutExercises?.map((we) => (
          <Fragment key={we.id}>
            <WorkoutExerciseListItem
              workoutExercise={we}
              handleWorkoutExercise={handleWorkoutExercise}
              gridCols={gridCols}
            />
          </Fragment>
        ))}
      </ul>
    </div>
  );
}
