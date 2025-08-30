import { DAY_OF_WEEK } from "../../../../../../shared/consts/app.consts";
import GenericList from "../../../UI/GenericList";
import { toTitle } from "../../../../utils/toTitle";
import type {
  IProgramWorkoutEditDTO,
  TProgramWorkoutEditRecord,
} from "../../../../../../shared/models/program.model";
import ProgramWorkoutEditPreview from "./ProgramWorkoutEditPreview";
import { memo, useCallback, useMemo } from "react";

interface IProgramWorkoutEditWeekListProps {
  programWorkouts?: IProgramWorkoutEditDTO[];
  handleProgramWorkouts: (workout: IProgramWorkoutEditDTO) => void;
  deleteProgramWorkout: (id?: string) => void;
}

function ProgramWorkoutEditWeekList({
  programWorkouts,
  handleProgramWorkouts,
  deleteProgramWorkout,
}: IProgramWorkoutEditWeekListProps) {

  const cleanedWorkouts =
    programWorkouts?.filter((ex) => ex.crudOperation !== "delete") || [];

  const groupWorkoutsByDay = (programWorkouts: IProgramWorkoutEditDTO[]) => {
    const peByDay: TProgramWorkoutEditRecord = {
      sunday: [],
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
    };
    programWorkouts.forEach((pw) => {
      pw.daysOfWeek?.forEach((day) => {
        if (!peByDay[day]) {
          peByDay[day] = [];
        }
        peByDay[day].push(pw);
      });
    });
    return peByDay;
  };

  const groupedWorkouts = useMemo(
    () => groupWorkoutsByDay(cleanedWorkouts),
    [cleanedWorkouts]
  );

  const itemComponentProps = useMemo(
    () => ({ handleProgramWorkouts, deleteProgramWorkout }),
    []
  );

  const getKey = useCallback(
    (item: IProgramWorkoutEditDTO) => item.id! + 1,
    []
  );
  return (
    <ul
      className="grid grid-rows-[repeat(7,10rem)] px-4 lg:grid-rows-1 grid-cols-1 lg:grid-cols-7
                         justify-around gap-2 h-full lg:pb-4 overflow-y-scroll"
    >
      {DAY_OF_WEEK.map((day) => (
        <li
          key={day}
          className="text-center text-sm flex flex-col  border rounded p-2 h-40 lg:h-full "
        >
          <h4 className="font-bold decoration-2 underline h-6">
            {toTitle(day)}
          </h4>
          <GenericList
            items={groupedWorkouts[day]}
            ItemComponent={ProgramWorkoutEditPreview}
            itemComponentProps={itemComponentProps}
            getKey={getKey}
            ulStyle=" flex lg:flex-col gap-2 h-[calc(100%-1.5rem)] "
          />
        </li>
      ))}
    </ul>
  );
}

export default memo(ProgramWorkoutEditWeekList);
