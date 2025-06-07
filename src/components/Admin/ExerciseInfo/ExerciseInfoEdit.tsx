import { memo, useRef } from "react";
import type {
  IExerciseInfoDTO,
  TExerciseInfoCategory,
} from "../../../models/exerciseInfo.model";
import { useModel } from "../../../hooks/useModel";
import IconEdit from "../../UI/Icons/IconEdit";
import IconCreate from "../../UI/Icons/IconCreate";
import Button from "../../UI/Button";
import ModelOverlay from "../../UI/ModelOverlay";
import Input from "../../UI/Form/Input";
import Label from "../../UI/Form/Label";
import ImageUploadInput from "../../UI/Form/ImageUploadInput";
import { useExerciseInfoStore } from "../../../store/exerciseInfo.store";

interface ExerciseInfoEditProps {
  exerciseInfo?: IExerciseInfoDTO;
  category?: TExerciseInfoCategory;
}
function ExerciseInfoEdit({ exerciseInfo, category }: ExerciseInfoEditProps) {
console.log(" ExerciseInfoEdit ~ category:", category)

  const saveItem = useExerciseInfoStore((state) => state.saveItem);
  const pending = useExerciseInfoStore((state) => state.isLoading);

  const modelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useModel(modelRef);
  const isEdit = !!exerciseInfo?.id;
  const buttonIcon = isEdit ? (
    <IconEdit
      className="fill-amber stroke-amber h-8 w-8
     group-hover:stroke-main-black transition-all duration-300"
    />
  ) : (
    <IconCreate
      className="fill-none stroke-amber h-8 w-8
     group-hover:stroke-main-black transition-all duration-300"
    />
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const fromData = new FormData(e.currentTarget);
      await saveItem(fromData);
      setIsOpen((prev) => !prev);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleModel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <Button
        onClick={handleModel}
        className="bg-main-black p-2 rounded  hover:bg-amber transition-all 
            duration-300 group border-2 w-14 h-14 border-transparent hover:border-main-black cursor-pointer"
      >
        {buttonIcon}
      </Button>
      {isOpen && (
        <ModelOverlay isOpen={isOpen}>
          <div ref={modelRef}>
            <form
              onSubmit={onSubmit}
              className="bg-amber w-small p-4 grid gap-4 rounded"
            >
              <Input
                hidden
                defaultValue={
                  exerciseInfo?.category?.toLowerCase() ||
                  category?.toLowerCase()
                }
                name="category"
              />
              <Input hidden defaultValue={exerciseInfo?.id} name="id" />
              <div className="flex h-12 items-center justify-between">
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder=""
                  required
                  pattern="^[a-zA-Z0-9\s]+$"
                  title="Name should only contain letters, numbers, and spaces."
                  defaultValue={exerciseInfo?.name}
                  className="w-full h-full peer outline-offset-0  pl-2 peer"
                  divStyle="bg-main-orange border-1 rounded h-full"
                >
                  <Label
                    className="absolute top-1/2 left-2 -translate-y-1/2 bg-inherit rounded z-10 transition-all duration-300 block
                  peer-focus:top-0 peer-focus:text-xs peer-focus:px-3 peer-focus:text-white peer-focus:font-semibold 
                  peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-3
                  peer-[:not(:placeholder-shown)]:text-white peer-[:not(:placeholder-shown)]:font-semibold  "
                    htmlFor="name"
                  >
                    Name
                  </Label>
                </Input>
                <ImageUploadInput imgUrl={exerciseInfo?.image?.imgUrl} />
              </div>
              <div className="inline-flex items-center justify-between gap-2">
                <Button
                  className="px-2 py-1 border rounded hover:border-red-orange
                cursor-pointer
                hover:text-red-orange transition-all duration-300"
                  onClick={handleModel}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  aria-disabled={pending}
                  className={`bg-inherit border-1 p-2 hover:bg-main-orange
                       hover:text-white rounded transition-all duration-300
                       hover:cursor-pointer ${pending ? "opacity-50" : ""} `}
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </ModelOverlay>
      )}
    </>
  );
}

export default memo(
  ExerciseInfoEdit,
  (prevProps, nextProps) => prevProps.exerciseInfo === nextProps.exerciseInfo && prevProps.category === nextProps.category
);
