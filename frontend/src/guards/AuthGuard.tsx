import { useEffect } from "react";

import { useAuthStore } from "../store/auth.store";

import AuthPage from "../pages/AuthPage";

import Loader from "../components/UI/loader/Loader";
interface AuthProviderProps {
  children: React.ReactNode;
}
export default function AuthGuard({ children }: AuthProviderProps) {
  const user = useAuthStore((state) => state.user);
  const loadSessionUser = useAuthStore((state) => state.loadSessionUser);
  const isLoadingSession = useAuthStore((state) => state.isLoadingSession);

  useEffect(() => {
    loadSessionUser();
  }, [loadSessionUser]);

  if (isLoadingSession) return <Loader loaderType="screen" isFullScreen />;

  // return user ? <>{children}</> : <AuthPage />;
  return <>{children}</> 
}
