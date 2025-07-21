import { Link } from "react-router";
import { useProgramStore } from "../../store/program.store";
import ProgramList from "../../components/Program/ProgramList";
import { useCallback, useEffect } from "react";
import Button from "../../components/UI/Button";
import Loader from "../../components/UI/Loader";
import { ModelButtonIcon } from "../../utils/ModelButtonIcon.util";

export default function ProgramPage() {
  const programs = useProgramStore((state) => state.programs);
  const loadPrograms = useProgramStore((state) => state.loadPrograms);
  const isLoading = useProgramStore((state) => state.isLoading);
  const deleteProgram = useProgramStore((state) => state.deleteProgram);

  useEffect(() => {
    loadPrograms();
  }, [loadPrograms]);

  const onDeleteProgram = useCallback(
    async (id?: string) => {
      if (!id) return;
      await deleteProgram(id);
    },
    [deleteProgram]
  );

  return (
    <section className="h-main flex flex-col ">
      <header className="p-mobile md:p-desktop">
        <span className="text-center">
          <h2 className="text-3xl font-bold text-main-black ">Your Programs</h2>
          <p className="text-gray-600 text-lg">
            Manage, edit, or create new training routines to reach your goals!
          </p>
        </span>
        <Link to={"/programs/edit"}>
          <Button buttonStyle="model">{ModelButtonIcon("edit")}</Button>
        </Link>
      </header>
      {isLoading ? (
        <Loader />
      ) : (
        <ProgramList
          programs={programs || []}
          onDeleteProgram={onDeleteProgram}
        />
      )}
    </section>
  );
}
