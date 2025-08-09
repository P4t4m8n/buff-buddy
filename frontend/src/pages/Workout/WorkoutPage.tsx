import { useEffect, useState } from "react";
import { Outlet } from "react-router";

import { useProgramStore } from "../../store/program.store";
import { useItemsPage } from "../../hooks/shared/useItemsPage";

import { calendarUtil } from "../../utils/calendar.util";
import { toTitle } from "../../utils/toTitle";

import ProgramWorkoutPreview from "../../components/ProgramWorkout/ProgramWorkoutPreview";

import Loader from "../../components/UI/Loader";
import Button from "../../components/UI/Button";
import IconArrow from "../../components/UI/Icons/IconArrow";
import GenericList from "../../components/UI/GenericList";

import type { DaysOfWeek } from "../../../../backend/prisma/generated/prisma";
import type { IProgramWorkoutDTO } from "../../../../shared/models/program.model";

export default function WorkoutPage() {
  const { items: programs, isLoading } = useItemsPage({
    useStore: useProgramStore,
  });

  const [day, setDay] = useState<DaysOfWeek | null>(null);

  useEffect(() => {
    setDay(calendarUtil.getDay(new Date()));
  }, []);

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
    return <Loader loaderType="screen" />;
  }

  return (
    <div className="h-main flex flex-col gap-4 relative w-full    ">
      <header className="w-full h-16 shadow-border-b px-mobile pt-2 ">
        <h2 className="text-center">Workouts Page</h2>
        <div className="inline-flex items-center justify-between gap-2 w-full">
          <Button className="w-6 aspect-square" onClick={() => onChangeDay(-1)}>
            <IconArrow className=" -rotate-90 stroke-main-orange fill-main-orange " />
          </Button>
          <p>{toTitle(day)}</p>
          <Button className="w-6 aspect-square" onClick={() => onChangeDay(1)}>
            <IconArrow className=" rotate-90 stroke-main-orange fill-main-orange " />
          </Button>
        </div>
      </header>
      {/*//INFO: Workouts Preview per day*/}
      <GenericList
        items={cleanPrograms}
        ItemComponent={ProgramWorkoutPreview}
        getKey={(item) => item?.id ?? "" + day}
        ulStyle="px-mobile columns-[3_12.5rem] overflow-y-auto overflow-x-hidden "
      />
      <Outlet />
    </div>
  );
}
