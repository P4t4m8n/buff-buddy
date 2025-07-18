import { useParams } from "react-router";
import { useProgramEdit } from "../../hooks/features/program/useProgramEdit";
import Label from "../../components/UI/Form/Label";
import TextArea from "../../components/UI/Form/TextArea";
import Button from "../../components/UI/Button";
import DateInput from "../../components/UI/Form/DateInput/DateInput";
import Input from "../../components/UI/Form/Input";
import { calendarUtil } from "../../utils/calendar.util";
import Loader from "../../components/UI/Loader";
import ProgramEditWorkoutModel from "../../components/Program/ProgramEditWorkoutModel";
import { DAY_OF_WEEK } from "../../models/app.model";
import { toTitle } from "../../utils/toTitle";

export default function ProgramEdit() {
  const { id } = useParams<{ id?: string }>();

  const {
    programToEdit,
    isLoading,
    error,
    handleDateSelect,
    onSaveProgram,
    handleWorkouts,
    groupWorkoutsByDay,
    navigate,
    handleInputChange,
  } = useProgramEdit(id);

  if (isLoading || !programToEdit) {
    return <Loader />;
  }

  const { name, notes, startDate, endDate, workouts, isActive } = programToEdit;

  const headerText = id ? `Edit Program: ${name}` : `Create New Program`;
  const cleanedWorkouts = workouts?.filter(
    (ex) => ex.crudOperation !== "delete"
  );
  const groupedWorkouts = groupWorkoutsByDay(cleanedWorkouts || []);

  const dateRange = {
    start: calendarUtil.convertDate(startDate),
    end: calendarUtil.convertDate(endDate),
  };

  return (
    <div>
      <form
        onSubmit={onSaveProgram}
        className="h-main bg-main-orange px-4 pt-4 grid grid-rows-[auto_1fr] gap-4"
      >
        <header
          className="grid grid-rows-[2rem_2.5rem_2.5rem_5rem_2.5rem] lg:grid-rows-[2rem_3.5rem_9.5rem] grid-cols-3
        lg:grid-cols-[1fr_1fr_8.5rem] lg:h-68 gap-4 justify-around"
        >
          <h2 className="text-2xl font-semibold col-span-full">{headerText}</h2>
          <Input
            value={name || ""}
            type="text"
            name="name"
            id="name"
            placeholder=""
            onChange={handleInputChange}
            className={`w-full h-10 peer outline-offset-0 pl-2 border-1 rounded ${
              error?.errors?.name ? "border-red-orange outline-red-orange" : ""
            }`}
            divStyle="bg-main-orange h-fit order-1 w-full col-span-2 lg:col-span-1"
          >
            <Label
              isMoveUpEffect={true}
              htmlFor="name"
              className={`${
                error?.errors?.name
                  ? " text-sm w-fit text-red-orange peer-[:not(:placeholder-shown)]:text-red-orange peer-focus:text-red-orange"
                  : ""
              }`}
            >
              {error?.errors?.name
                ? " Program name is required"
                : "Program Name"}
            </Label>
          </Input>
          <DateInput
            handleDateSelect={handleDateSelect}
            selectedRange={dateRange}
            className=" col-span-full lg:col-span-1 order-3 lg:order-2"
            errorRange={{
              startDate: error?.errors?.startDate,
              endDate: error?.errors?.endDate,
            }}
          />
          <Input
            onChange={handleInputChange}
            checked={isActive}
            type="checkBox"
            name="isActive"
            id="isActive"
            divStyle="flex items-center order-2 justify-self-end lg:justify-self-center"
            hidden
            className="hidden peer"
          >
            <Label htmlFor="isActive" className="switch-label"></Label>
          </Input>
          <TextArea
            onChange={handleInputChange}
            value={notes ?? ""}
            name="notes"
            rows={3}
            placeholder="Add a note..."
            className="w-full h-full  block peer outline-offset-0  pl-2 peer resize-none"
            divStyle="bg-main-orange border-1 rounded h-auto col-span-full lg:col-span-2 order-4"
          ></TextArea>
          <div
            className="inline-flex lg:grid items-center lg:justify-items-center gap-2 order-5
          w-full col-span-full lg-col-span-1 lg:col-start-3"
          >
            <ProgramEditWorkoutModel handleWorkouts={handleWorkouts} />
            <Button
              className="w-16 border rounded lg:w-full hover:border-red-orange
            cursor-pointer h-10
            hover:text-red-orange transition-all duration-300"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              aria-disabled={isLoading}
              className={`bg-inherit border-1 w-16 lg:w-full hover:bg-main-orange h-10
              hover:text-white rounded transition-all duration-300
              hover:cursor-pointer ${isLoading ? "opacity-50" : ""} `}
            >
              Save
            </Button>
          </div>
        </header>
        <ul
          className="grid grid-rows-[repeat(7,10rem)] lg:grid-rows-1 grid-cols-1 lg:grid-cols-7
     justify-around gap-2 w-full h-[31rem] lg:h-[calc(100%)] lg:pb-4 overflow-y-auto "
        >
          {DAY_OF_WEEK.map((day) => (
            <li
              key={day}
              className="text-center text-sm  border rounded p-2 h-40 lg:h-full "
            >
              <h4 className="font-bold decoration-2 underline">
                {toTitle(day)}
              </h4>
              <ul className="p-1 flex lg:flex-col gap-2">
                {groupedWorkouts[day].map((workout) => (
                  <li
                    key={workout.id}
                    className="border text-center w-20 lg:w-full grid
                 justify-items-center gap-1 p-1 rounded"
                  >
                    <h5 className="font-medium">{workout.name}</h5>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

// <div className="grid gap-1">
//         <Label htmlFor="daysOfWeek">Days of the week</Label>
//         <CheckboxMulti
//           options={calendarUtil.getShortWeekDays(true)}
//           selectedOptions={
//             calendarUtil.fullWeekdaysToShort(daysOfWeek!) ?? []
//           }
//           inputName="daysOfWeek"
//           listStyle=""
//           onChange={onDaysChange}
//         />
//         {programExerciseErrors?.daysOfWeek ? (
//           <Label htmlFor="order" className=" text-sm text-red-orange">
//             {programExerciseErrors?.daysOfWeek}
//           </Label>
//         ) : null}
//       </div>

// const onDaysChange = (e: ChangeEvent) => {
//   const target = e.target as HTMLInputElement;
//   const value = target.value;
//   const isChecked = target.checked;
//   const fixedDay = calendarUtil.shortWeekdayToFull(value);
//   setWorkoutExerciseToEdit((prev) => {
//     if (!prev) return null;
//     const newDaysOfWeek = isChecked
//       ? [...(prev.daysOfWeek || []), fixedDay]
//       : (prev.daysOfWeek || []).filter((day) => day !== fixedDay);
//     return {
//       ...prev,
//       daysOfWeek: newDaysOfWeek,
//     };
//   });
// };
