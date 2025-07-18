import { useRef } from "react";
import { useModel } from "../../hooks/shared/useModel";
import Button from "../UI/Button";
import { ModelButtonIcon } from "../../utils/ModelButtonIcon.util";
import { createPortal } from "react-dom";
import ExerciseEdit from "./ExerciseEdit";
import ModelOverlay from "../UI/ModelOverlay";
import type { IExerciseDTO } from "../../../../shared/models/exercise.model";

interface ExerciseEditModelProps {
  exercise?: IExerciseDTO;
  isPortal?: boolean;
  parentRef?: React.RefObject<HTMLDivElement | null>;
}
export default function ExerciseEditModel({
  exercise,
  isPortal,
  parentRef,
}: ExerciseEditModelProps) {
  const modelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen, handleModel] = useModel(modelRef);

  const mode = exercise?.id ? "edit" : "create";

  const getModel = () => {
    return isPortal ? (
      createPortal(
        <ExerciseEdit
          exercise={exercise}
          modelRef={modelRef}
          setIsOpen={setIsOpen}
          handleModel={handleModel}
        />,
        parentRef?.current || document.body
      )
    ) : (
      <ModelOverlay isOpen={isOpen}>
        <ExerciseEdit
          exercise={exercise}
          modelRef={modelRef}
          setIsOpen={setIsOpen}
          handleModel={handleModel}
        />
      </ModelOverlay>
    );
  };
  return (
    <>
      <Button
        onClick={handleModel}
        className="text-white w-full h-2 lg:h-2"
        buttonStyle={null}
      >
        {isPortal ? <p>Add Exercise</p> : ModelButtonIcon(mode)}
      </Button>
      {isOpen ? getModel() : null}
    </>
  );
}
