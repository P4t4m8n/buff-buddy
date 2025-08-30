import { useParams } from "react-router";
import { ProgramEditProvider } from "../../contexts/ProgramEditContext";
import ProgramEdit from "../../components/Program/ProgramEdit/ProgramEdit";

export default function ProgramEditPage() {
  const { programId } = useParams<{ programId?: string }>();

  return (
    <ProgramEditProvider programId={programId}>
      <ProgramEdit />
    </ProgramEditProvider>
  );
}
