import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import { workoutStartUtil } from "../../utils/workoutStart.util";
import { useWorkoutStore } from "../../store/workout.store";
import { useFormErrors } from "../../hooks/shared/useFormErrors";
import { workoutStartService } from "../../services/workoutStart";

import Button from "../../components/UI/Button";
import GenericSaveButton from "../../components/UI/GenericSaveButton";
import Loader from "../../components/UI/Loader";
import DateInput from "../../components/UI/Form/DateInput/DateInput";
import GenericList from "../../components/UI/GenericList";
import WorkoutStartExerciseItem from "../../components/WorkoutStart/WorkoutStartExerciseItem";

import type {
  IUserWorkoutDTO,
  IUserWorkoutEditDTO,
} from "../../../../shared/models/userWorkout";
import type { IDateRange } from "../../models/calendar.model";
import type { IUserStrengthSetDTO } from "../../../../shared/models/strengthSet.model";
import type { IUserCardioSetDTO } from "../../../../shared/models/cardioSet.model";

//TODO?? state function move to hook or context? deep props drilling
//TODO?? move child component into memo to prevent render?
export default function WorkoutStartPage() {
  const { programId, workoutId } = useParams<{
    programId?: string;
    workoutId?: string;
  }>();

  const navigate = useNavigate();

  const [workoutStart, setWorkoutStart] =
    React.useState<IUserWorkoutEditDTO | null>(null);
  console.log("🚀 ~ WorkoutStartPage ~ workoutStart:", workoutStart)
  const { errors } = useFormErrors<IUserWorkoutDTO>();

  const getById = useWorkoutStore((state) => state.getById);

  const isLoadingId = useWorkoutStore(
    (state) => state.isLoadingId === workoutId
  );

  //TODO ?? Ugly improve later
  useEffect(() => {
    const init = async () => {
      try {
        const workout = await getById(workoutId);
        let lastUserWorkout;
        try {
          lastUserWorkout = (
            await workoutStartService.getLastWorkout(workoutId)
          ).data;
        } catch (error) {
          lastUserWorkout = null;
        }

        const userWorkout = workoutStartUtil.workoutDTOToWorkoutStartDTO(
          workout,
          programId,
          lastUserWorkout
        );
        setWorkoutStart(userWorkout);
      } catch (error) {
        console.error("Error initializing workout start:", error);
      }
    };

    init();
  }, [workoutId, programId, getById]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      await workoutStartService.save(workoutStart!);
      navigate(-1);
    } catch (error) {
      console.error("Error submitting workout start:", error);
    }
  };

  const handleDateSelect = ({ start }: IDateRange) => {
    setWorkoutStart((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        dateCompleted: start,
      };
    });
  };

  const handleUserStrengthSetsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.stopPropagation();
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    const [key, id] = name.split("-") as [keyof IUserStrengthSetDTO, string];

    setWorkoutStart((prev) => {
      if (!prev) return null;
      const workoutExercises = prev.userWorkoutExercises.map((we) => {
        const idx = we.userStrengthSets?.findIndex((us) => us.id === id) ?? -1; //INFO: In case userStrengthSets is undefined, we assume no sets exist
        if (idx < 0) {
          return we;
        }
        const tempUserSet = we.userStrengthSets![idx]; //INFO: if Index exists userStrengthSets is guaranteed to be defined

        tempUserSet[key] =
          type === "checkbox" ? checked : (parseFloat(value) as any); //TODO?? I have no idea how to solve this type error;

        const userStrengthSets = we.userStrengthSets!.toSpliced(
          idx,
          1,
          tempUserSet
        ); //INFO: if we got here, userStrengthSets is guaranteed to be defined
        return {
          ...we,
          userStrengthSets,
        };
      });
      return {
        ...prev,
        workoutExercises,
      };
    });
  };

  const handleUserCardioSetsChange = (
    e: React.ChangeEvent<HTMLInputElement>
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

        tempUserSet[key] =
          type === "checkbox" ? checked : (parseFloat(value) as any); //TODO?? I have no idea how to solve this type error;

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
      return {
        ...prev,
        workoutExercises,
      };
    });
  };

  const logUserSet = (userSetId?: string) => {
    if (!userSetId) {
      console.error("Logging user set with id:", userSetId); //TODO?? for debugging remove later
      return;
    }
    if (!workoutStart) {
      console.error("No workout exercise to log."); //TODO?? for debugging remove later
      return;
    }
    setWorkoutStart((prev) => {
      if (!prev) return null;
      const { userWorkoutExercises } = prev;
      const _userWorkoutExercises = userWorkoutExercises.find((we) =>
        we.userStrengthSets?.some((us) => us.id === userSetId)
      );

      if (!_userWorkoutExercises) {
        console.warn("Workout exercise not found for user set id:", userSetId);
        return prev;
      }

      const idx =
        _userWorkoutExercises.userStrengthSets?.findIndex(
          (us) => us.id === userSetId
        ) ?? -1;

      if (idx < 0) {
        console.warn("User set not found for id:", userSetId);
        return prev;
      }

      const newUserSet = {
        ..._userWorkoutExercises?.userStrengthSets?.[idx],
        isCompleted: true,
      };

      const userSets = _userWorkoutExercises.userStrengthSets?.toSpliced(
        idx,
        1,
        newUserSet
      );
      const newWorkoutExercise = userWorkoutExercises?.map((we) => {
        if (we.id !== _userWorkoutExercises.id) return we;
        return {
          ...we,
          userSets,
        };
      });
      return {
        ...prev,
        workoutExercises: newWorkoutExercise,
      };
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
      return {
        ...prev,
        userWorkoutExercises,
      };
    });
  };

  if (isLoadingId) {
    return <Loader />;
  }

  const { userWorkoutExercises, workout } = workoutStart ?? {};
  const { name } = workout ?? {};

  const sortedWorkoutExercises =
    userWorkoutExercises?.sort((a, b) => a.order! - b.order!) ?? [];

  const listItemProps = {
    handleUserStrengthSetsChange,
    handleUserCardioSetsChange,
    logUserSet,
    completeAllExerciseSets,
  };

  return (
    <form
      onSubmit={onSubmit}
      className="fixed inset-0 h-main overflow-hidden grid grid-cols-1 grid-rows-[5.5rem_calc(100%-10rem)_2.5rem]
       gap-4 bg-main-orange py-mobile"
    >
      <div className="px-mobile">
        <h2 className="text-center text-xl underline underline-offset-2 pb-4">
          {name}
        </h2>
        <DateInput
          handleDateSelect={handleDateSelect}
          selectedRange={{ start: workoutStart?.dateCompleted as Date }}
          className=" "
          initialMode="single"
          errorRange={{
            startDate: errors?.dateCompleted,
          }}
        />
      </div>
      {/*//INFO Exercises List with the Sets*/}
      <GenericList
        items={sortedWorkoutExercises}
        ItemComponent={WorkoutStartExerciseItem}
        itemComponentProps={listItemProps}
        getKey={(we) => we.id!}
        ulStyle=" flex flex-col overflow-y-auto gap-2 px-mobile"
      />

      <div className="flex justify-between h-10 px-mobile ">
        <Button
          buttonStyle="warning"
          type="button"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <GenericSaveButton
          itemId={workoutId}
          useStore={useWorkoutStore}
          type="submit"
        />
      </div>
    </form>
  );
}
