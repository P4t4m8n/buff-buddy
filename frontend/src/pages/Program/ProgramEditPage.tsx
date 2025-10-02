//Lib
import { useParams } from "react-router";
//Components
import ProgramEdit from "../../components/Program/ProgramEdit/ProgramEdit";
//UI
import BackButton from "../../components/UI/BackButton";

export default function ProgramEditPage() {
  const { programId } = useParams<{ programId?: string }>();

  const isUpdate = !programId?.startsWith("temp");

  return (
    <div className="h-main grid grid-rows-[3.5rem_calc(100%-4rem)] gap-2">
      <header
        className="inline-flex items-center gap-4 border-b h-14
         border-b-main-orange/25 px-desktop py-2  col-span-full "
      >
        <BackButton />
        <h2 className="text-2xl font-bold col-span-full text-center ">
          {`  ${isUpdate ? "Edit" : "Create"} Program`}
        </h2>
      </header>
      <ProgramEdit programId={programId} />
    </div>
  );
}
