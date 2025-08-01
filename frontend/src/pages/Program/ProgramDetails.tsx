import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { IProgramDTO } from "../../../../shared/models/program.model";
import { useProgramStore } from "../../store/program.store";
import { toTitle } from "../../utils/toTitle";
import ActiveButtonIcon from "../../utils/ActiveButtonIcon.util";
import Loader from "../../components/UI/Loader";
import { calendarUtil } from "../../utils/calendar.util";

export default function ProgramDetails() {
  const { id } = useParams<{ id?: string }>();
  const [programToDisplay, setProgramToDisplay] = useState<IProgramDTO | null>(
    null
  );
  const isLoading = useProgramStore((state) => state.isLoading);

  const getProgramById = useProgramStore((state) => state.getProgramById);

  useEffect(() => {
    if (id) {
      getProgramById(id)
        .then((program) => {
          setProgramToDisplay(program as IProgramDTO | null);
        })
        .catch((err) => {
          console.error("Error fetching program:", err);
        });
    }
  }, [id, getProgramById]);

  if (isLoading) {
    return <Loader />;
  }

  //TODO?? handle error better
  //TODO?? handle no program found
  if (!programToDisplay) {
    return (
      <section className="h-main">
        <p>No program found.</p>
      </section>
    );
  }
  const { name, notes, startDate, endDate, isActive } = programToDisplay;
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
