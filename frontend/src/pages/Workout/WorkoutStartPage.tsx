import { useNavigate, useParams } from "react-router";
import Button from "../../components/UI/Button";
import GenericSaveButton from "../../components/UI/GenericSaveButton";
import React, { useEffect } from "react";
import { useWorkoutStore } from "../../store/workout.store";
import { workoutStartUtil } from "../../utils/workoutStart.util";
import Loader from "../../components/UI/Loader";
import DateInput from "../../components/UI/Form/DateInput/DateInput";
import type { IDateRange } from "../../models/calendar.model";
import { useFormErrors } from "../../hooks/shared/useFormErrors";
import WorkoutStartExerciseList from "../../components/WorkoutStart/WorkoutStartExerciseList";
import { workoutStartService } from "../../services/workoutStart";
import type {
  IUserWorkoutDTO,
  IUserWorkoutEditDTO,
} from "../../../../shared/models/userWorkout";

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

  const handleUserSetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    const [key, id] = name.split("-") as [any, string];

    // setWorkoutStart((prev) => {
    //   if (!prev) return null;

    //   const workoutExercises = prev.userWorkoutExercises.map((we) => {
    //     const idx = we.userSets.findIndex((us) => us.id === id);
    //     if (idx < 0) {
    //       return we;
    //     }
    //     const tempUserSet = we.userSets[idx];

    //     tempUserSet[key] =
    //       type === "checkbox" ? checked : (parseFloat(value) as any); //TODO?? I have no idea how to solve this type error;

    //     const userSets = we.userSets.toSpliced(idx, 1, tempUserSet);
    //     return {
    //       ...we,
    //       userSets,
    //     };
    //   });
    //   return {
    //     ...prev,
    //     workoutExercises,
    //   };
    // });
  };

  const logUserSet = (id?: string) => {
    if (!id) {
      console.error("Logging user set with id:", id);
      return;
    }
    if (!workoutStart) {
      console.error("No workout exercise to log.");
      return;
    }
    // setWorkoutStart((prev) => {
    //   if (!prev) return null;
    //   const { userWorkoutExercises } = prev;
    //   const userWorkoutExercises = userWorkoutExercises.find((we) =>
    //     we.userSets.some((us) => us.id === id)
    //   );

    //   if (!_workoutExercise) {
    //     console.warn("Workout exercise not found for user set id:", id);
    //     return prev;
    //   }

    //   const idx = _workoutExercise.userSets.findIndex((us) => us.id === id);

    //   if (idx < 0) {
    //     console.warn("User set not found for id:", id);
    //     return prev;
    //   }

    //   const newUserSet = {
    //     ..._workoutExercise.userSets[idx],
    //     isCompleted: true,
    //   };

    //   const userSets = _workoutExercise.userSets.toSpliced(idx, 1, newUserSet);
    //   const newWorkoutExercise = workoutExercises.map((we) => {
    //     if (we.id !== _workoutExercise.id) return we;
    //     return {
    //       ...we,
    //       userSets,
    //     };
    //   });
    //   return {
    //     ...prev,
    //     workoutExercises: newWorkoutExercise,
    //   };
    // });
  };

  const completeAllExerciseSets = (id: string) => {
    // setWorkoutStart((prev) => {
    //   if (!prev) return null;
    //   const workoutExercises = prev.workoutExercises.map((we) => {
    //     if (we.id !== id) return we;
    //     const userSets = we.userSets.map((us) => ({
    //       ...us,
    //       reps: we.coreSet?.reps,
    //       weight: we.coreSet?.weight,
    //       isCompleted: true,
    //     }));
    //     return {
    //       ...we,
    //       userSets,
    //     };
    //   });
    //   return {
    //     ...prev,
    //     workoutExercises,
    //   };
    // });
  };

  if (isLoadingId) {
    return <Loader />;
  }

  const { userWorkoutExercises, workout, lastUserWorkout } = workoutStart ?? {};
  const { name } = workout ?? {};

  const sortedWorkoutExercises =
    userWorkoutExercises?.sort((a, b) => a.order! - b.order!) ?? [];

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
      <WorkoutStartExerciseList
        lastUserWorkout={lastUserWorkout}
        workoutExercises={sortedWorkoutExercises}
        handleUserSetsChange={handleUserSetsChange}
        logUserSet={logUserSet}
        completeAllExerciseSets={completeAllExerciseSets}
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
