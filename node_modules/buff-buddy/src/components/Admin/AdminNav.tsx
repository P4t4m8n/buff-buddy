import type { IAppNav } from "../../models/UI.model";
import GenericList from "../UI/GenericList";
import NavItem from "../UI/NavItem";

export default function AdminNav() {
  const paths = [{ label: "TBA", path: "/TBA" }];

  return (
    <nav className="w-full h-8 bg-main-black text-white">
      <GenericList
        items={paths}
        getKey={(item) => item.path}
        ulStyle="flex justify-around items-center h-full bg-main-black text-white"
        ItemComponent={ItemComponent}
      />
    </nav>
  );
}

const ItemComponent = ({ item }: { item: IAppNav }) => {
  return (
    <li key={item.path} className="w-full h-full">
      <NavItem
        navItem={item}
        activeClass="bg-main-orange"
        inactiveClass="bg-inherit"
      />
    </li>
  );
};
