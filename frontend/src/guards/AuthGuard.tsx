import { useEffect } from "react";

import { useAuthStore } from "../store/auth.store";

import AuthPage from "../pages/AuthPage";

import Loader from "../components/UI/loader/Loader";
import { useSession } from "../hooks/features/auth/useSession";
interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthProviderProps) {
  const { isLoading, data } = useSession();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    setUser(data?.data);
  }, [data]);
  

  if (isLoading) return <Loader loaderType="screen" isFullScreen />;

  return user ? <>{children}</> : <AuthPage />;
}
