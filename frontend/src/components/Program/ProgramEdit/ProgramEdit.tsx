//Lib
import { useNavigate } from "react-router";
//Hooks
import { useProgramEdit } from "../../../hooks/features/program/useProgramEdit";
//Components
import ProgramWorkoutEditWeekList from "../ProgramWorkout/ProgramWorkoutEdit/ProgramWorkoutEditWeekList";
import ProgramEditInputs from "./ProgramEditInputs";
//UI
import Loader from "../../UI/loader/Loader";

interface IProgramEditProps {
  programId?: string;
}
export default function ProgramEdit({ programId }: IProgramEditProps) {
  const navigate = useNavigate();

  const {
    programToEdit,
    isSaving,
    isLoading,
    mutationErrors,
    handleDateSelect,
    saveProgram,
    handleInputChange,
    handleProgramWorkouts,
    deleteProgramWorkout,
  } = useProgramEdit(programId);

  if (isLoading || !programToEdit) {
    return <Loader loaderType="screen" />;
  }

  const onSaveProgram = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      e.stopPropagation();

      const id = await saveProgram();
      if (id) navigate(`/programs/${id}`);
    } catch (error) {
      //INFO: The try catch block in need to let the error be caught some where. errors are handled in the mutation hook
    }
  };

  const { programWorkouts } = programToEdit;

  return (
    <form
      onSubmit={onSaveProgram}
      className="w-full h-full grid grid-rows-[auto_1fr] grid-cols gap-4 bg-black-900"
    >
      <ProgramEditInputs
        programToEdit={programToEdit}
        isSaving={isSaving}
        errors={mutationErrors}
        handleDateSelect={handleDateSelect}
        handleInputChange={handleInputChange}
        handleProgramWorkouts={handleProgramWorkouts}
      />
      <ProgramWorkoutEditWeekList
        programWorkouts={programWorkouts}
        deleteProgramWorkout={deleteProgramWorkout}
        handleProgramWorkouts={handleProgramWorkouts}
      />
    </form>
  );
}
