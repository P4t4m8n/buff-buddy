import { useEffect, useState } from "react";

import { useExerciseStore } from "../store/exercise.store";

import ExerciseEdit from "../components/Exercise/ExerciseEdit";
import GenericModel from "../components/UI/GenericModel";

import type { IExerciseDTO } from "../../../shared/models/exercise.model";
import ExerciseList from "../components/Exercise/ExerciseList";

export default function ExercisePage() {
  const loadExercises = useExerciseStore((state) => state.loadExercises);
  const deleteExercise = useExerciseStore((state) => state.deleteExercise);

  const exercises = useExerciseStore((state) => state.exercises);
  const isLoading = useExerciseStore((state) => state.isLoading);

  const [filteredExercises, setFilteredExercises] =
    useState<IExerciseDTO[]>(exercises);

  useEffect(() => {
    loadExercises();
  }, [loadExercises]);

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
        filteredExercises={filteredExercises}
        isLoading={isLoading}
        onDelete={onDelete}
      />
    </section>
  );
}
