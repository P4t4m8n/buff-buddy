import { useMemo, useRef } from "react";
import Button from "../../UI/Button";
import { useModel } from "../../../hooks/useModel";
import type { IProgramExerciseEditDTO } from "../../../models/programExercise.model";
import IconEdit from "../../UI/Icons/IconEdit";
import IconCreate from "../../UI/Icons/IconCreate";
import ProgramExerciseEdit from "./ProgramExerciseEdit";
import ModelOverlay from "../../UI/ModelOverlay";
interface ProgramExerciseEditModelProps {
  programExercise?: IProgramExerciseEditDTO;
  orderForNewItem?: number;
  handleProgramExercise: (programExercise: IProgramExerciseEditDTO) => void;
}
export default function ProgramExerciseEditModel({
  programExercise,
  orderForNewItem,
  handleProgramExercise,
}: ProgramExerciseEditModelProps) {
  const modelRef = useRef(null);
  const [isOpen, setIsOpen, handleModel] = useModel(modelRef);
  const buttonIcon = useMemo(
    () =>
      programExercise ? (
        <IconEdit
          className="fill-amber stroke-amber h-8 w-8
           group-hover:stroke-main-black transition-all duration-300"
        />
      ) : (
        <IconCreate
          className="fill-none stroke-amber h-8 w-8
           group-hover:stroke-main-black transition-all duration-300"
        />
      ),
    [programExercise]
  );
  return (
    <>
      <Button
        onClick={handleModel}
        className="bg-main-black p-2 rounded  hover:bg-amber transition-all 
                   duration-300 group border-2 w-14 h-14 border-transparent hover:border-main-black cursor-pointer"
      >
        {buttonIcon}
      </Button>
      {isOpen ? (
        <ModelOverlay isOpen={isOpen}>
          <ProgramExerciseEdit
            programExercise={programExercise}
            programExerciseLength={orderForNewItem}
            modelRef={modelRef}
            handleProgramExercise={handleProgramExercise}
            setModel={setIsOpen}
          />
        </ModelOverlay>
      ) : null}
    </>
  );
}
