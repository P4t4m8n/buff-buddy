import { DAY_OF_WEEK } from "../../../models/app.model";
import type {
  IProgramExerciseEditDTO,
  TProgramExerciseEditRecord,
} from "../../../models/programExercise.model";
import WrapperModel from "../../UI/Wrappers/WrapperModel";
import ProgramExerciseEdit from "./ProgramExerciseEdit";

interface ProgramExerciseDetailsListProps {
  programExercisesLength: number;
  handleProgramExercise: (programExercise: IProgramExerciseEditDTO) => void;
  groupedProgramExercises: TProgramExerciseEditRecord;
}

export default function ProgramExercisePreviewList({
  programExercisesLength,
  handleProgramExercise,
  groupedProgramExercises,
}: ProgramExerciseDetailsListProps) {
  return (
    <div className="h-full grid grid-rows-[auto_1fr] gap-2">
      <WrapperModel>
        <ProgramExerciseEdit
          programExerciseLength={programExercisesLength}
          handleProgramExercise={handleProgramExercise}
        />
      </WrapperModel>

      <ul className="grid grid-cols-7 justify-around gap-2 ">
        {DAY_OF_WEEK.map((day) => (
          <li
            key={day}
            className="text-center text-sm font-medium border rounded "
          >
            <h4>{day}</h4>
            <ul>
              {groupedProgramExercises[day].map((programExercise) => (
                <li
                  key={programExercise.id}
                  className="border-b last:border-b-0 p-1"
                >
                  <h5>{programExercise.exercise?.name}</h5>
                  <WrapperModel item={programExercise}>
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
    </div>
  );
}
