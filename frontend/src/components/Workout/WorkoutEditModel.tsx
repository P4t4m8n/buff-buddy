import { useWorkoutEdit } from "../../hooks/features/workout/useWorkoutEdit";

import WorkoutEdit from "./WorkoutEdit";

import type { IModelProps } from "../UI/GenericModel";

import type {
  IWorkoutDTO,
  IWorkoutEditDTO,
} from "../../../../shared/models/workout.model";

interface WorkoutCreateProps extends IModelProps<HTMLFormElement> {
  workout?: IWorkoutDTO | IWorkoutEditDTO;
  handleModel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  afterSubmit?: (workout: IWorkoutDTO) => void;
}
export default function WorkoutEditModel({
  workout,
  handleModel,
  afterSubmit,
  ...props
}: WorkoutCreateProps) {
  const { setIsOpen } = props;

  const {
    workoutToEdit,
    isLoading,
    errors,
    handleWorkoutExercises,
    handleInputChange,
    onSubmit,
  } = useWorkoutEdit({
    workout,
  });

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const savedWorkout = await onSubmit();
    if (!savedWorkout) return; //INFO?? Error is handled in the hook
    if (afterSubmit) afterSubmit(savedWorkout as IWorkoutDTO);
    if (setIsOpen) setIsOpen(false);
  };

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (handleModel) handleModel(e);
    else console.warn("handleModel is not defined"); //INFO?? for debugging purposes not for production
  };

  return (
    <div className="h-main absolute inset-0 ">
      <WorkoutEdit
        workoutToEdit={workoutToEdit}
        isLoading={isLoading}
        errors={errors}
        handleWorkoutExercises={handleWorkoutExercises}
        handleInputChange={handleInputChange}
        onSubmit={handleSubmitForm}
        onCancel={onCancel}
      />
    </div>
  );
}
