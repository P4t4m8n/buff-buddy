import type { IWorkoutDTO } from "../../models/workout.model";
import { toTitle } from "../../utils/toTitle";
import { workoutUtils } from "../../utils/workout.util";
import type {
  TExerciseEquipment,
  TExerciseType,
  TExerciseMuscle,
} from "../../models/exercise.model";
import { Link } from "react-router";
import Button from "../UI/Button";
import IconEdit from "../UI/Icons/IconEdit";
import IconDetails from "../UI/Icons/IconDetails";
import WorkoutStartModel from "./WorkoutStartModel";

interface IWorkoutPreviewProps {
  workout: IWorkoutDTO;
}
export default function WorkoutPreview({ workout }: IWorkoutPreviewProps) {
  const { program, workoutExercises } = workout;
  const muscles = workoutUtils.getWorkoutProperty<TExerciseMuscle>(
    workout,
    "muscles"
  );

  const equipment = workoutUtils.getWorkoutProperty<TExerciseEquipment>(
    workout,
    "equipment"
  );
  const types = workoutUtils.getWorkoutProperty<TExerciseType>(
    workout,
    "types"
  );

  const info = [muscles, equipment, types]
    .map((type) =>
      type.map((item) => (
        <li
          key={item}
          className="border  h-fit py-1 px-2 rounded-4xl text-xs bg-amber"
        >
          <p>{toTitle(item)}</p>
        </li>
      ))
    )
    .flat();
  return (
    <li className="border rounded w-full h-full grid grid-cols-2 grid-rows-2 p-2 gap-4 items-center">
      <h4>ProgramName:{program.name}</h4>
      <p className="order-3">Exercises: {workoutExercises?.length}</p>
      <ul className="flex flex-wrap gap-2 items-center justify-center w-full row-span-2 h-full overflow-auto">
        {...info}
      </ul>
      <div className="order-4 gap-4 col-span-2 inline-flex">
        <Link
          to={`/programs/edit/${program.id}`}
          className="place-self-end lg:place-self-auto"
        >
          <Button buttonStyle="model">
            <IconEdit
              className="fill-none stroke-amber h-full aspect-square
                   group-hover:stroke-main-black transition-all duration-300"
            />
          </Button>
        </Link>
        <Link
          to={`/programs/${program.id}`}
          className=" place-self-start lg:place-self-auto"
        >
          <Button buttonStyle="model">
            <IconDetails
              className="fill-amber stroke-amber h-full aspect-square
                   group-hover:stroke-main-black group-hover:fill-main-black transition-all duration-300"
            />
          </Button>
        </Link>
        {/* <Button
          buttonStyle="model"
          className="text-amber ml-auto w-36 hover:text-black"
        >
          <Link to={`/workout/edit/${program.id}/${workout.id}`}>
            Start Workout
          </Link>
        </Button> */}
        <WorkoutStartModel workout={workout} />
      </div>
    </li>
  );
}
