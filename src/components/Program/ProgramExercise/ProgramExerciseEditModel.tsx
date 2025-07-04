import { useRef } from "react";
import Button from "../../UI/Button";
import { useModel } from "../../../hooks/shared/useModel";
import { getButtonIcon } from "../../../utils/UI.util";
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
  testRef
}: ProgramExerciseEditModelProps) {
  const modelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen, handleModel] = useModel(modelRef);

  const mode = programExercise?.id ? "edit" : "create";
  return (
    <>
      <Button
        onClick={handleModel}
        className="mr-auto lg:mr-0 lg:w-full"
        buttonStyle="model"
      >
        {getButtonIcon(mode)}
      </Button>
      <ModelOverlay isOpen={isOpen}>
        <ProgramExerciseEdit
          programExercise={programExercise}
          programExerciseLength={programExerciseLength}
          handleProgramExercise={handleProgramExercise}
          modelRef={modelRef}
          setIsOpen={setIsOpen}
          testRef={testRef}
        />
      </ModelOverlay>
    </>
  );
}
