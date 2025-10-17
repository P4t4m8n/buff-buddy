//Lib
import { useParams } from "react-router";
//Hooks
import { useWorkoutEdit } from "../../hooks/features/workout/useWorkoutEdit";
//Components
import WorkoutEdit from "../../components/Workout/WorkoutEdit";
//UI
import Loader from "../../components/UI/loader/Loader";
import BackButton from "../../components/UI/BackButton";
import { usePageBack } from "../../hooks/shared/usePageBack";

export default function WorkoutEditPage() {
  const { workoutId } = useParams<{ workoutId?: string }>();

  const { navBack } = usePageBack();
  const {
    workoutToEdit,
    isLoading,
    isSaving,
    mutationErrors,
    handleWorkoutExercises,
    handleInputChange,
    saveWorkout,
  } = useWorkoutEdit({ workoutId });

  if (isLoading || !workoutToEdit) {
    return <Loader loaderType="screen" isFullScreen={false} />;
  }

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const res = await saveWorkout();
    if (!res) return; //INFO?? Error is handled in the hook
    navBack();
  };

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navBack();
  };

  const isUpdate = !workoutToEdit.id?.startsWith("temp");

  return (
    <div className="h-main grid grid-rows-[3.5rem_calc(100%-4rem)] gap-2">
      <header className="inline-flex items-center gap-4 border-b h-14  border-b-main-orange/25 px-desktop py-2  col-span-full ">
        <BackButton />
        <h2 className="text-2xl font-bold col-span-full text-center ">
          {`  ${isUpdate ? "Edit" : "Create"} Workout`}
        </h2>
      </header>
      <WorkoutEdit
        workoutToEdit={workoutToEdit}
        isLoading={isLoading}
        isSaving={isSaving}
        errors={mutationErrors}
        handleWorkoutExercises={handleWorkoutExercises}
        handleInputChange={handleInputChange}
        onSubmit={handleSubmitForm}
        onCancel={onCancel}
      />
    </div>
  );
}
