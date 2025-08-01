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
import { DAY_OF_WEEK } from "../../../../../../shared/models/app.model";

interface DateInputProps {
  handleDateSelect: (range: IDateRange) => void;
  initialMode?: TDateInputMode;
  disabled?: boolean;
  className?: string;
  selectedRange?: IDateRange;
  errorRange?: {
    startDate?: string | Date | null;
    endDate?: string;
  } | null;
}

export default function DateInput({
  handleDateSelect,
  initialMode = "range",
  selectedRange,
  disabled = false,
  className = "",
  errorRange,
}: DateInputProps) {
  const [isOpen, modelRef, , handleModel] = useModel<HTMLDivElement>();
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

  const buildError = () => {
    if (!errorRange) return null;
    const { startDate, endDate } = errorRange;
    return (
      <div className="text-red-orange text-sm flex gap-4">
        {startDate && (
          <span className="inline-flex">
            <h6 className=" ">Start Date</h6>
            <p className=" ">:invalid Date</p>
          </span>
        )}
        {endDate && (
          <span className="inline-flex">
            <h6 className=" ">End Date</h6>
            <p className=" ">:invalid Date</p>
          </span>
        )}
      </div>
    );
  };

  return (
    <div className={`relative w-full   ${className}`} ref={modelRef}>
      <Button
        onClick={handleModel}
        className={`border ${
          errorRange?.startDate || errorRange?.endDate
            ? "border-red-orange"
            : ""
        } p-2 rounded w-full h-10 flex justify-between items-center cursor-pointer`}
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
      {buildError()}

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
