import { BrowserRouter, Routes } from "react-router";
import AppFooter from "./components/AppFooter/AppFooter";
import { renderRoutes, ROUTES } from "./routes";
import AuthGuard from "./guards/AuthGuard";
import Toast from "./components/UI/Toast/Toast";
import { QueryClientWrapper } from "./lib/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRef } from "react";
import { RootRefContext } from "./hooks/context/rootRefContext";

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
                className="background w-screen font-display font-semibold text-main-orange grid gap-2 "
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
