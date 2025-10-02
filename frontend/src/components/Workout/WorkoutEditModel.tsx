//Hooks
import { useWorkoutEdit } from "../../hooks/features/workout/useWorkoutEdit";
//Components
import WorkoutEdit from "./WorkoutEdit";
//Types
import type { IWorkoutDTO } from "../../../../shared/models/workout.model";
import type { IModelProps } from "../../models/UI.model";
import PageHeader from "../UI/PageHeader";

interface WorkoutCreateProps extends IModelProps<HTMLFormElement> {
  workoutId?: string;
  handleModel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  afterSubmit?: (workout: IWorkoutDTO) => void;
}
export default function WorkoutEditModel({
  workoutId,
  handleModel,
  afterSubmit,
  ...props
}: WorkoutCreateProps) {
  const { setIsOpen } = props;

  const {
    workoutToEdit,
    isLoading,
    isSaving,
    mutationErrors,
    handleWorkoutExercises,
    handleInputChange,
    saveWorkout,
  } = useWorkoutEdit({
    workoutId,
  });

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      e.stopPropagation();

      const savedWorkout = await saveWorkout();

      if (!savedWorkout) {
        console.warn("No Workout to save, this should not happen");
        return;
      }
      if (afterSubmit) afterSubmit(savedWorkout);
      if (setIsOpen) setIsOpen(false);
    } catch (error) {
      //INFO: The try catch block in need to let the error be caught some where. errors are handled in the mutation hook
    }
  };

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (handleModel) handleModel(e);
    else console.warn("handleModel is not defined, This should not happen");
  };
  const isUpdate = !workoutToEdit?.id?.startsWith("temp");

  return (
    <div className="h-main absolute inset-0 z-50 bg-black-900 grid grid-rows-[3.5rem_calc(100%-4rem)] gap-2">
      <PageHeader
        handleModel={handleModel}
        pageName={`  ${isUpdate ? "Edit" : "Create"} Workout`}
      />
      <WorkoutEdit
        workoutToEdit={workoutToEdit}
        isLoading={isLoading}
        errors={mutationErrors}
        handleWorkoutExercises={handleWorkoutExercises}
        handleInputChange={handleInputChange}
        onSubmit={handleSubmitForm}
        onCancel={onCancel}
        isSaving={isSaving}
      />
    </div>
  );
}
