import { useRef } from "react";
import { useNavigate, useParams } from "react-router";

import ExerciseEdit from "../../components/Exercise/ExerciseEdit";

import ModelOverlay from "../../components/UI/ModelOverlay";

//INFO: Logic weird to cpy the structure of the edit component as it can be used as a model
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
      />
      ;
    </ModelOverlay>
  );
}
