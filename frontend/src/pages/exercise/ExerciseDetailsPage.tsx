import { useNavigate, useParams } from "react-router";
import ExerciseDetails from "../../components/Exercise/ExerciseDetails";
import ModelOverlay from "../../components/UI/ModelOverlay";
export default function exerciseDetailsPage() {
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
