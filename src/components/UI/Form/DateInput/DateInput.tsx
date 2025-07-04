import { useRef } from "react";
import { DAY_OF_WEEK } from "../../../../models/app.model";
import { toTitle } from "../../../../utils/toTitle";
import Button from "../../Button";
import IconCalendar from "../../Icons/IconCalendar";
import DateInputDateDisplay from "./DateInputDateDisplay";
import DateInputControl from "./DateInputControl";
import DateInputDateControl from "./DateInputDateControl/DateInputDateControl";
import DateInputCalendar from "./DateInputCalendar/DateInputCalendar";
import { useModel } from "../../../../hooks/shared/useModel";
import type {
  IDateRange,
  TDateInputMode,
} from "../../../../models/calendar.model";
import { useDateInput } from "../../../../hooks/features/calendar/useDateInput";

interface DateInputProps {
  handleDateSelect: (range: IDateRange) => void;
  initialMode?: TDateInputMode;
  disabled?: boolean;
  className?: string;
  selectedRange?: IDateRange;
}

export default function DateInput({
  handleDateSelect,
  initialMode = "range",
  selectedRange,
  disabled = false,
  className = "",
}: DateInputProps) {
  const calendarRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpen, _, handleModel] = useModel(calendarRef);
  const {
    currentDate,
    setCurrentDate,
    mode,
    setMode,
    handleDateClick,
    clearSelection,
  } = useDateInput(handleDateSelect, initialMode, selectedRange);

  const weekDays: string[] = DAY_OF_WEEK.map((day) =>
    toTitle(day.substring(0, 3))
  );

  return (
    <div className={`relative w-full   ${className}`} ref={calendarRef}>
      <Button
        onClick={handleModel}
        className="border p-2 rounded w-full h-10  flex justify-between items-center cursor-pointer"
      >
        <DateInputDateDisplay
          mode={mode}
          startDate={selectedRange?.start}
          endDate={selectedRange?.end}
        />
        <IconCalendar
          className="bg-main-black rounded stroke-amber fill-none
           hover:bg-amber hover:stroke-main-black transition-all 
           duration-300 group border-2 w-6 h-6 border-transparent
           hover:border-main-black cursor-pointer"
        />
      </Button>

      {isOpen && !disabled && (
        <div
          className="absolute top-[calc(100%+.25rem)] left-0 grid gap-2
         bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4 w-full"
        >
          <DateInputControl
            mode={mode}
            setMode={setMode}
            startDate={selectedRange?.start}
            clearSelection={clearSelection}
          />

          <DateInputDateControl
            setCurrentDate={setCurrentDate}
            currentDate={currentDate}
          />

          <ul className="grid grid-cols-7 justify-around ">
            {weekDays.map((day) => (
              <li
                key={day}
                className="text-center text-sm font-medium text-gray-500 "
              >
                {day}
              </li>
            ))}
          </ul>
          <DateInputCalendar
            mode={mode}
            currentDate={currentDate}
            handleDateClick={handleDateClick}
            startDate={selectedRange?.start}
            endDate={selectedRange?.end}
          />
          <Button
            className={`bg-inherit border-1 p-2 hover:bg-main-orange h-10
                                  hover:text-white rounded transition-all duration-300
                                  hover:cursor-pointer  `}
            onClick={handleModel}
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
}
