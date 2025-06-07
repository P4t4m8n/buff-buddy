import { BrowserRouter, Routes } from "react-router";
import AppFooter from "./components/AppFooter/AppFooter";
import { renderRoutes, ROUTES } from "./routes";

export default function App() {
  const routes = renderRoutes(ROUTES);
  return (
    <>
      <BrowserRouter>
        <div className=" bg-main-orange h-screen w-screen">
          <Routes>{routes}</Routes>
          <AppFooter />
        </div>
      </BrowserRouter>
    </>
  );
}
