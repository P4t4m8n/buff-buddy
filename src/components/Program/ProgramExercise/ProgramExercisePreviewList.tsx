import { DAY_OF_WEEK } from "../../../models/app.model";
import type {
  IProgramExerciseEditDTO,
  TProgramExerciseEditRecord,
} from "../../../models/programExercise.model";
import { toTitle } from "../../../utils/toTitle";
import WrapperModel from "../../UI/Wrappers/WrapperModel";
import ProgramExerciseEdit from "./ProgramExerciseEdit";

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
      className="grid grid-rows-[repeat(7,10rem)] grid-cols-1
     justify-around gap-2 w-full h-[31rem] overflow-y-scroll "
    >
      {DAY_OF_WEEK.map((day) => (
        <li
          key={day}
          className="text-center text-sm font-medium border rounded p-2 h-40 "
        >
          <h4 className="font-bold decoration-2 underline">{toTitle(day)}</h4>
          <ul className="p-1">
            {groupedProgramExercises[day].map((programExercise) => (
              <li
                key={programExercise.id}
                className="border text-center w-20 grid
                 justify-items-center gap-1 p-1 rounded"
              >
                <h5>{programExercise.exercise?.name}</h5>
                <WrapperModel
                  mode="edit"
                  item={programExercise}
                  buttonClass="w-full"
                >
                  <ProgramExerciseEdit
                    programExercise={programExercise}
                    handleProgramExercise={handleProgramExercise}
                  />
                </WrapperModel>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
