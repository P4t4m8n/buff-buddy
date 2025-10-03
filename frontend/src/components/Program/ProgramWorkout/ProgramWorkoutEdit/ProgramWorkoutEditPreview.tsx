import { memo } from "react";
import type {
  IProgramWorkoutDTO,
  IProgramWorkoutEditDTO,
} from "../../../../../../shared/models/program.model";
import { ModelButtonIcon } from "../../../../utils/ModelButtonIcon.util";
import Button from "../../../UI/Button";
import GenericModel from "../../../UI/GenericModel";
import ProgramWorkoutEdit from "./ProgramWorkoutEdit";

interface IProgramWorkoutEditPreview {
  item: IProgramWorkoutDTO;
  deleteProgramWorkout: (id?: string) => void;
  handleProgramWorkouts: (workout: IProgramWorkoutEditDTO) => void;
}

function ProgramWorkoutEditPreview({
  item: programWorkout,
  deleteProgramWorkout,
  handleProgramWorkouts,
}: IProgramWorkoutEditPreview) {
  const onDeleteProgramWorkout = () => {
    deleteProgramWorkout(programWorkout?.id);
  };

  const name = programWorkout.workout?.name || "No Workout Assigned";
  return (
    <li
      key={programWorkout!.id!}
      className="border text-center w-32 lg:w-full flex flex-col items-center justify-between
                  gap-1 p-1 rounded "
    >
      <h5 className="font-medium text-xl line-clamp-3 ">{name}</h5>
      <div className="flex justify-between w-full">
        <Button
          onClick={onDeleteProgramWorkout}
          buttonStyle="model"
          className=""
          type="button"
        >
          {ModelButtonIcon("delete")}
        </Button>
        <GenericModel
          Model={ProgramWorkoutEdit}
          modelProps={{ programWorkout, handleProgramWorkouts }}
          mode="edit"
          buttonProps={{ buttonStyle: "model", className: "" }}
          isOverlay={false}
          isPortal={true}
        />
      </div>
    </li>
  );
}

export default memo(ProgramWorkoutEditPreview);
