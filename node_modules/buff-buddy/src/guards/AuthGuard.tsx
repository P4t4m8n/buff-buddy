import { useEffect } from "react";
import AuthPage from "../pages/AuthPage";
import { useAuthStore } from "../store/auth.store";
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

  if (isLoading)
    return (
      <div
        className="h-screen w-screen bg-gradient-to-br from-main-orange
     via-main-orange/80 to-red-orange flex items-center justify-center"
      >
        Loading...
      </div>
    );

  return user ? <>{children}</> : <AuthPage />;
}
