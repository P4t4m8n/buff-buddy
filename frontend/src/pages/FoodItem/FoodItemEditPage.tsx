//Lib
import { useParams } from "react-router";
import { useRef } from "react";
//Hooks
import { usePageBack } from "../../hooks/shared/usePageBack";
//Components
import FoodItemEdit from "../../components/FoodItem/FoodItemEdit/FoodItemEdit";
import ModelOverlay from "../../components/UI/ModelOverlay";

export default function FoodItemEditPage() {
  const { foodItemId } = useParams<{ foodItemId?: string }>();
  const { navBack, onBack } = usePageBack();
  const modelRef = useRef<HTMLFormElement>(null);

  return (
    <ModelOverlay isOpen={true}>
      <FoodItemEdit
        foodItemId={foodItemId}
        modelRef={modelRef}
        setIsOpen={navBack}
        handleModel={onBack}
      />
      ;
    </ModelOverlay>
  );
}
