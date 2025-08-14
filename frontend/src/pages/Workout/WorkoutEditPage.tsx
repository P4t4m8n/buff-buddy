import { useNavigate, useParams } from "react-router";

import { useWorkoutEdit } from "../../hooks/features/workout/useWorkoutEdit";

import WorkoutEdit from "../../components/Workout/WorkoutEdit";

export default function WorkoutEditPage() {
  const { workoutId } = useParams<{ workoutId?: string }>();
  const navigate = useNavigate();
  const {
    workoutToEdit,
    isLoading,
    errors,
    handleWorkoutExercises,
    handleInputChange,
    onSubmit,
  } = useWorkoutEdit({ workoutId });

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const res = await onSubmit();
    if (!res) return; //INFO?? Error is handled in the hook
    navigate(-1);
  };

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className="h-main">
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
