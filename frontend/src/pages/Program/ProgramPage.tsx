import { Link, Outlet } from "react-router";

import { useProgramStore } from "../../store/program.store";

import { useItemsPage } from "../../hooks/shared/useItemsPage";
import { ModelButtonIcon } from "../../utils/ModelButtonIcon.util";

import ProgramsList from "../../components/Program/ProgramPage/ProgramsList";

import Button from "../../components/UI/Button";

export default function ProgramPage() {
  const {
    items: programs,
    isLoading,
    onDeleteItem,
  } = useItemsPage({
    useStore: useProgramStore,
    initialFilter: {},
  });

  return (
    <section className="h-main w-full grid ">
      <div className=" grid-stack flex flex-col">
        <header className="p-mobile md:p-desktop shadow-border-b ">
          <span className="text-center">
            <h2 className="text-3xl font-bold text-main-black ">
              Your Programs
            </h2>
            <p className="text-gray-300 text-lg">
              Manage, edit, or create new training routines to reach your goals!
            </p>
          </span>
          <Link to={"/programs/edit"}>
            <Button buttonStyle="model">{ModelButtonIcon("edit")}</Button>
          </Link>
        </header>
        <ProgramsList
          programs={programs}
          onDeleteProgram={onDeleteItem}
          isLoading={isLoading}
        />
      </div>
      <Outlet/>
    </section>
  );
}
