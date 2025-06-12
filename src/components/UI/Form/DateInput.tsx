import { useState, useRef, useEffect } from "react";
import { useModel } from "../../../hooks/useModel";
import IconArrow from "../Icons/IconArrow";

interface DateRange {
  start: Date | null;
  end: Date | null;
}

type DateInputMode = "single" | "range";

interface DateInputProps {
  onDateSelect?: (range: DateRange) => void;
  initialMode?: DateInputMode;
  initialValue?: DateRange;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export default function DateInput({
  onDateSelect,
  initialMode = "range",
  initialValue = { start: null, end: null },
  placeholder,
  disabled = false,
  className = "",
}: DateInputProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedRange, setSelectedRange] = useState<DateRange>(initialValue);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [mode, setMode] = useState<DateInputMode>(initialMode);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useModel(calendarRef);

  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const navigateYear = (direction: number) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setFullYear(prev.getFullYear() + direction);
      return newDate;
    });
  };

  const isDateInRange = (date: Date) => {
    if (!selectedRange.start || !selectedRange.end) return false;
    return date >= selectedRange.start && date <= selectedRange.end;
  };

  const isDateInHoverRange = (date: Date) => {
    if (!selectedRange.start || !hoverDate || selectedRange.end) return false;
    const start = selectedRange.start;
    const end = hoverDate;
    return (
      date.getTime() >= Math.min(start.getTime(), end.getTime()) &&
      date.getTime() <= Math.max(start.getTime(), end.getTime())
    );
  };

  const handleDateClick = (day: number | undefined) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    if (mode === "single") {
      setSelectedRange({ start: clickedDate, end: clickedDate });
    } else {
      if (!selectedRange.start || selectedRange.end) {
        setSelectedRange({ start: clickedDate, end: null });
      } else {
        const start = selectedRange.start;
        const end = clickedDate;
        setSelectedRange({
          start: start <= end ? start : end,
          end: start <= end ? end : start,
        });
      }
    }
  };

  const formatDate = (date: Date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDisplayText = () => {
    if (mode === "single" && selectedRange.start) {
      return formatDate(selectedRange.start);
    }
    if (mode === "range") {
      if (selectedRange.start && selectedRange.end) {
        return `${formatDate(selectedRange.start)} - ${formatDate(
          selectedRange.end
        )}`;
      }
      if (selectedRange.start) {
        return `${formatDate(selectedRange.start)} - Select end date`;
      }
    }
    return "Select date" + (mode === "range" ? " range" : "");
  };

  const clearSelection = () => {
    setSelectedRange({ start: null, end: null });
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    if (mode === "single") {
      setSelectedRange({ start: today, end: today });
    }
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const isToday = new Date().toDateString() === date.toDateString();
      const isSelected =
        (selectedRange.start &&
          date.toDateString() === selectedRange.start.toDateString()) ||
        (selectedRange.end &&
          date.toDateString() === selectedRange.end.toDateString());
      const isInRange = isDateInRange(date);
      const isInHoverRange = isDateInHoverRange(date);
      const isStartDate =
        selectedRange.start &&
        date.toDateString() === selectedRange.start.toDateString();
      const isEndDate =
        selectedRange.end &&
        date.toDateString() === selectedRange.end.toDateString();

      days.push(
        <button
          key={day}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDateClick(day);
          }}
          onMouseEnter={() => setHoverDate(date)}
          onMouseLeave={() => setHoverDate(null)}
          className={`
            w-8 h-8 text-sm rounded-md transition-all duration-200 hover:bg-blue-100
            ${isToday ? "border border-blue-500 font-semibold" : ""}
            ${isSelected ? "bg-blue-500 text-white hover:bg-blue-600" : ""}
            ${(isInRange || isInHoverRange) && !isSelected ? "bg-blue-100" : ""}
            ${isStartDate && mode === "range" ? "rounded-r-none" : ""}
            ${isEndDate && mode === "range" ? "rounded-l-none" : ""}
            ${
              (isInRange || isInHoverRange) &&
              !isStartDate &&
              !isEndDate &&
              mode === "range"
                ? "rounded-none"
                : ""
            }
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className={`relative ${className}`} ref={calendarRef}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`flex items-center justify-between p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-64 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <span
          className={selectedRange.start ? "text-gray-900" : "text-gray-500"}
        >
          {getDisplayText()}
        </span>
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {isOpen && !disabled && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4 min-w-80">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setMode(mode === "single" ? "range" : "single")}
                className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                {mode === "single" ? "Single" : "Range"}
              </button>
              <button
                onClick={goToToday}
                className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md transition-colors"
              >
                Today
              </button>
              {selectedRange.start && (
                <button
                  onClick={clearSelection}
                  className="px-3 py-1 text-xs bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateYear(-1)}
                className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                title="Previous Year"
              >
                <IconArrow className="w-4 h-4 rotate-45" />
              </button>
              <button
                onClick={() => navigateMonth(-1)}
                className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                title="Previous Month"
              >
                <IconArrow className="w-4 h-4 rotate-45" />
              </button>
            </div>

            <h2 className="text-lg font-semibold">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateMonth(1)}
                className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                title="Next Month"
              >
                <IconArrow className="w-4 h-4 rotate-45" />
              </button>
              <button
                onClick={() => navigateYear(1)}
                className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                title="Next Year"
              >
                <IconArrow className="w-4 h-4 rotate-45" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-gray-500 p-2"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>

          {selectedRange.start && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">
                <strong>Selected:</strong>
                <div className="mt-1">
                  {mode === "single"
                    ? formatDate(selectedRange.start)
                    : selectedRange.end
                    ? `${formatDate(selectedRange.start)} to ${formatDate(
                        selectedRange.end
                      )}`
                    : `From ${formatDate(
                        selectedRange.start
                      )} (select end date)`}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
