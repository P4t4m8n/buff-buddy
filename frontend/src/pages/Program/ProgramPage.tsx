//Components
import ProgramsList from "../../components/Program/ProgramsList";
import PageHeader from "../../components/UI/PageHeader";

export default function ProgramPage() {
  return (
    <section className="h-main w-full bg-black-900 grid grid-rows-[3.5rem_calc(100%-4rem)] gap-2 ">
      <PageHeader pageName="programs" />
      <ProgramsList />
    </section>
  );
}
