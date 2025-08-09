import { useCallback, useEffect } from "react";
import { Link } from "react-router";

import { useProgramStore } from "../../store/program.store";
import { ModelButtonIcon } from "../../utils/ModelButtonIcon.util";

import ProgramPreview from "../../components/Program/ProgramPage/ProgramPreview";

import Button from "../../components/UI/Button";
import Loader from "../../components/UI/Loader";
import GenericList from "../../components/UI/GenericList";
import { useErrors } from "../../hooks/shared/useErrors";
import { ClientError } from "../../services/ClientError.service";

export default function ProgramPage() {
  const programs = useProgramStore((state) => state.programs);
  const loadPrograms = useProgramStore((state) => state.loadPrograms);
  const isLoading = useProgramStore((state) => state.isLoading);
  console.log("🚀 ~ ProgramPage ~ isLoading:", isLoading);
  const deleteProgram = useProgramStore((state) => state.deleteProgram);

  const { errors, clearErrors, handleError } = useErrors();
  console.log("🚀 ~ ProgramPage ~ errors:", errors);

  useEffect(() => {
    const init = async () => {
      try {
        clearErrors();
        await loadPrograms();
      } catch (error) {
        const emitToToast = true;
        handleError(error, emitToToast);
      }
    };
    init();
  }, []);

  const onDeleteProgram = useCallback(
    async (id?: string) => {
      console.log("🚀 ~ ProgramPage ~ id:", id);
      try {
        if (!id) {
          throw ClientError.create("Program ID is required for deletion.");
        }
        await deleteProgram(id);
      } catch (error) {
        const emitToToast = true;
        handleError(error, emitToToast);
      }
    },
    [deleteProgram]
  );

  if (isLoading) {
    return <Loader loaderType="screen" />;
  }

  return (
    <section className="h-main flex flex-col ">
      <header className="p-mobile md:p-desktop shadow-border-b ">
        <span className="text-center">
          <h2 className="text-3xl font-bold text-main-black ">Your Programs</h2>
          <p className="text-gray-300 text-lg">
            Manage, edit, or create new training routines to reach your goals!
          </p>
        </span>
        <Link to={"/programs/edit"}>
          <Button buttonStyle="model">{ModelButtonIcon("edit")}</Button>
        </Link>
      </header>
      {/*
       //INFO:Programs preview list
      */}
      <GenericList
        items={programs}
        ulStyle="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]
                  md:grid-cols-[repeat(auto-fit,minmax(18rem,22rem))]
                  h-auto overflow-auto gap-4 p-mobile md:p-desktop"
        ItemComponent={ProgramPreview}
        itemComponentProps={{ onDeleteProgram }}
        getKey={(item) => item.id!}
        NoItemsComponent={NoProgramsComponent}
      />
    </section>
  );
}

const NoProgramsComponent = () => (
  <span className="flex flex-col items-center justify-center h-full">
    <h3 className="text-2xl font-bold ">No programs found</h3>
    <p className="text-main-orange/90">
      Create your first program to get started!
    </p>
  </span>
);
