import { useExerciseStore } from "../store/exercise.store";

import { useItemsPage } from "../hooks/shared/useItemsPage";

import ExerciseList from "../components/Exercise/ExerciseList";
import ExerciseEdit from "../components/Exercise/ExerciseEdit";
import GenericModel from "../components/UI/GenericModel";

export default function ExercisePage() {
  const {
    items: exercises,
    isLoading,
    onDeleteItem,
  } = useItemsPage({
    useStore: useExerciseStore,
  });

  return (
    <section className="h-main flex flex-col gap-4">
      <header className="p-mobile md:p-desktop  ">
        <span className="text-center flex flex-col items-center gap-2 pb-4">
          <h2 className="text-2xl font-bold text-white ">
            Welcome to Exercise Land!
          </h2>
          <p className="text-lg text-gray-200">
            Get ready to move, groove, and boost your mood with every workout!
          </p>
        </span>
        <GenericModel
          Model={ExerciseEdit}
          mode="create"
          buttonProps={{ buttonStyle: "model" }}
        />
      </header>
      <ExerciseList
        filteredExercises={exercises}
        isLoading={isLoading}
        onDelete={onDeleteItem}
      />
    </section>
  );
}
