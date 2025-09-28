//-Core
import { useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router";
//-Hooks
import { useProgramsQuery } from "../../hooks/features/program/useProgramsQuery";
import { useGenericPage } from "../../hooks/shared/useGenericPage";
//-Utils
import { calendarUtil } from "../../utils/calendar.util";
import { toTitle } from "../../utils/toTitle";
//-Components
import ProgramWorkoutPreview from "../../components/Program/ProgramWorkout/ProgramWorkoutPreview";
//-UI
import LinkComponent from "../../components/UI/Link";
import Loader from "../../components/UI/loader/Loader";
import Button from "../../components/UI/Button";
import IconArrow from "../../components/UI/Icons/IconArrow";
import GenericList from "../../components/UI/GenericList";
//-Consts
import { QUERY_KEYS } from "../../consts/queryKeys.consts";
//-Types
import type { DaysOfWeek } from "../../../../backend/prisma/generated/prisma";
import type {
  IProgramDTO,
  IProgramFilter,
  IProgramWorkoutDTO,
} from "../../../../shared/models/program.model";

const INITIAL_FILTER: IProgramFilter = {
  skip: 0,
  take: 1000000,
  name: "",
};

export default function WorkoutPage() {
  const { items: programs, isLoading } = useGenericPage<
    IProgramDTO,
    IProgramFilter
  >({
    initialFilter: INITIAL_FILTER,
    queryKey: QUERY_KEYS.PROGRAMS_QUERY_KEY,
    mutationKeyName: "programsMutationKey",
    itemIdKey: QUERY_KEYS.PROGRAM_ID_QUERY_KEY,
    useQuery: useProgramsQuery,
  });

  const [day, setDay] = useState<DaysOfWeek | null>(null);

  useEffect(() => {
    setDay(calendarUtil.getDay(new Date()));
  }, []);

  const onChangeDay = (dir: number) => {
    const newDay = calendarUtil.getNextDay(day!, dir);
    setDay(newDay);
  };

  const programDayMap = useMemo(() => {
    const map: Map<DaysOfWeek, IProgramWorkoutDTO[]> = new Map();

    programs?.forEach((program) => {
      program.programWorkouts?.forEach((workout) => {
        workout?.daysOfWeek?.forEach((day) => {
          if (!map.has(day)) {
            map.set(day, []);
          }
          map.get(day)?.push({ ...workout, programId: program.id });
        });
      });
    });

    return map;
  }, [programs]);

  if (isLoading) {
    return <Loader loaderType="screen" />;
  }

  const todayWorkouts = programDayMap.get(day ?? "sunday") || [];

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
          items={todayWorkouts}
          ItemComponent={ProgramWorkoutPreview}
          getKey={(item) => item?.id ?? "" + day}
          ulStyle="px-mobile columns-[3_12.5rem] overflow-y-auto  "
        />
      </div>
      <Outlet />
    </div>
  );
}
