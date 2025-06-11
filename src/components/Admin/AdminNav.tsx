import NavItem from "../UI/NavItem";

export default function AdminNav() {
  const paths = [
    { label: "muscles", path: "/admin/exercise-info/muscles" },
    { label: "equipment", path: "/admin/exercise-info/equipment" },
    { label: "types", path: "/admin/exercise-info/types" },
  ];

  return (
    <nav className="w-full h-8 bg-main-black text-white">
      <ul className="flex justify-around items-center h-full">
        {paths.map((p) => (
          <li key={p.path} className="w-full h-full ">
            <NavItem
              navItem={p}
              activeClass="bg-main-orange"
              inactiveClass="bg-inherit"
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
