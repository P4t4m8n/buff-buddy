import { useState } from "react";
import type {
  IDateRange,
  TDateInputMode,
} from "../../../models/calendar.model";

export const useDateInput = (
  handleDateSelect: (range: IDateRange) => void,
  initialMode: TDateInputMode,
  selectedRange?: IDateRange
) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<TDateInputMode>(initialMode);

  const handleDateClick = (day: number | undefined) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    if (mode === "single") {
      handleDateSelect({ start: clickedDate, end: clickedDate });
    } else {
      if (!selectedRange?.start || selectedRange?.end) {
        handleDateSelect({ start: clickedDate, end: null });
      } else {
        const start = selectedRange.start;
        const end = clickedDate;
        handleDateSelect({
          start: start! <= end ? start : end,
          end: start! <= end ? end : start,
        });
      }
    }
  };

  const clearSelection = () => {
    handleDateSelect({ start: null, end: null });
  };

  return {
    currentDate,
    setCurrentDate,
    mode,
    setMode,
    handleDateClick,
    clearSelection,
  };
};
