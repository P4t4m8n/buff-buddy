import { useParams } from "react-router";

import { toTitle } from "../../utils/toTitle";
import { ActiveButtonIcon } from "../../utils/ActiveButtonIcon.util";
import { calendarUtil } from "../../utils/calendar.util";

import Loader from "../../components/UI/loader/Loader";
import BackButton from "../../components/UI/BackButton";
import { useProgramIdQuery } from "../../hooks/features/program/useProgramIdQuery";

export default function ProgramDetails() {
  const { programId } = useParams<{ programId?: string }>();
  const { data, isLoading } = useProgramIdQuery(programId);
  const programToView = data?.data;

  if (isLoading) {
    return <Loader />;
  }

  //TODO?? handle error better
  //TODO?? handle no program found
  if (!programToView) {
    return (
      <section className="h-main">
        <p>No program found.</p>
      </section>
    );
  }
  const { name, notes, startDate, endDate, isActive } = programToView;
  const title = toTitle(name + " Program Details");
  const dates = calendarUtil.getFormatDateRange(startDate, endDate);

  return (
    <section className="h-main p-4 grid-stack bg-black-900">
      <header>
        <BackButton />
        <h2>{title}</h2>
        <span className="inline-flex gap-2">
          <h3>Dates:</h3>
          <p>{dates}</p>
        </span>
        <span>
          <h3>Notes:</h3>
          <p>{notes || "No notes available."}</p>
        </span>
        <ActiveButtonIcon isActive={!!isActive} />
      </header>
    </section>
  );
}
