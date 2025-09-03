import { Outlet } from "react-router";
import LinkComponent from "../../components/UI/Link";

export default function DietPage() {
  return (
    <div className="h-main grid">
      <div className="grid-stack h-main">
        <LinkComponent
          className="bg-main-orange w-fit py-2 px-2 rounded text-black self-center "
          to="/diet/meals"
        >
          Meals List
        </LinkComponent>
      </div>
      <Outlet />
    </div>
  );
}
