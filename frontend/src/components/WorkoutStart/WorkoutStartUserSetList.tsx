import type { IUserSetEditDTO } from "../../../../shared/models/set.model";
import GenericList from "../UI/GenericList";
import WorkoutStartUserSets from "./WorkoutStartUserSets";

interface IWorkoutStartUserSetListProps {
  userSets: IUserSetEditDTO[];
  handleUserSetsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logUserSet: (id?: string) => void;
}
export default function WorkoutStartUserSetList({
  userSets,
  handleUserSetsChange,
  logUserSet,
}: IWorkoutStartUserSetListProps) {
  return (
    <GenericList
      items={userSets}
      ItemComponent={WorkoutStartUserSets}
      itemComponentProps={{ handleUserSetsChange, logUserSet }}
      getKey={(item) => item.id!}
      ulStyle="overflow-y-auto h-full flex flex-col gap-2"
    />
  );
}
