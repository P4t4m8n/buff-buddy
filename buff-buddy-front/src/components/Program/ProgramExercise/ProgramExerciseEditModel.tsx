import { useRef } from "react";
import Button from "../../UI/Button";
import { useModel } from "../../../hooks/shared/useModel";
import { ModelButtonIcon } from "../../../utils/ModelButtonIcon.util";
import type { IProgramExerciseEditDTO } from "../../../models/programExercise.model";
import ModelOverlay from "../../UI/ModelOverlay";
import ProgramExerciseEdit from "./ProgramExerciseEdit";

interface ProgramExerciseEditModelProps {
  programExercise?: IProgramExerciseEditDTO;
  programExerciseLength?: number;
  handleProgramExercise: (programExercise: IProgramExerciseEditDTO) => void;
}

export default function ProgramExerciseEditModel({
  programExercise,
  programExerciseLength,
  handleProgramExercise,
}: ProgramExerciseEditModelProps) {
  const modelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen, handleModel] = useModel(modelRef);

  const mode = programExercise?.id ? "edit" : "create";
  return (
    <>
      <Button
        onClick={handleModel}
        className={`${
          mode === "create" ? "mr- uto" : " mr-0 mt-auto w-full"
        } lg:mr-0 lg:w-full`}
        buttonStyle="model"
      >
        {ModelButtonIcon(mode)}
      </Button>
      {isOpen ? (
        <ModelOverlay isOpen={isOpen}>
          <ProgramExerciseEdit
            programExercise={programExercise}
            programExerciseLength={programExerciseLength}
            handleProgramExercise={handleProgramExercise}
            modelRef={modelRef}
            setIsOpen={setIsOpen}
          />
        </ModelOverlay>
      ) : null}
    </>
  );
}
