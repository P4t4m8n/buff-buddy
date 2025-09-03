import { useNavigate } from "react-router";

export function usePageBack() {
  const navigate = useNavigate();

  const onBack = (e?: React.MouseEvent) => {
    e?.preventDefault();
    navigate(-1);
  };

  return { onBack };
}
