import { useEffect, useState } from "react";

import { useExerciseStore } from "../store/exercise.store";

import ExerciseEdit from "../components/Exercise/ExerciseEdit";
import GenericList from "../components/UI/GenericList";
import ExercisePreview from "../components/Exercise/ExercisePreview";
import Loader from "../components/UI/Loader";
import GenericModel from "../components/UI/GenericModel";

import type { IExerciseDTO } from "../../../shared/models/exercise.model";

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

  if (isLoading) {
    return <Loader />;
  }

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
      <GenericList
        items={filteredExercises}
        ItemComponent={ExercisePreview}
        itemComponentProps={{ onDelete }}
        getKey={(item) => item.id!}
        ulStyle="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] 
        h-auto overflow-auto gap-4 p-mobile md:p-desktop"
      />
    </section>
  );
}
