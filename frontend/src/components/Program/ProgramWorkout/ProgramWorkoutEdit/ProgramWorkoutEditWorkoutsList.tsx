//Components
import WorkoutList from "../../../Workout/WorkoutList";
//UI
import PageHeader from "../../../UI/PageHeader";
import GenericModel from "../../../UI/GenericModel";
import WorkoutEditModel from "../../../Workout/WorkoutEditModel";
//Types
import type { IWorkoutDTO } from "../../../../../../shared/models/workout.model";

interface IProgramWorkoutEditWorkoutsListProps {
  modelRef: React.RefObject<HTMLDivElement | null> | undefined;
  handleModel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onSelectProgramWorkout: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    workout?: IWorkoutDTO,
    isCopy?: boolean
  ) => void;
}

export default function ProgramWorkoutEditWorkoutsList({
  modelRef,
  handleModel,
  onSelectProgramWorkout,
}: IProgramWorkoutEditWorkoutsListProps) {
  return (
    <>
      <PageHeader
        pageName="select workout"
        handleModel={handleModel}
        EditModel={
          <GenericModel
            Model={WorkoutEditModel}
            mode="create"
            buttonProps={{
              buttonStyle: "model",
              children: "Create Workout",
              className:
                "bg-main-orange border border-black-300 text-black-900 rounded flex-center px-2 h-full ml-auto",
            }}
            isOverlay={false}
            isPortal={true}
            parentRef={modelRef}
          />
        }
      />

      <div className="grid grid-rows-[3rem_calc(100%-8rem)_3rem] md:grid-rows-[1fr_3rem] md:grid-cols-[auto_1fr] relative gap-y-4">
        <WorkoutList
          actionType="programEdit"
          onSelectProgramWorkout={onSelectProgramWorkout}
        />
      </div>
    </>
  );
}
