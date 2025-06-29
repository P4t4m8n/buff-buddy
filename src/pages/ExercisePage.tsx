import { useEffect, useState } from "react";
import { useExerciseStore } from "../store/exercise.store";
import ExerciseEdit from "../components/Exercise/ExerciseEdit";
import type { IExerciseDTO } from "../models/exercise.model";
import WrapperModel from "../components/UI/Wrappers/WrapperModel";
import ExerciseTable from "../components/Exercise/ExerciseTable";

export default function ExercisePage() {
  const exercises = useExerciseStore((state) => state.exercises);
  const loadExercises = useExerciseStore((state) => state.loadExercises);
  const deleteExercise = useExerciseStore((state) => state.deleteExercise);
  const [filteredExercises, setFilteredExercises] =
    useState<IExerciseDTO[]>(exercises);

  useEffect(() => {
    loadExercises();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setFilteredExercises(exercises);
  }, [exercises]);

  const onDelete = async (id?: string) => {
    if (!id) {
      console.warn("No ID provided for deletion.");
      return;
    }
    await deleteExercise(id);
  };

  return (
    <section className="h-main">
      <header className="p-4 ">
        <span className="text-center flex flex-col items-center gap-2 pb-4">
          <h2 className="text-2xl font-bold text-white ">
            Welcome to Exercise Land!
          </h2>
          <p className="text-lg text-gray-200">
            Get ready to move, groove, and boost your mood with every workout!
          </p>
        </span>
        <WrapperModel mode="create" buttonClass="">
          <ExerciseEdit />
        </WrapperModel>
      </header>
      <ExerciseTable exercises={filteredExercises} onDelete={onDelete} />
    </section>
  );
}
