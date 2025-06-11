import { useEffect, useState } from "react";
import ExerciseEdit from "../components/Exercise/ExerciseEdit";
import { useExerciseStore } from "../store/exercise.store";
import type { IExerciseDTO } from "../models/exercise.model";
import { toTitle } from "../utils/toTitle";
import DeleteBtn from "../components/UI/DeleteButton";
import IconTrash from "../components/UI/Icons/IconTrash";

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
  return (
    <section className="h-main">
      <header className="p-4">
        <h2>Exercises</h2>
        <ExerciseEdit />
        <input />
      </header>
      <div className="grid gap-4 p-4">
        <header className="border-b grid grid-cols-[8rem_repeat(3,_1fr)_8rem] gap-6 p-4">
          <p>Name</p>
          <p>Muscles</p>
          <p>Equipment</p>
          <p>Types</p>
          <p>Actions</p>
        </header>
        <ul className="grid gap-2">
          {filteredExercises.map((exercise) => (
            <li
              key={exercise.id}
              className="p-4 grid grid-cols-[8rem_repeat(3,_1fr)_8rem] gap-6 shadow-[0_0_1px_1px_rgba(0,0,0,.1)]
               hover:shadow-[0_0_2px_2px_rgba(0,0,0,.3)] transition-all duration-300 rounded items-center  "
            >
              <h3 className="truncate">{exercise.name}</h3>
              <p>{exercise.muscles?.map((e) => toTitle(e.name)).join(", ")}</p>
              <p>{exercise.equipment?.map((e) => toTitle(e.name)).join(",")}</p>
              <p>{exercise.types?.map((e) => toTitle(e.name)).join(",")}</p>
              <div className="grid grid-cols-2 min-h-full h-full gap-4">
                <ExerciseEdit exercise={exercise} />
                <DeleteBtn deleteAction={() => onDelete(exercise.id)}>
                  <IconTrash className="fill-amber stroke-none h-full aspect-square group-hover:stroke-main-black transition-all duration-300" />
                </DeleteBtn>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
