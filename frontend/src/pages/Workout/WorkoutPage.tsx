import { Outlet } from "react-router";
import { useEffect, useState } from "react";

import { useProgramStore } from "../../store/program.store";

import { calendarUtil } from "../../utils/calendar.util";

import { toTitle } from "../../utils/toTitle";
import Loader from "../../components/UI/Loader";
import Button from "../../components/UI/Button";
import IconArrow from "../../components/UI/Icons/IconArrow";

import ProgramWorkoutList from "../../components/ProgramWorkout/ProgramWorkoutList";

import type { DaysOfWeek } from "../../../../backend/prisma/generated/prisma";
import type { IProgramWorkoutDTO } from "../../../../shared/models/program.model";

export default function WorkoutPage() {
  const programs = useProgramStore((state) => state.programs);

  const loadPrograms = useProgramStore((state) => state.loadPrograms);

  const isLoading = useProgramStore((state) => state.isLoading);

  const [day, setDay] = useState<DaysOfWeek | null>(null);

  useEffect(() => {
    loadPrograms();
    setDay(calendarUtil.getDay(new Date()));
  }, [loadPrograms]);

  const onChangeDay = (dir: number) => {
    const newDay = calendarUtil.getNextDay(day!, dir);
    setDay(newDay);
  };

  //TODO??To memo or not to memo, this is the question
  // const cleanPrograms = useMemo(() => {
  //   return programs
  //     .filter((p) => p.isActive)
  //     .map((p) => p.programWorkouts)
  //     .flat()
  //     .filter((pw) => pw?.daysOfWeek.includes(day!))
  //     .filter((p) => !!p); //FOR TS to be quiet
  // }, [programs, day]);
  const cleanPrograms: IProgramWorkoutDTO[] = programs
    .filter((p) => p.isActive)
    .map((p) => p.programWorkouts?.map((pw) => ({ ...pw, programId: p.id })))
    .flat()
    .filter((pw) => pw?.daysOfWeek.includes(day!))
    .filter((p) => !!p); //FOR TS to be quiet

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="h-main flex flex-col gap-4 relative overflow-auto ">
      <header className="w-full h-16 border-b px-mobile pt-2 ">
        <h2 className="text-center">Workouts Page</h2>
        <div className="inline-flex items-center justify-between gap-2 w-full">
          <Button className="w-6 aspect-square" onClick={() => onChangeDay(-1)}>
            <IconArrow className=" -rotate-90" />
          </Button>
          <p>{toTitle(day)}</p>
          <Button className="w-6 aspect-square" onClick={() => onChangeDay(1)}>
            <IconArrow className=" rotate-90" />
          </Button>
        </div>
      </header>
      <ProgramWorkoutList programWorkouts={cleanPrograms} day={day} />
      <Outlet />
    </div>
  );
}
