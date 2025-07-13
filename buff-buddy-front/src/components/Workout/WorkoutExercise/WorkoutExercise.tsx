import { useModel } from "../../../hooks/shared/useModel";
import Button from "../../UI/Button";
import IconArrow from "../../UI/Icons/IconArrow";
import WorkoutExerciseVideo from "./WorkoutExerciseVideo";

import { useEffect, useState } from "react";
import type {
  IWorkoutExerciseDTO,
  IWorkoutSets,
} from "../../../models/workout.model";
import WorkoutExerciseList from "./WorkoutExerciseList";

interface WorkoutStartItemProps {
  workoutExercise: IWorkoutExerciseDTO;
  handleWorkoutExercise: (we: IWorkoutExerciseDTO) => void;
}
export default function WorkoutExercise({
  workoutExercise,
  handleWorkoutExercise,
}: WorkoutStartItemProps) {
  const [isOpen, setIsOpen, handleModel] = useModel(null);
  const [workoutExerciseToEdit, setWorkoutExerciseToEdit] =
    useState<IWorkoutExerciseDTO | null>(null);

  const [workoutExerciseErrors, setWorkoutExerciseErrors] = useState<
    Array<Record<string, Record<string, string>>>
  >([]);

  useEffect(() => {
    setWorkoutExerciseToEdit(workoutExercise);
  }, [workoutExercise]);

  const handleUserSetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    const [key, id] = name.split("-");

    setWorkoutExerciseToEdit((prev) => {
      if (!prev) return null;

      const updatedCoreSets: IWorkoutSets[] = prev.sets?.map((set) => {
        if (set.userSet.id === id) {
          return {
            ...set,
            userSet: {
              ...set.userSet,
              [key]: type === "checkbox" ? checked : parseFloat(value),
              crudOperation:
                set.userSet?.crudOperation !== "create"
                  ? "update"
                  : set.userSet?.crudOperation,
            },
          };
        }
        return set;
      });
      return {
        ...prev,
        sets: updatedCoreSets,
      };
    });
  };

  const logUserSet = (id?: string) => {
    if (!id) {
      console.error("Logging user set with id:", id);
      return;
    }
    if (!workoutExerciseToEdit) {
      console.error("No workout exercise to log.");
      return;
    }

    const idx = workoutExerciseToEdit.sets?.findIndex(
      (set) => set.userSet.id === id
    );

    if (idx === undefined || idx < 0) {
      console.error("Set not found for id:", id);
      return;
    }
    const userSet = { ...workoutExerciseToEdit.sets?.[idx!].userSet };

    const isValidWeights = userSet.weight && !isNaN(userSet.weight);
    const isValidReps = userSet.reps && !isNaN(userSet.reps);
    const isValidRestTime = userSet.restTime && !isNaN(userSet.restTime);

    if (!isValidWeights || !isValidReps || !isValidRestTime) {
      setWorkoutExerciseErrors((prev) => [
        ...prev,
        {
          [id!]: {
            weight: isValidWeights ? "" : "Weight must be a number",
            reps: isValidReps ? "" : "Reps must be a number",
            restTime: isValidRestTime ? "" : "Rest time must be a number",
          },
        },
      ]);
      console.error("Invalid user set data:", userSet);
      return;
    }
    const updatedCoreSets: IWorkoutSets[] = workoutExerciseToEdit.sets?.map(
      (set) => {
        if (set.userSet.id === id) {
          return {
            ...set,
            userSet: {
              ...set.userSet,
              isCompleted: true,
            },
          };
        }
        return set;
      }
    );

    const workoutExerciseToSave = {
      ...workoutExerciseToEdit,
      sets: updatedCoreSets,
    };

    setWorkoutExerciseToEdit(workoutExerciseToSave);
    handleWorkoutExercise(workoutExerciseToSave);
  };

  const completeAllUserSets = () => {
    if (!workoutExerciseToEdit) {
      console.error("No workout exercise to complete all sets.");
      return;
    }
    const updatedCoreSets: IWorkoutSets[] = workoutExerciseToEdit.sets?.map(
      (set) => ({
        ...set,
        userSet: {
          ...set.userSet,
          isCompleted: true,
        },
      })
    );
    const isFinished = updatedCoreSets.reduce((acc, set) => {
      return acc && !!set?.userSet?.isCompleted;
    }, true);

    const workoutExerciseToSave = {
      ...workoutExerciseToEdit,
      sets: updatedCoreSets,
    };

    setWorkoutExerciseToEdit(workoutExerciseToSave);
    handleWorkoutExercise(workoutExerciseToSave);

    if (isFinished) {
      setIsOpen(false);
    }
  };

  const fillAllSets = () => {
    if (!workoutExerciseToEdit) {
      console.error("No workout exercise to fill all sets.");
      return;
    }
    const updatedCoreSets: IWorkoutSets[] = workoutExerciseToEdit.sets?.map(
      (set) => {
        return {
          ...set,
          userSet: {
            ...set.userSet,
            reps: set.coreSet.reps,
            weight: set.coreSet.weight,
            restTime: set.coreSet.restTime,
          },
        };
      }
    );

    const workoutExerciseToSave = {
      ...workoutExerciseToEdit,
      sets: updatedCoreSets,
    };

    setWorkoutExerciseToEdit(workoutExerciseToSave);
    handleWorkoutExercise(workoutExerciseToSave);
  };

  if (!workoutExerciseToEdit) {
    return null;
  }
  const { id, exercise, sets } = workoutExerciseToEdit;
  const { youtubeUrl } = exercise;

  const isFinished = sets.reduce((acc, set) => {
    return acc && !!set?.userSet?.isCompleted;
  }, true);

  return (
    <li
      key={id}
      className={`border rounded ${
        isFinished ? "border-green-500" : ""
      }  grid ${
        isOpen ? "h-full" : "h-20 min-h-20 overflow-hidden "
      } gap-4 p-2 transition-all duration-300 w-full`}
    >
      <Button
        onClick={handleModel}
        className={`w-full inline-flex items-center h-16 ${
          isOpen ? "border-b pb-2" : ""
        }`}
      >
        <span className="inline-flex flex-col text-start">
          <h4>{exercise.name}</h4>
          <p>Sets: {sets.length}</p>
        </span>
        <IconArrow
          className={`w-8 aspect-square ml-auto ${
            isOpen ? "rotate-180" : ""
          }  transition-all duration-300`}
        />
      </Button>

      <div
        className={`${
          isOpen ? "grid opacity-100" : " opacity-0"
        } gap-2 justify-items-center w-full h-full overflow-hidden transition-all duration-300`}
      >
        <WorkoutExerciseVideo youtubeUrl={youtubeUrl} />

        <WorkoutExerciseList
          sets={sets}
          handleUserSetsChange={handleUserSetsChange}
          logUserSet={logUserSet}
          workoutExerciseErrors={workoutExerciseErrors}
          fillAllSets={fillAllSets}
        />
        <div className="flex w-full gap-8">
          <Button
            className="text-amber  hover:text-black w-full"
            buttonStyle="model"
            type="button"
            onClick={fillAllSets}
          >
            Fill All Sets
          </Button>
          <Button
            className="text-amber  hover:text-black w-full"
            buttonStyle="model"
            type="button"
            onClick={completeAllUserSets}
          >
            Complete All Sets
          </Button>
        </div>
      </div>
    </li>
  );
}
