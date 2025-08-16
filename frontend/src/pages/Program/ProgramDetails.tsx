import { useProgramStore } from "../../store/program.store";
import { useItemDetails } from "../../hooks/shared/useItemDetails";

import { toTitle } from "../../utils/toTitle";
import ActiveButtonIcon from "../../utils/ActiveButtonIcon.util";
import { calendarUtil } from "../../utils/calendar.util";

import Loader from "../../components/UI/loader/Loader";
import { useParams } from "react-router";

export default function ProgramDetails() {
  const { programId } = useParams<{ programId?: string }>();
  const { itemToView: programToView, isLoadingId: isLoading } = useItemDetails({
    useStore: useProgramStore,
    id: programId,
  });

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
    <section className="h-main p-4">
      <header>
        <h2>{title}</h2>
        <span className="inline-flex gap-2">
          <h3>Dates:</h3>
          <p>{dates}</p>
        </span>
        <span>
          <h3>Notes:</h3>
          <p>{notes || "No notes available."}</p>
        </span>
        <ActiveButtonIcon isActive={isActive} />
      </header>
    </section>
  );
}
