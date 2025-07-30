import type { DaysOfWeek } from "../../../../backend/prisma/generated/prisma";
import type { IProgramWorkoutDTO } from "../../../../shared/models/program.model";
import GenericList from "../UI/GenericList";
import ProgramWorkoutPreview from "./ProgramWorkoutPreview";

interface IProgramWorkoutListProps {
  programWorkouts: IProgramWorkoutDTO[];
  day?: DaysOfWeek | null;
}

export default function ProgramWorkoutList({
  programWorkouts,
  day,
}: IProgramWorkoutListProps) {
  return (
    <GenericList
      items={programWorkouts}
      ItemComponent={ProgramWorkoutPreview}
      getKey={(item) => item?.id ?? "" + day}
      ulStyle="px-mobile w-full"
    />
  );
}
