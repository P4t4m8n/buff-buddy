import type { IProgramWorkoutDTO } from "../../../../shared/models/program.model";

interface IProgramWorkoutDetailsProps {
  item: IProgramWorkoutDTO;
}
export default function ProgramWorkoutDetails({
  item: programWorkout,
}: IProgramWorkoutDetailsProps) {
  const { name } = programWorkout.workout ?? {};

  return <div>{name}</div>;
}
