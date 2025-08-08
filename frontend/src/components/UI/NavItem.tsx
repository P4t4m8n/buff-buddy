import { NavLink } from "react-router";
import type { IAppNav } from "../../models/UI.model";
import { twMerge } from "tailwind-merge";

interface NavItemProps {
  navItem: IAppNav;
  activeClass?: string;
  inactiveClass?: string;
}
export default function NavItem({
  navItem,
  activeClass,
  inactiveClass,
}: NavItemProps) {
  return (
    <NavLink
      to={navItem.path}
      className={({ isActive }) =>
        twMerge(isActive ? activeClass : inactiveClass) +
        " grid items-center justify-items-center w-full h-full transition-all duration-300"
      }
    >
      {navItem.icon}
      <p className="text-sm hidden sm:inline">{navItem.label.toUpperCase()}</p>
    </NavLink>
  );
}
