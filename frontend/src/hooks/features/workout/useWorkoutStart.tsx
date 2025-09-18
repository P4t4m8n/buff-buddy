import React, { useEffect } from "react";

import { useWorkoutStore } from "../../../store/workout.store";
import { useErrors } from "../../shared/useErrors";

import { localStorageService } from "../../../services/localStorage.service";

import type {
  IUserWorkoutDTO,
  IUserWorkoutEditDTO,
} from "../../../../../shared/models/userWorkout";
import type { IDateRange } from "../../../models/calendar.model";
import type { ExerciseType } from "../../../../../backend/prisma/generated/prisma";
import type { IHandleUserSetSkipProps } from "../../../models/workoutStart.model";
import { workoutStartService } from "../../../services/workoutStart.service";
import { userWorkoutService } from "../../../services/userWorkout.service";

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
  const [workoutStart, setWorkoutStart] =
    React.useState<IUserWorkoutEditDTO | null>(null);
  const { errors, handleError, clearErrors } = useErrors<IUserWorkoutDTO>();

  const isLoadingId = useWorkoutStore(
    (state) => state.isLoadingId === workoutId
  );

  const loadWorkoutStart = async () => {
    const _workoutStart = await workoutStartService.getWorkoutStart(workoutId);
    setWorkoutStart(_workoutStart);
    return;
  };
  useEffect(() => {
    const init = async () => {
      try {
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
      }
    };

    init();
  }, [workoutId, programId]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      clearErrors();
      e.preventDefault();
      e.stopPropagation();
      await userWorkoutService.save(workoutStart);
      localStorageService.storeSessionData("workoutStart");
      onBack();
    } catch (error) {
      handleError({ error });
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

  const handleUserStrengthSetsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.stopPropagation();
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    const [key, id] = name.split("-") as [string, string];

    setWorkoutStart((prev) => {
      if (!prev) return null;
      const workoutExercises = prev.userWorkoutExercises.map((we) => {
        //INFO: In case userStrengthSets is undefined, we assume no sets exist
        const idx = we.userStrengthSets?.findIndex((us) => us.id === id) ?? -1;
        if (idx < 0) {
          return we;
        }
        //INFO: if Index exists userStrengthSets is guaranteed to be defined
        const tempUserSet = we.userStrengthSets![idx];

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

        //INFO: if we got here, userStrengthSets is guaranteed to be defined
        const userStrengthSets = we.userStrengthSets!.toSpliced(
          idx,
          1,
          tempUserSet
        );
        return {
          ...we,
          userStrengthSets,
        };
      });

      const returnObj = {
        ...prev,
        workoutExercises,
      };
      localStorageService.storeSessionData("workoutStart", returnObj);
      return returnObj;
    });
  };

  const handleUserCardioSetsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.stopPropagation();
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    const [key, id] = name.split("-") as [string, string];

    setWorkoutStart((prev) => {
      if (!prev) return null;
      const workoutExercises = prev.userWorkoutExercises.map((we) => {
        const idx = we.userCardioSets?.findIndex((us) => us.id === id) ?? -1; //INFO: In case userCardioSets is undefined, we assume no sets exist
        if (idx < 0) {
          return we;
        }
        const tempUserSet = we.userCardioSets![idx]; //INFO: if Index exists userCardioSets is guaranteed to be defined
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

        const userCardioSets = we.userCardioSets!.toSpliced(
          idx,
          1,
          tempUserSet
        ); //INFO: if we got here, userCardioSets is guaranteed to be defined
        return {
          ...we,
          userCardioSets,
        };
      });

      const returnObj = {
        ...prev,
        workoutExercises,
      };
      localStorageService.storeSessionData("workoutStart", returnObj);
      return returnObj;
    });
  };

  const handleUserSetSkip = ({
    userWorkoutExerciseId,
    userSetId,
    skippedReason,
  }: IHandleUserSetSkipProps) => {
    setWorkoutStart((prev) => {
      const userWorkoutExercise = prev?.userWorkoutExercises.find(
        (we) => we.id === userWorkoutExerciseId
      );

      if (!userWorkoutExercise) {
        handleError({
          error: "User workout exercise not found",
          emitToToast: true,
        });
        return prev;
      }

      const type = userWorkoutExercise.exercise?.type;
      let idx;
      let updatedUserWorkoutExercises;
      switch (type) {
        case "strength":
          idx =
            userWorkoutExercise.userStrengthSets?.findIndex(
              (us) => us.id === userSetId
            ) ?? -1;
          if (idx < 0) {
            handleError({
              error: "User strength set not found",
              emitToToast: true,
            });
            return prev;
          }
          //INFO?? if we got here variables must be defined
          userWorkoutExercise!.userStrengthSets![idx].skippedReason =
            skippedReason;
          updatedUserWorkoutExercises = prev?.userWorkoutExercises.map(
            (uwe) => uwe
          );
          return {
            ...prev,
            userWorkoutExercises: updatedUserWorkoutExercises ?? [],
          };
        case "cardio":
          idx =
            userWorkoutExercise.userCardioSets?.findIndex(
              (us) => us.id === userSetId
            ) ?? -1;
          if (idx < 0) {
            handleError({
              error: "User cardio set not found",
              emitToToast: true,
            });
            return prev;
          }
          //INFO?? if we got here variables must be defined
          userWorkoutExercise!.userCardioSets![idx].skippedReason =
            skippedReason;
          updatedUserWorkoutExercises = prev?.userWorkoutExercises.map(
            (uwe) => uwe
          );
          return {
            ...prev,
            userWorkoutExercises: updatedUserWorkoutExercises ?? [],
          };
        default:
          return prev;
      }
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
      const _userWorkoutExercises = userWorkoutExercises.find((we) =>
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
          reps: we.userStrengthSets?.[0]?.goalSet?.reps ?? 10,
          weight: we.userStrengthSets?.[0]?.goalSet?.weight ?? 10,
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
    isLoadingId,
    onSubmit,
    handleDateSelect,
    handleUserStrengthSetsChange,
    handleUserCardioSetsChange,
    handleUserSet,
    completeAllExerciseSets,
    skipAllExerciseSets,
    handleUserSetSkip,
  };
};
