import { useEffect } from "react";
import AuthPage from "../pages/AuthPage";
import { useAuthStore } from "../store/auth.store";
import Loader from "../components/UI/loader/Loader";
interface AuthProviderProps {
  children: React.ReactNode;
}
export default function AuthGuard({ children }: AuthProviderProps) {
  const user = useAuthStore((state) => state.user);
  const loadSessionUser = useAuthStore((state) => state.loadSessionUser);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    loadSessionUser();
  }, [loadSessionUser]);

  if (isLoading) return <Loader loaderType="screen" isFullScreen />;

  return user ? <>{children}</> : <AuthPage />;
}
