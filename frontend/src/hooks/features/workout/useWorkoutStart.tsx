import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useWorkoutStore } from "../../../store/workout.store";
import { workoutStartUtil } from "../../../utils/workoutStart.util";
import type { IUserWorkoutEditDTO } from "../../../../../shared/models/userWorkout";

export const useWorkoutStart = () => {
  const { id } = useParams<{ id?: string }>();

  const navigate = useNavigate();

  const [workoutStart, setWorkoutStart] =
    React.useState<IUserWorkoutEditDTO | null>(null);

  const getById = useWorkoutStore((state) => state.getById);

  const isLoadingId = useWorkoutStore((state) => state.isLoadingId === id);

  useEffect(() => {
    getById(id).then((w) => {
      if (!w) {
        console.error("Workout not found");
        return;
      }
      const workout = workoutStartUtil.workoutDTOToWorkoutStartDTO(w);
      setWorkoutStart(workout);
    });
  }, [id, getById]);

  return { id, navigate, workoutStart, isLoadingId };
};
