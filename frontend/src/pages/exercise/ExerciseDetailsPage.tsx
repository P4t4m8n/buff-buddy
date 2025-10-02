//Lb
import { useNavigate, useParams } from "react-router";
//Components
import ExerciseDetails from "../../components/Exercise/ExerciseDetails";
//UI
import ModelOverlay from "../../components/UI/ModelOverlay";

export default function ExerciseDetailsPage() {
  const { exerciseId } = useParams<{ exerciseId?: string }>();
  const navigate = useNavigate();

  const onBack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("/exercises");
  };
  return (
    <ModelOverlay isOpen={true}>
      <ExerciseDetails exerciseId={exerciseId} handleModel={onBack} />
    </ModelOverlay>
  );
}
