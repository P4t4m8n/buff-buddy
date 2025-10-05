import { calendarUtil } from "../../../../utils/calendar.util";

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
      return calendarUtil.formatDate(startDate);
    }

    if (endDate) {
      return `${calendarUtil.getFormatDateRange(startDate, endDate)}`;
    }

    return `${calendarUtil.formatDate(startDate)} - Select end date`;
  };
  return <span className="">{getDisplayText()}</span>;
}
