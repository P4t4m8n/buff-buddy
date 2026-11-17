import GenericList from "@/components/UI/GenericList";
import {
  type IUserWorkoutExerciseDTO,
  type IUserWorkoutExercisesPayload,
} from "@shared/models/userWorkout";
import NoListItems from "@/components/UI/NoListItems";
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

function UserProfilePreview(_: { item: IUserWorkoutExerciseDTO [] }) {

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
