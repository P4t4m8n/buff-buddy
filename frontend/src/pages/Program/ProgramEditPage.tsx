//Lib
import { useParams } from "react-router";
//Components
import ProgramEdit from "../../components/Program/ProgramEdit/ProgramEdit";
//UI
import PageHeader from "../../components/UI/PageHeader";

export default function ProgramEditPage() {
  const { programId } = useParams<{ programId?: string }>();

  const isUpdate = !programId?.startsWith("temp");

  return (
    <div className="h-main grid grid-rows-[3.5rem_calc(100%-4rem)] gap-2">
      <PageHeader pageName={`  ${isUpdate ? "Edit" : "Create"} Program`} />
      <ProgramEdit programId={programId} />
    </div>
  );
}
