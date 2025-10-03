import { useCallback, useEffect, useState } from "react";

import { useErrors } from "../../shared/useErrors";

import { localStorageService } from "../../../services/localStorage.service";
import { workoutStartService } from "../../../services/workoutStart.service";
import { userWorkoutService } from "../../../services/userWorkout.service";

import type {
  IUserWorkoutDTO,
  IUserWorkoutEditDTO,
} from "../../../../../shared/models/userWorkout";
import type { IDateRange } from "../../../models/calendar.model";
import type { ExerciseType } from "../../../../../backend/prisma/generated/prisma";
import type { IHandleUserSetSkipProps } from "../../../models/workoutStart.model";
import { useAuthStore } from "../../../store/auth.store";

interface IUseWorkoutStartProps {
  workoutId?: string;
  programId?: string;
  onBack: (e?: React.MouseEvent<Element, MouseEvent> | undefined) => void;
}

export const useWorkoutStart = ({
  workoutId,
  programId,
  onBack,
}: IUseWorkoutStartProps) => {
  const [workoutStart, setWorkoutStart] = useState<IUserWorkoutEditDTO | null>(
    null
  );
  const { errors, handleError, clearErrors } = useErrors<IUserWorkoutDTO>();

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const loadWorkoutStart = async () => {
    const { data: _workoutStart } = await workoutStartService.getWorkoutStart(
      workoutId
    );
    setWorkoutStart(_workoutStart);
    return;
  };

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);

        const localStorageWorkout =
          localStorageService.getSessionData<IUserWorkoutEditDTO>(
            "workoutStart"
          );

        if (!localStorageWorkout) {
          await loadWorkoutStart();
          return;
        }

        if (localStorageWorkout?.workout?.id !== workoutId) {
          console.warn(
            "Workout ID mismatch:",
            localStorageWorkout?.workout?.id
          );
          await loadWorkoutStart();
          return;
        }

        setWorkoutStart(localStorageWorkout);
      } catch (error) {
        handleError({ error, emitToToast: true });
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [workoutId, programId]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (!workoutStart) {
        handleError({ error: "No workout to save", emitToToast: true });
        return;
      }
      setIsSaving(true);

      clearErrors();

      const ownerId = useAuthStore.getState().user?.id;
      workoutStart.ownerId = ownerId;
      //INFO:Lazy solution for now
      const userWorkoutExercises = workoutStart?.userWorkoutExercises?.map(
        (uwe) => {
          const userStrengthSets = uwe?.userStrengthSets?.filter(
            (uss) => !uss.isWarmup
          );
          return {
            ...uwe,
            userStrengthSets,
          };
        }
      );
      const cleanWorkoutStart = { ...workoutStart, userWorkoutExercises };

      await userWorkoutService.save(cleanWorkoutStart);

      localStorageService.storeSessionData("workoutStart");

      onBack();
    } catch (error) {
      handleError({ error, emitToToast: true });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDateSelect = ({ start }: IDateRange) => {
    setWorkoutStart((prev) => {
      if (!prev) return null;
      const returnObj = {
        ...prev,
        dateCompleted: start,
      };
      localStorageService.storeSessionData("workoutStart", returnObj);
      return returnObj;
    });
  };

  const handleUserSetsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.stopPropagation();
      const target = e.target as HTMLInputElement;
      const { name, value, type, checked } = target;

      const [setType = "userStrengthSets", key, id] = name.split("-") as [
        "userStrengthSets" | "userCardioSets",
        string,
        string
      ];

      setWorkoutStart((prev) => {
        if (!prev) return null;
        const workoutExercises = prev?.userWorkoutExercises?.map((we) => {
          //INFO: In case userSets is undefined, we assume no sets exist
          const idx = we[setType]?.findIndex((us) => us.id === id) ?? -1;
          if (idx < 0) {
            return we;
          }
          //INFO: if Index exists userSets is guaranteed to be defined
          const tempUserSet = we[setType]![idx];

          //TS IS FUN
          switch (type) {
            case "checkbox":
              (tempUserSet as any)[key as keyof typeof tempUserSet] = checked;
              break;
            case "number":
              (tempUserSet as any)[key as keyof typeof tempUserSet] =
                parseFloat(value);
              break;
            default:
              (tempUserSet as any)[key as keyof typeof tempUserSet] = value;
              break;
          }

          //INFO: if we got here, userSets is guaranteed to be defined
          const userSets = we[setType]!.toSpliced(idx, 1, tempUserSet);
          return {
            ...we,
            [setType]: userSets,
          };
        });

        const returnObj = {
          ...prev,
          workoutExercises,
        };
        localStorageService.storeSessionData("workoutStart", returnObj);
        return returnObj;
      });
    },
    []
  );

  const handleUserSetSkip = ({
    userSetId,
    skippedReason,
  }: IHandleUserSetSkipProps) => {
    setWorkoutStart((prev) => {
      const userWorkoutExercise = prev?.userWorkoutExercises?.find(
        (we) =>
          we.userStrengthSets?.some((us) => us.id === userSetId) ||
          we.userCardioSets?.some((us) => us.id === userSetId)
      );

      if (!userWorkoutExercise) {
        handleError({
          error: "User workout exercise not found",
          emitToToast: true,
        });
        return prev;
      }

      const type = userWorkoutExercise.exercise?.type;
      const setType =
        type === "strength" ? "userStrengthSets" : "userCardioSets";

      const idx =
        userWorkoutExercise[setType]?.findIndex((us) => us.id === userSetId) ??
        -1;
      if (idx < 0) {
        handleError({
          error: "User  set not found",
          emitToToast: true,
        });
        return prev;
      }
      //INFO?? if we got here variables must be defined
      userWorkoutExercise[setType]![idx].skippedReason = skippedReason;
      const updatedUserWorkoutExercises = prev?.userWorkoutExercises?.map(
        (uwe) => uwe
      );
      return {
        ...prev,
        userWorkoutExercises: updatedUserWorkoutExercises ?? [],
      };
    });
  };

  const handleUserSet = (userSetId?: string, type?: ExerciseType) => {
    if (!userSetId) {
      console.error("Logging user set with id:", userSetId); //TODO?? for debugging remove later
      return;
    }
    if (!workoutStart) {
      console.error("No workout exercise to log."); //TODO?? for debugging remove later
      return;
    }

    const key = type === "strength" ? "userStrengthSets" : "userCardioSets";

    logUserSet(key, userSetId);
  };

  const logUserSet = (
    key: "userStrengthSets" | "userCardioSets",
    userSetId?: string
  ) => {
    clearErrors();
    setWorkoutStart((prev) => {
      if (!prev) return null;
      const { userWorkoutExercises } = prev;
      const _userWorkoutExercises = userWorkoutExercises?.find((we) =>
        we[key]?.some((us) => us.id === userSetId)
      );

      if (!_userWorkoutExercises) {
        console.warn("Workout exercise not found for user set id:", userSetId);
        return prev;
      }

      const idx =
        _userWorkoutExercises[key]?.findIndex((us) => us.id === userSetId) ??
        -1;

      if (idx < 0) {
        console.warn("User set not found for id:", userSetId);
        return prev;
      }

      const userSet = _userWorkoutExercises[key]?.[idx];

      const newUserSet = {
        ...userSet,
        isCompleted: true,
      };

      const userSets = _userWorkoutExercises[key]?.toSpliced(
        idx,
        1,
        newUserSet
      );
      const newWorkoutExercise = userWorkoutExercises?.map((we) => {
        if (we.id !== _userWorkoutExercises.id) return we;
        return {
          ...we,
          [key]: userSets,
        };
      });

      const returnObj = {
        ...prev,
        userWorkoutExercises: newWorkoutExercise,
      };
      localStorageService.storeSessionData("workoutStart", returnObj);
      return returnObj;
    });
  };

  const completeAllExerciseSets = (userWorkoutExerciseId: string) => {
    setWorkoutStart((prev) => {
      if (!prev) return null;
      const userWorkoutExercises = prev.userWorkoutExercises?.map((we) => {
        if (we.id !== userWorkoutExerciseId) return we;
        const userStrengthSets = we.userStrengthSets?.map((uss) => ({
          ...uss,
          reps: we.userStrengthSets?.[0]?.goalSet?.reps,
          weight: we.userStrengthSets?.[0]?.goalSet?.weight,
          isCompleted: true,
        }));
        const userCardioSets = we.userCardioSets?.map((ucs) => ({
          ...ucs,

          isCompleted: true,
          order: ucs.order ?? 1,
        }));

        const returnWorkoutExercise = { ...we };

        if (userStrengthSets)
          returnWorkoutExercise.userStrengthSets = userStrengthSets;
        if (userCardioSets)
          returnWorkoutExercise.userCardioSets = userCardioSets;

        return { ...returnWorkoutExercise };
      });

      const returnObj = {
        ...prev,
        userWorkoutExercises,
      };
      localStorageService.storeSessionData("workoutStart", returnObj);
      return returnObj;
    });
  };

  const skipAllExerciseSets = ({
    userWorkoutExerciseId,
    skippedReason,
  }: Omit<IHandleUserSetSkipProps, "userSetId">) => {
    setWorkoutStart((prev) => {
      if (!prev) return null;
      const userWorkoutExercises = prev.userWorkoutExercises?.map((we) => {
        if (we.id !== userWorkoutExerciseId) return we;
        const userStrengthSets = we.userStrengthSets?.map((uss) => ({
          ...uss,
          skippedReason,
        }));
        const userCardioSets = we.userCardioSets?.map((ucs) => ({
          ...ucs,
          skippedReason,
        }));

        const returnWorkoutExercise = { ...we };

        if (userStrengthSets)
          returnWorkoutExercise.userStrengthSets = userStrengthSets;
        if (userCardioSets)
          returnWorkoutExercise.userCardioSets = userCardioSets;

        return { ...returnWorkoutExercise };
      });

      const returnObj = {
        ...prev,
        userWorkoutExercises,
      };
      localStorageService.storeSessionData("workoutStart", returnObj);
      return returnObj;
    });
  };

  return {
    errors,
    workoutStart,
    isLoading,
    isSaving,
    onSubmit,
    handleDateSelect,
    handleUserSetsChange,
    handleUserSet,
    completeAllExerciseSets,
    skipAllExerciseSets,
    handleUserSetSkip,
  };
};
