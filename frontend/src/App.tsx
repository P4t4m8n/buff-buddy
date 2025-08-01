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
          <div
            className="bg-gradient-to-br from-main-orange/90 
                     to-red-orange/85 h-screen w-screen font-display font-semibold"
          >
            <Routes>{routes}</Routes>
            <AppFooter />
          </div>
        </AuthGuard>
        <Toast />
      </BrowserRouter>
    </>
  );
}
