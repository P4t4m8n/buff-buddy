//Lib
import { BrowserRouter, Routes } from "react-router";
import { renderRoutes, ROUTES } from "./routes";
import { QueryClientWrapper } from "./lib/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRef } from "react";
//Context
import { RootRefContext } from "./hooks/context/x";
//Components
import AppFooter from "./components/AppFooter/AppFooter";
//Guards
import AuthGuard from "./guards/AuthGuard";
//UI
import Toast from "./components/UI/Toast/Toast";

export default function App() {
  const routes = renderRoutes(ROUTES);
  const rootRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <QueryClientWrapper>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <AuthGuard>
            <RootRefContext value={rootRef}>
              <div
                ref={rootRef}
                className="bg-black-900 w-screen font-display font-semibold text-main-orange grid"
              >
                <Routes>{routes}</Routes>
                <AppFooter />
              </div>
            </RootRefContext>
          </AuthGuard>
          <Toast />
        </BrowserRouter>
      </QueryClientWrapper>
    </>
  );
}
