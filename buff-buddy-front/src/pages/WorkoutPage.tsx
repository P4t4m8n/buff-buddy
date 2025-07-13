import { Fragment, useEffect, useState } from "react";
import { useProgramStore } from "../store/program.store";
import { programUtils } from "../utils/program.util";
import { calendarUtil } from "../utils/calendar.util";
import { workoutUtils } from "../utils/workout.util";
import { toTitle } from "../utils/toTitle";
import Button from "../components/UI/Button";
import IconArrow from "../components/UI/Icons/IconArrow";
import WorkoutPreview from "../components/Workout/WorkoutPreview";
import type { TDayOfWeek } from "../models/app.model";
import { Outlet } from "react-router";

export default function WorkoutPage() {
  const programs = useProgramStore((state) => state.programs);
  const loadPrograms = useProgramStore((state) => state.loadPrograms);
  const [day, setDay] = useState<TDayOfWeek | null>(null);

  useEffect(() => {
    loadPrograms();
    setDay(calendarUtil.getDay(new Date()));
  }, [loadPrograms]);

  if (!day || !programs) {
    return <section className="h-main">Loading...</section>;
  }
  //TODO?? Lazy solution improve later
  const workoutsForToday = programUtils
    .filterActivePrograms(programs)
    .map((program) => workoutUtils.getProgramWorkoutByDay(program, day))
    .filter((workout) => (workout?.workoutExercises?.length ?? 0) > 0);

  const onChangeDay = (dir: number) => {
    const newDay = calendarUtil.getNextDay(day, dir);
    setDay(newDay);
  };

  return (
    <section className="h-main flex flex-col  justify-items-center gap-4 p-4">
      <header className="w-full h-16 border-b">
        <h2 className="text-center">Workouts Page</h2>
        <div className="inline-flex items-center justify-between gap-2 w-full">
          <Button className="w-8 aspect-square" onClick={() => onChangeDay(-1)}>
            <IconArrow className=" -rotate-90" />
          </Button>
          <p>{toTitle(day)}</p>
          <Button className="w-8 aspect-square" onClick={() => onChangeDay(1)}>
            <IconArrow className=" rotate-90" />
          </Button>
        </div>
      </header>
      <ul className="w-full h-[calc(100%-5rem)] grid grid-cols-1 grid-rows-[repeat(auto-fit,11rem)] overflow-y-auto">
        {workoutsForToday.map((workout) => (
          <Fragment key={workout.id}>
            <WorkoutPreview workout={workout} />
          </Fragment>
        ))}
      </ul>
      <Outlet />
    </section>
  );
}
