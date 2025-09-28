import { usePageBack } from "../../hooks/shared/usePageBack";
import Button from "./Button";
import IconArrow from "./Icons/IconArrow";

export default function BackButton() {
  const { onBack } = usePageBack();

  return (
    <Button
      className="border-main-orange border rounded-full w-8 aspect-auto -rotate-90"
      onClick={onBack}
    >
      <IconArrow className="w-full aspect-square fill-main-orange" />
    </Button>
  );
}
