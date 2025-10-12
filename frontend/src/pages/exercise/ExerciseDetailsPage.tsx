//Lb
import { useParams } from "react-router";
//Components
import ExerciseDetails from "../../components/Exercise/ExerciseDetails";
//UI
import ModelOverlay from "../../components/UI/ModelOverlay";
import { usePageBack } from "../../hooks/shared/usePageBack";

export default function ExerciseDetailsPage() {
  const { exerciseId } = useParams<{ exerciseId?: string }>();
  const { onBack } = usePageBack();

  return (
    <ModelOverlay isOpen={true}>
      <ExerciseDetails exerciseId={exerciseId} handleModel={onBack} />
    </ModelOverlay>
  );
}
