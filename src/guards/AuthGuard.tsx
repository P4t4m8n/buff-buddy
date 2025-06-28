import { useEffect } from "react";
import AuthPage from "../pages/AuthPage";
import { useAuthStore } from "../store/auth.store";
interface AuthProviderProps {
  children: React.ReactNode;
}
export default function AuthGuard({ children }: AuthProviderProps) {
  const user = useAuthStore((state) => state.user);
  const loadSessionUser = useAuthStore((state) => state.loadSessionUser);

  useEffect(() => {
    loadSessionUser();
  }, [loadSessionUser]);

  return user ? <>{children}</> : <AuthPage />;
}
