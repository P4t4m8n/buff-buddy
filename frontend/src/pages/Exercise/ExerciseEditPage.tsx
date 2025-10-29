//Lib
import { useRef } from "react";
import { useParams } from "react-router";
//Hooks
import { usePageBack } from "../../hooks/shared/usePageBack";
//Components
import ExerciseEdit from "../../components/Exercise/ExerciseEdit/ExerciseEdit";
//UI
import ModelOverlay from "../../components/UI/ModelOverlay";

//INFO: Logic weird to keep the structure of the edit component as it can be used as a model
export default function ExerciseEditPage() {
  const { exerciseId } = useParams<{ exerciseId?: string }>();
  const { navBack } = usePageBack();
  const modelRef = useRef<HTMLFormElement>(null);

  return (
    <ModelOverlay isOpen={true}>
      <ExerciseEdit
        exerciseId={exerciseId}
        modelRef={modelRef}
        setIsOpen={navBack}
        handleModel={navBack}
      />
    </ModelOverlay>
  );
}
