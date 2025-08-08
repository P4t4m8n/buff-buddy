import { BrowserRouter, Routes } from "react-router";
import AppFooter from "./components/AppFooter/AppFooter";
import { renderRoutes, ROUTES } from "./routes";
import AuthGuard from "./guards/AuthGuard";
import Toast from "./components/UI/Toast";

export default function App() {
  const routes = renderRoutes(ROUTES);
  return (
    <>
      <BrowserRouter>
        <AuthGuard>
          <div className="background w-screen font-display font-semibold text-main-orange grid gap-2 ">
            <Routes>{routes}</Routes>
            <AppFooter />
          </div>
        </AuthGuard>
        <Toast />
      </BrowserRouter>
    </>
  );
}
