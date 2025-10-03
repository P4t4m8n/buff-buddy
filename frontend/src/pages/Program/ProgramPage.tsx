//Components
import ProgramsList from "../../components/Program/ProgramsList";
import PageHeader from "../../components/UI/PageHeader";
//Consts
import { PROGRAM_ROUTES } from "../../consts/routes.const";

export default function ProgramPage() {
  return (
    <section className="h-main w-full bg-black-900 grid grid-rows-[3.5rem_calc(100%-4rem)] gap-2 ">
      <PageHeader
        pageName="programs"
        editLink={PROGRAM_ROUTES.PROGRAM_EDIT_ROUTE}
      />
      <ProgramsList />
    </section>
  );
}
