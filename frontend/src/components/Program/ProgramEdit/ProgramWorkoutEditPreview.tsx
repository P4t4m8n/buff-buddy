import type {
  IProgramWorkoutDTO,
  IProgramWorkoutEditDTO,
} from "../../../../../shared/models/program.model";
import GenericModel from "../../UI/GenericModel";
import ProgramWorkoutEdit from "./ProgramWorkoutEdit";

interface IProgramWorkoutEditPreview {
  item: IProgramWorkoutDTO;
  handleProgramWorkouts?: (workout: IProgramWorkoutEditDTO) => void;
}

export default function ProgramWorkoutEditPreview({
  item: programWorkout,
  handleProgramWorkouts,
}: IProgramWorkoutEditPreview) {
  const name = programWorkout.workout?.name || "No Workout Assigned";
  return (
    <li
      key={programWorkout!.id!}
      className="border text-center w-24 lg:w-full flex flex-col items-center justify-between
                  gap-1 p-1 rounded "
    >
      <h5 className="font-medium text-xl line-clamp-3 ">{name}</h5>
      <div>
        <GenericModel
          Model={ProgramWorkoutEdit}
          modelProps={{ handleProgramWorkouts, programWorkout }}
          mode="create"
          buttonProps={{ buttonStyle: "model", className: "mr-auto" }}
          isOverlay={false}
        />
      </div>
    </li>
  );
}
