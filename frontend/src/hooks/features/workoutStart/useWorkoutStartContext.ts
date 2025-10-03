import { useContext, useEffect, useRef } from "react";
import { WorkoutStartContext } from "../../context/WorkoutStartContext";
import { ClientError } from "../../../services/ClientError.service";
import type { TWorkoutStartContext } from "../../context/WorkoutStartContext";

export const useWorkoutStartContext = () => {
  const context = useContext(WorkoutStartContext);
  const contextRef = useRef<TWorkoutStartContext | null>(null);

  useEffect(() => {
    contextRef.current = context;
  }, [context]);

  if (!context) {
    throw ClientError.create(
      "useWorkoutStartContext must be used within a WorkoutStartProvider"
    );
  }

  const contextNoRender = () => contextRef.current;

  return { context, contextNoRender };
};
