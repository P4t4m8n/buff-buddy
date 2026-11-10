import { INITIAL_FILTERS } from "@/consts/filters.consts";
import { useExercisesQuery } from "@/hooks/features/exercise/useExerciseQuery";
import { useGenericPage } from "@/hooks/shared/useGenericPage";
import { exerciseService } from "@/services/exercise.service";
import type {
  IExerciseDTO,
  IExerciseFilter,
} from "@shared/models/exercise.model";
import GenericList from "@/components/UI/GenericList";
import {
  type IUserWorkoutExerciseDTO,
  type IUserWorkoutExercisesDTO,
  type IUserWorkoutExercisesPayload,
} from "@shared/models/userWorkout";
import { QUERY_KEYS } from "@/consts/queryKeys.consts";
import NoListItems from "@/components/UI/NoListItems";
import PageHeader from "@/components/UI/PageHeader";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { apiService } from "@/services/api.service";
import getTempId from "@shared/utils/getTempId";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

export default function ProfileExercisePage() {
  const [items, setItems] = useState<IUserWorkoutExercisesPayload[]>([]);
  
  useEffect(() => {
    const init = async () => {
      const _items = await apiService.get<IUserWorkoutExercisesPayload[]>(
        "/user-workouts/user-exercises/",
      );
      
      setItems(_items.data);
    };
    init();
  }, []);
  
  if (!items) {
    return <div></div>;
  }
  // const userStrengthSets = items
  //   .map((item) =>
  //     item.userWorkoutExercises.map((b) => b.userStrengthSets.flat()).flat(),
  //   )
  //   .flat();

  // const labels = userStrengthSets.map((a) => a.createdAt);

  // const data = {
  //   labels,
  //   dataSets: [],
  // };
  return (
    <div className="h-full">
      <GenericList<IUserWorkoutExercisesPayload, any>
        items={items}
        ItemComponent={UserProfilePreview}
        itemComponentProps={{}}
        NoItemsComponent={NoItemsComponent}
        getKey={() => getTempId()}
        ulStyle="gap-4 h-full overflow-y-auto p-desktop w-full 
                       grid grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] grid-rows-[repeat(auto-fill,16rem)]
                      "
      />
      {/* <Line
        data={{
          labels,
          datasets: [
            {
              label: "Reps",
              data: userStrengthSets.map((a) => a.reps),
            },
            {
              label: "Weight",
              data: userStrengthSets.map((a) => a.weight),
            },
          ],
        }}
        options={options}
      ></Line> */}
    </div>
  );
}

function UserProfilePreview({ item }: { item: IUserWorkoutExerciseDTO [] }) {

  return (
    <section>
    </section>
  );
}

const NoItemsComponent = () => {
  return (
    <NoListItems
      heading="No exercises found"
      paragraph="Create your first exercise to get started!"
    />
  );
};
