import { Link, Outlet } from "react-router";
import IconEdit from "../../components/UI/Icons/IconEdit";

export default function ProgramPage() {
  return (
    <section className="h-main grid">
      <h2>Programs</h2>
      <Link
        className="bg-main-black p-2 rounded  hover:bg-amber transition-all 
               duration-300 group border-2 w-14 h-14 border-transparent
                hover:border-main-black cursor-pointer"
        to={"/programs/edit"}
      >
        <IconEdit
          className="fill-amber stroke-amber h-8 w-8
             group-hover:stroke-main-black transition-all duration-300"
        />
      </Link>
      <Outlet />
    </section>
  );
}
