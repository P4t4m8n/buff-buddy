import { useNavigate } from "react-router";

export function usePageBack() {
  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  };

  return { onBack };
}
