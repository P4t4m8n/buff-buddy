//Hooks
import { useWorkoutEdit } from "../../../hooks/features/workout/useWorkoutEdit";
//Components
import WorkoutEdit from "./WorkoutEdit";
//UI
import PageHeader from "../../UI/PageHeader";
//Types
import type { IWorkoutEditModelProps } from "../../../models/model.model";

export default function WorkoutEditModel({
  workoutId,
  isCopy,
  handleModel,
  afterSubmit,
  setIsOpen,
}: IWorkoutEditModelProps) {
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
    isCopy,
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
