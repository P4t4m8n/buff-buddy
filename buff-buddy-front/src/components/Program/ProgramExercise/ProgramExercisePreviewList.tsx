import { DAY_OF_WEEK } from "../../../models/app.model";
import type {
  IProgramExerciseEditDTO,
  TProgramExerciseEditRecord,
} from "../../../models/programExercise.model";
import { toTitle } from "../../../utils/toTitle";
import ProgramExerciseEditModel from "./ProgramExerciseEditModel";

interface ProgramExerciseDetailsListProps {
  handleProgramExercise: (programExercise: IProgramExerciseEditDTO) => void;
  groupedProgramExercises: TProgramExerciseEditRecord;
}

export default function ProgramExercisePreviewList({
  handleProgramExercise,
  groupedProgramExercises,
}: ProgramExerciseDetailsListProps) {
  return (
    <ul
      className="grid grid-rows-[repeat(7,10rem)] lg:grid-rows-1 grid-cols-1 lg:grid-cols-7
     justify-around gap-2 w-full h-[31rem] lg:h-[calc(100%)] lg:pb-4 overflow-y-auto "
    >
      {DAY_OF_WEEK.map((day) => (
        <li
          key={day}
          className="text-center text-sm  border rounded p-2 h-40 lg:h-full "
        >
          <h4 className="font-bold decoration-2 underline">{toTitle(day)}</h4>
          <ul className="p-1 flex lg:flex-col gap-2">
            {groupedProgramExercises[day]
              .sort((a, b) => a.order - b.order)
              .map((programExercise) => (
                <li
                  key={programExercise.id}
                  className="border text-center w-20 lg:w-full grid
                 justify-items-center gap-1 p-1 rounded"
                >
                  <h5 className="font-medium">
                    {programExercise.exercise?.name}
                  </h5>
                  <ProgramExerciseEditModel
                    programExercise={programExercise}
                    handleProgramExercise={handleProgramExercise}
                  />
                </li>
              ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
