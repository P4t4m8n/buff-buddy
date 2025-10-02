import { useCallback, useMemo } from "react";

import { useItemsPage } from "../../../../hooks/shared/useItemsPage";
import { useWorkoutStore } from "../../../../store/workout.store";

import WorkoutPreview from "../../../Workout/WorkoutPreview";
import WorkoutFilter from "../../../Workout/WorkoutFilter";

import { INITIAL_FILTERS } from "../../../../consts/filters.consts";

import Loader from "../../../UI/loader/Loader";
import GenericList from "../../../UI/GenericList";

import type {
  IWorkoutDTO,
  IWorkoutFilter,
} from "../../../../../../shared/models/workout.model";
import type { IProgramWorkoutEditDTO } from "../../../../../../shared/models/program.model";
import { useGenericPage } from "../../../../hooks/shared/useGenericPage";
import { QUERY_KEYS } from "../../../../consts/queryKeys.consts";
import { useWorkoutsQuery } from "../../../../hooks/features/workout/useWorkoutsQuery";
import { workoutService } from "../../../../services/workout.service";
import WorkoutList from "../../../Workout/WorkoutList";

interface IProgramWorkoutListProps {
  selectedWorkout: IProgramWorkoutEditDTO | null;
  onSelectProgramWorkout: (
    e: React.MouseEvent<HTMLButtonElement>,
    workout?: IWorkoutDTO,
    isCopy?: boolean
  ) => void;
}

export default function ProgramWorkoutList({
  selectedWorkout,
  onSelectProgramWorkout,
}: IProgramWorkoutListProps) {
  return (
    <div>
      <WorkoutList
        actionType="programEdit"
        onSelectProgramWorkout={onSelectProgramWorkout}
        selectedWorkoutId={selectedWorkout?.id}
      />
    </div>
  );
}
