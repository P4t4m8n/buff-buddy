import { DAY_OF_WEEK } from "../../../../../shared/models/app.model";
import GenericList from "../../UI/GenericList";
import { toTitle } from "../../../utils/toTitle";
import type {
  IProgramWorkoutEditDTO,
  TProgramWorkoutEditRecord,
} from "../../../../../shared/models/program.model";
import ProgramWorkoutEditPreview from "./ProgramWorkoutEditPreview";
interface IProgramEditWeekListProps {
  handleWorkouts?: (workout: IProgramWorkoutEditDTO) => void;
  programWorkouts: IProgramWorkoutEditDTO[];
}

export default function ProgramWorkoutEditWeekList({
  handleWorkouts,
  programWorkouts,
}: IProgramEditWeekListProps) {
  const cleanedWorkouts = programWorkouts?.filter(
    (ex) => ex.crudOperation !== "delete"
  );
  const groupWorkoutsByDay = (programWorkouts: IProgramWorkoutEditDTO[]) => {
    const peByDay: TProgramWorkoutEditRecord = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
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
  const groupedWorkouts = groupWorkoutsByDay(cleanedWorkouts || []);
  return (
    <ul
      className="grid grid-rows-[repeat(7,10rem)] lg:grid-rows-1 grid-cols-1 lg:grid-cols-7
                         justify-around gap-2 w-full h-[31rem] lg:h-[calc(100%)] lg:pb-4 overflow-y-auto"
    >
      {DAY_OF_WEEK.map((day) => (
        <li
          key={day}
          className="text-center text-sm  border rounded p-2 h-40 lg:h-full "
        >
          <h4 className="font-bold decoration-2 underline">{toTitle(day)}</h4>
          <GenericList
            items={groupedWorkouts[day]}
            ItemComponent={ProgramWorkoutEditPreview}
            itemComponentProps={{
              handleWorkouts,
            }}
            getKey={(item) => item.id! + "1"}
            ulStyle="p-1 flex lg:flex-col gap-2"
          />
        </li>
      ))}
    </ul>
  );
}
