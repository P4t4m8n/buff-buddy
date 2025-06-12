import { useEffect, useState } from "react";
import ExerciseEdit from "../components/Exercise/ExerciseEdit";
import { useExerciseStore } from "../store/exercise.store";
import Table from "../components/UI/Table";
import ExerciseTableItem from "../components/Exercise/ExerciseTableItem";
import type { IExerciseDTO } from "../models/exercise.model";

export default function ExercisePage() {
  const exercises = useExerciseStore((state) => state.exercises);
  const loadExercises = useExerciseStore((state) => state.loadExercises);
  const deleteExercise = useExerciseStore((state) => state.deleteExercise);
  const [filteredExercises, setFilteredExercises] =
    useState<IExerciseDTO[]>(exercises);

  useEffect(() => {
    loadExercises();
    setFilteredExercises(exercises);
  }, [exercises]);

  const onDelete = async (id?: string) => {
    if (!id) {
      console.warn("No ID provided for deletion.");
      return;
    }
    await deleteExercise(id);
  };

  const tableHeader = ["Name", "Muscles", "Equipment", "Types", "Actions"];
  const gridCols = "[8rem_repeat(3,_1fr)_8rem]";
  return (
    <section className="h-main">
      <header className="p-4">
        <h2>Exercises</h2>
        <ExerciseEdit />
        <input />
      </header>
      <Table<IExerciseDTO>
        header={tableHeader}
        items={filteredExercises}
        ItemComponent={ExerciseTableItem}
        gridCols={gridCols}
        onDelete={onDelete}
      />
    </section>
  );
}
