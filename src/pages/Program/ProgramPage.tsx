import { Link } from "react-router";
import IconEdit from "../../components/UI/Icons/IconEdit";
import { useProgramStore } from "../../store/program.store";
import ProgramList from "../../components/Program/ProgramTable";
import { useCallback, useEffect } from "react";
import Button from "../../components/UI/Button";

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
    <section className="h-main flex flex-col p-4">
      <header>
        <span className="text-center">
          <h2 className="text-3xl font-bold text-main-black ">Your Programs</h2>
          <p className="text-gray-600 text-lg">
            Manage, edit, or create new training routines to reach your goals!
          </p>
        </span>
        <Link to={"/programs/edit"}>
          <Button buttonStyle="model">
            <IconEdit
              className="fill-none stroke-amber h-full aspect-square
                    group-hover:stroke-main-black transition-all duration-300"
            />
          </Button>
        </Link>
      </header>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ProgramList
          programs={programs || []}
          onDeleteProgram={onDeleteProgram}
        />
      )}
    </section>
  );
}
