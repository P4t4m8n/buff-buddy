import { useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router";

import { useProgramStore } from "../../store/program.store";
import { useItemsPage } from "../../hooks/shared/useItemsPage";

import { calendarUtil } from "../../utils/calendar.util";
import { toTitle } from "../../utils/toTitle";

import ProgramWorkoutPreview from "../../components/Program/ProgramWorkout/ProgramWorkoutPreview";

import LinkComponent from "../../components/UI/Link";
import Loader from "../../components/UI/loader/Loader";
import Button from "../../components/UI/Button";
import IconArrow from "../../components/UI/Icons/IconArrow";
import GenericList from "../../components/UI/GenericList";

import type { DaysOfWeek } from "../../../../backend/prisma/generated/prisma";
import type { IProgramWorkoutDTO } from "../../../../shared/models/program.model";

export default function WorkoutPage() {
  const { items: programs, isLoading } = useItemsPage({
    useStore: useProgramStore,
    initialFilter: {},
  });

  const [day, setDay] = useState<DaysOfWeek | null>(null);

  useEffect(() => {
    setDay(calendarUtil.getDay(new Date()));
  }, []);

  const onChangeDay = (dir: number) => {
    const newDay = calendarUtil.getNextDay(day!, dir);
    setDay(newDay);
  };

  const cleanPrograms: IProgramWorkoutDTO[] = useMemo(
    () =>
      programs
        .filter((p) => p.isActive)
        .map((p) =>
          p.programWorkouts?.map((pw) => ({ ...pw, programId: p.id }))
        )
        .flat()
        .filter((pw) => pw?.daysOfWeek.includes(day!))
        .filter((p) => !!p), //INFO: FOR TS to be quiet
    [day]
  );

  if (isLoading) {
    return <Loader loaderType="screen" />;
  }

  return (
    <div className="h-main grid  ">
      <div className="flex flex-col gap-4 relative w-full h-main grid-stack">
        <header className="w-full h-16 min-h-16 shadow-border-b px-mobile pt-2 flex flex-col ">
          <h2 className="text-center">Workouts Page</h2>
          <div className="inline-flex items-center justify-between gap-2 w-full">
            <Button
              className="w-6 aspect-square"
              onClick={() => onChangeDay(-1)}
            >
              <IconArrow className=" -rotate-90 stroke-main-orange fill-main-orange " />
            </Button>
            <p>{toTitle(day)}</p>
            <Button
              className="w-6 aspect-square"
              onClick={() => onChangeDay(1)}
            >
              <IconArrow className=" rotate-90 stroke-main-orange fill-main-orange " />
            </Button>
          </div>
        </header>
        <div className="inline-flex w-full h-10 min-h-10 px-mobile justify-between overflow-y-auto">
          <span className="bg-main-orange w-fit py-2 px-2 rounded text-black self-center ">
            <p>Start ad-hook workout-tba</p>
          </span>
          <LinkComponent
            className="bg-main-orange w-fit py-2 px-2 rounded text-black self-center "
            to="/workouts/workout-list"
          >
            Workouts List
          </LinkComponent>
        </div>
        {/*//INFO: Workouts Preview per day*/}
        <GenericList
          items={cleanPrograms}
          ItemComponent={ProgramWorkoutPreview}
          getKey={(item) => item?.id ?? "" + day}
          ulStyle="px-mobile columns-[3_12.5rem] overflow-y-auto  "
        />
      </div>
      <Outlet />
    </div>
  );
}
