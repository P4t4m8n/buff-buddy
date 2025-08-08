import { useCallback, useEffect } from "react";
import { Link } from "react-router";

import { useProgramStore } from "../../store/program.store";
import { ModelButtonIcon } from "../../utils/ModelButtonIcon.util";

import ProgramPreview from "../../components/Program/ProgramPage/ProgramPreview";

import Button from "../../components/UI/Button";
import Loader from "../../components/UI/Loader";
import GenericList from "../../components/UI/GenericList";

export default function ProgramPage() {
  const programs = useProgramStore((state) => state.programs);
  console.log("🚀 ~ ProgramPage ~ programs:", programs)
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="h-main flex flex-col ">
      <header className="p-mobile md:p-desktop shadow-border-b ">
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

      <GenericList
        items={programs}
        ulStyle="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]
                  md:grid-cols-[repeat(auto-fit,minmax(18rem,22rem))]
                  h-auto overflow-auto gap-4 p-mobile md:p-desktop"
        ItemComponent={ProgramPreview}
        itemComponentProps={{ onDeleteProgram }}
        getKey={(item) => item.id!}
      />
    </section>
  );
}
