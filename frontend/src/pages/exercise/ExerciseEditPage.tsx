//Lib
import { useRef } from "react";
import { useNavigate, useParams } from "react-router";
//Components
import ExerciseEdit from "../../components/Exercise/ExerciseEdit";
//UI
import ModelOverlay from "../../components/UI/ModelOverlay";

//INFO: Logic weird to keep the structure of the edit component as it can be used as a model
export default function ExerciseEditPage() {
  const { exerciseId } = useParams<{ exerciseId?: string }>();
  const navigate = useNavigate();
  const modelRef = useRef<HTMLFormElement>(null);

  const onBack = () => {
    navigate("/exercises");
  };
  return (
    <ModelOverlay isOpen={true}>
      <ExerciseEdit
        exerciseId={exerciseId}
        modelRef={modelRef}
        setIsOpen={onBack}
        handleModel={onBack}
      />
    </ModelOverlay>
  );
}
