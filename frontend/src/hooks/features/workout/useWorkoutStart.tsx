import React, { useEffect } from "react";

import { useWorkoutStore } from "../../../store/workout.store";
import { useErrors } from "../../shared/useErrors";
import { useAuthStore } from "../../../store/auth.store";

import { workoutStartUtil } from "../../../utils/workoutStart.util";

import { workoutStartService } from "../../../services/userWorkout.service";
import { localStorageService } from "../../../services/localStorage.service";

import type {
  IUserWorkoutDTO,
  IUserWorkoutEditDTO,
} from "../../../../../shared/models/userWorkout";
import type { IDateRange } from "../../../models/calendar.model";
import type { IUserStrengthSetDTO } from "../../../../../shared/models/strengthSet.model";
import type { IUserCardioSetDTO } from "../../../../../shared/models/cardioSet.model";
import type { ExerciseType } from "../../../../../backend/prisma/generated/prisma";
import type { IHandleUserSetSkipProps } from "../../../models/workoutStart.model";

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

  const getById = useWorkoutStore((state) => state.getById);

  const isLoadingId = useWorkoutStore(
    (state) => state.isLoadingId === workoutId
  );

  const userId = useAuthStore((state) => state.user?.id);

  const loadWorkoutStart = async () => {
    const workout = await getById(workoutId);
    let lastUserWorkout;
    try {
      lastUserWorkout = (await workoutStartService.getLastWorkout(workoutId))
        .data;
    } catch (error) {
      lastUserWorkout = null;
    }

    const userWorkout = workoutStartUtil.workoutDTOToWorkoutStartDTO(
      workout,
      programId,
      lastUserWorkout,
      userId
    );
    setWorkoutStart(userWorkout);
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

        if (localStorageWorkout.workoutId !== workoutId) {
          console.warn("Workout ID mismatch:", localStorageWorkout.workoutId);
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
      await workoutStartService.save(workoutStart);
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

    const [key, id] = name.split("-") as [keyof IUserStrengthSetDTO, string];

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

        switch (type) {
          case "checkbox":
            tempUserSet[key] = checked as any; //TODO?? I have no idea how to solve this type error;;
            break;
          case "number":
            tempUserSet[key] = parseFloat(value) as any; //TODO?? I have no idea how to solve this type error;
            break;
          default:
            tempUserSet[key] = value as any; //TODO?? I have no idea how to solve this type error;
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
    const [key, id] = name.split("-") as [keyof IUserCardioSetDTO, string];

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
            tempUserSet[key] = checked as any; //TODO?? I have no idea how to solve this type error;;
            break;
          case "number":
            tempUserSet[key] = parseFloat(value) as any; //TODO?? I have no idea how to solve this type error;
            break;
          default:
            tempUserSet[key] = value as any; //TODO?? I have no idea how to solve this type error;
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
          reps: we.coreStrengthSet?.reps,
          weight: we.coreStrengthSet?.weight,
          isCompleted: true,
        }));
        const userCardioSets = we.userCardioSets?.map((ucs) => ({
          ...ucs,
          workTime: we.coreCardioSet?.workTime,
          avgHeartRate: we.coreCardioSet?.avgHeartRate,
          avgSpeed: we.coreCardioSet?.avgSpeed,
          caloriesBurned: we.coreCardioSet?.calorieTarget,
          distance: we.coreCardioSet?.distance,
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
