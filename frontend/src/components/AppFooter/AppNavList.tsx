import IconHome from "../UI/Icons/IconHome";
import IconWorkout from "../UI/Icons/IconWorkout";
import IconProgram from "../UI/Icons/IconProgram";
import IconExercise from "../UI/Icons/IconExercise";
import IconProfile from "../UI/Icons/IconProfile";
import NavItem from "../UI/NavItem";
import GenericList from "../UI/GenericList";

import type { IAppNav } from "../../models/UI.model";
import IconDiet from "../UI/Icons/IconDiet";

export default function AppNavList() {
  const paths = [
    {
      label: "home",
      path: "/",
      icon: <IconHome className="w-6 h-6" />,
    },
    {
      label: "workouts",
      path: "/workouts",
      icon: <IconWorkout className="w-6 h-6 " />,
    },
    {
      label: "diet",
      path: "/diet",
      icon: <IconDiet className="w-6 h-6 fill-main-orange " />,
    },
    {
      label: "programs",
      path: "/programs",
      icon: <IconProgram className="w-6 h-6 " />,
    },
    {
      label: "exercises",
      path: "exercises",
      icon: <IconExercise className="w-6 h-6 " />,
    },
    {
      label: "profile",
      path: "/profile",
      icon: <IconProfile className="w-6 h-6 " />,
    },
  ];

  return (
    <nav className="w-full h-full ">
      <GenericList
        items={paths}
        getKey={(item) => item.path}
        ulStyle="flex justify-around items-center h-full  "
        ItemComponent={ItemComponent}
      />
    </nav>
  );
}

const ItemComponent = ({ item }: { item: IAppNav }) => {
  return (
    <li key={item.path}>
      <NavItem
        navItem={item}
        activeClass="text-gray-200 stroke-2 stroke-gray-200 font-bold underline "
        inactiveClass="grid items-center justify-items-center
         stroke-main-orange fill-none text-main-orange transition-all duration-300"
      />
    </li>
  );
};
