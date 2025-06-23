import { toFormatDate } from "../../../../utils/toFormatDate";

interface DateInputDateDisplayProps {
  mode: "single" | "range";
  startDate?: Date | null;
  endDate?: Date | null;
}

export default function DateInputDateDisplay({
  mode,
  startDate,
  endDate,
}: DateInputDateDisplayProps) {
  const getDisplayText = () => {
    if (!startDate) {
      return "Select date" + (mode === "range" ? " range" : "");
    }
    if (mode === "single") {
      return toFormatDate(startDate);
    }

    if (endDate) {
      return `${toFormatDate(startDate)} - ${toFormatDate(endDate)}`;
    }

    return `${toFormatDate(startDate)} - Select end date`;
  };
  return <span className="">{getDisplayText()}</span>;
}
