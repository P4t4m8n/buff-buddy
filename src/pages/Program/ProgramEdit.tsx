import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { IProgramEditDTO } from "../../models/program.model";
import { programService } from "../../services/program.service";
import Input from "../../components/UI/Form/Input";
import Label from "../../components/UI/Form/Label";
import TextArea from "../../components/UI/Form/TextArea";
import Button from "../../components/UI/Button";
import DateInput from "../../components/UI/Form/DateInput/DateInput";
import type { IDateRange } from "../../models/calendar.model";
import ProgramExerciseEditModel from "../../components/Program/ProgramExercise/ProgramExerciseEditModel";
import type { IProgramExerciseEditDTO } from "../../models/programExercise.model";
import { DAY_OF_WEEK, type TDayOfWeek } from "../../models/app.model";

export default function ProgramEdit() {
  const [programToEdit, setProgramToEdit] = useState<IProgramEditDTO | null>(
    null
  );
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadItem();
  }, [id]);

  const loadItem = async () => {
    try {
      setIsLoading(true);
      const item = id
        ? await programService.getById(id)
        : programService.getEmpty();
      setProgramToEdit(item);
    } catch (error) {
      console.error("Failed to load program:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDateSelect = (range: IDateRange) => {
    setProgramToEdit((prev) => ({ ...prev!, dateRange: range }));
  };
  if (isLoading || !programToEdit) {
    return <div className="h-main">Loading...</div>;
  }

  const { name, note, dateRange, programExercises } = programToEdit;

  const handleProgramExercise = (programExercise: IProgramExerciseEditDTO) => {
    setProgramToEdit((prev) => {
      if (!prev) return null;
      const programExercises = prev?.programExercises ?? [];
      if (programExercise.crudOperation === "create") {
        return {
          ...prev,
          programExercises: [...programExercises, programExercise],
        };
      }

      const idx = prev?.programExercises?.findIndex(
        (ex) => ex.id === programExercise.id
      );

      if (idx === undefined || idx === -1) {
        return prev;
      }

      return {
        ...prev,
        programExercises: programExercises
          .toSpliced(idx!, 1, programExercise)
          .sort((a, b) => a.order - b.order)
          .map((ex, i) => {
            const isChangeOrder = ex.order !== i + 1;

            if (!isChangeOrder || ex.crudOperation === "delete") return ex;
            return {
              ...ex,
              order: i + 1,
              crudOperation: "update",
            };
          }),
      };
    });
  };

  const groupProgramExercisesByDay = (pe: IProgramExerciseEditDTO[]) => {
    const peByDay: Record<TDayOfWeek, IProgramExerciseEditDTO[]> = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    };
    pe.forEach((programExercise) => {
      programExercise.daysOfWeek?.forEach((day) => {
        if (!peByDay[day]) {
          peByDay[day] = [];
        }
        peByDay[day].push(programExercise);
      });
    });
    return peByDay;
  };

  const headerText = id ? `Edit Program: ${name}` : `Create New Program`;
  const cleanedProgramExercises = programExercises?.filter(
    (ex) => ex.crudOperation !== "delete"
  );

  const groupedProgramExercises = groupProgramExercisesByDay(
    cleanedProgramExercises || []
  );


  return (
    <form className="h-main fixed inset-0 bg-main-orange p-4 grid grid-rows-[auto_1fr] gap-4">
      <header className="grid grid-row-2 grid-cols-[1fr_1fr_8.5rem] gap-4 justify-around">
        <h2 className="text-2xl font-semibold col-span-full">{headerText}</h2>
        <Input
          defaultValue={name || ""}
          type="text"
          name="name"
          id="name"
          placeholder=""
          required
          className="w-full h-10 peer outline-offset-0  pl-2"
          divStyle="bg-main-orange border-1 rounded h-fit"
        >
          <Label isMoveUpEffect={true} htmlFor="name">
            Program Name
          </Label>
        </Input>
        <DateInput
          handleDateSelect={handleDateSelect}
          selectedRange={dateRange}
        />
        <div className="inline-flex items-center   gap-2 ">
          <Button
            className="w-16 border rounded hover:border-red-orange
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
            className={`bg-inherit border-1 w-16 hover:bg-main-orange h-10
                                  hover:text-white rounded transition-all duration-300
                                  hover:cursor-pointer ${
                                    isLoading ? "opacity-50" : ""
                                  } `}
          >
            Save
          </Button>
        </div>
        <TextArea
          defaultValue={note}
          name="note"
          rows={3}
          placeholder="Add a note..."
          className="w-full h-20 block peer outline-offset-0  pl-2 peer resize-none"
          divStyle="bg-main-orange border-1 rounded h-auto col-span-full "
        ></TextArea>
      </header>
      <div className="h-full grid grid-rows-[auto_1fr] gap-2">
        <ProgramExerciseEditModel
          orderForNewItem={cleanedProgramExercises?.length}
          handleProgramExercise={handleProgramExercise}
        />
        <ul className="grid grid-cols-7 justify-around gap-2 ">
          {DAY_OF_WEEK.map((day) => (
            <li
              key={day}
              className="text-center text-sm font-medium border rounded "
            >
              <h4>{day}</h4>
              <ul>
                {groupedProgramExercises[day].map((programExercise) => (
                  <li
                    key={programExercise.id}
                    className="border-b last:border-b-0 p-1"
                  >
                    <h5>{programExercise.exercise?.name}</h5>
                    <ProgramExerciseEditModel
                      programExercise={programExercise}
                      handleProgramExercise={handleProgramExercise}
                    />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}
