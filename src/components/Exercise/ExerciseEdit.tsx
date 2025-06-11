import { useEffect, useMemo, useRef, useState } from "react";
import { useModel } from "../../hooks/useModel";
import type { IExerciseDTO } from "../../models/exercise.model";
import { useExerciseStore } from "../../store/exercise.store";
import Button from "../UI/Button";
import IconEdit from "../UI/Icons/IconEdit";
import IconCreate from "../UI/Icons/IconCreate";
import ModelOverlay from "../UI/ModelOverlay";
import Input from "../UI/Form/Input";
import Label from "../UI/Form/Label";
import YoutubeInput from "../UI/Form/YoutubeInput";
import { useExerciseInfoStore } from "../../store/exerciseInfo.store";
import { exerciseService } from "../../services/exercise.service";
import SelectWithSearch from "../UI/Form/SelectWithSearch";
import {
  ExerciseInfoCategory,
  type IExerciseInfoDTO,
} from "../../models/exerciseInfo.model";
import ExerciseInfoOption from "./ExerciseInfoOption";

interface ExerciseEditProps {
  exercise?: IExerciseDTO;
}

export default function ExerciseEdit({ exercise }: ExerciseEditProps) {
  const [exerciseToEdit, setExerciseToEdit] = useState<
    IExerciseDTO | undefined | null
  >(null);
  const saveExercise = useExerciseStore((state) => state.saveExercise);
  const pending = useExerciseStore((state) => state.isLoading);
  // const error = useExerciseStore((state) => state.error);

  const muscles = useExerciseInfoStore((state) => state.getCategory("muscles"));
  const equipment = useExerciseInfoStore((state) =>
    state.getCategory("equipment")
  );
  const types = useExerciseInfoStore((state) => state.getCategory("types"));

  const modelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useModel(modelRef);
  const loadAllCategories = useExerciseInfoStore(
    (state) => state.loadAllCategories
  );

  useEffect(() => {
    setExerciseToEdit(() => (exercise ? exercise : exerciseService.getEmpty()));
    loadAllCategories();
  }, []);
  const isEdit = !!exercise?.id;

  const buttonIcon = useMemo(
    () =>
      isEdit ? (
        <IconEdit
          className="fill-amber stroke-amber h-8 w-8
       group-hover:stroke-main-black transition-all duration-300"
        />
      ) : (
        <IconCreate
          className="fill-none stroke-amber h-8 w-8
       group-hover:stroke-main-black transition-all duration-300"
        />
      ),
    [isEdit]
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name") as string;
      const youtubeUrl = formData.get("youtubeUrl") as string;
      const id = formData.get("id") as string;

      await saveExercise({ ...exerciseToEdit, name, youtubeUrl, id });
      setIsOpen((prev) => !prev);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleExerciseInfo = (exerciseInfo: IExerciseInfoDTO) => {
    if (!exerciseToEdit) return;
    const category = exerciseInfo.category;
    if (!ExerciseInfoCategory.includes(category)) return;

    setExerciseToEdit((prev) => {
      if (!prev) return prev;

      const idx = prev[category]?.findIndex((ei) => ei.id === exerciseInfo.id);
      return idx !== -1
        ? {
            ...prev,
            [category]: prev[category]?.filter(
              (ei) => ei.id !== exerciseInfo.id
            ),
          }
        : { ...prev, [category]: [...(prev[category] || []), exerciseInfo] };
    });
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
          <div ref={modelRef} className="w-small">
            <form
              onSubmit={onSubmit}
              className="bg-amber w-full p-4 grid gap-4 rounded"
            >
              <Input hidden defaultValue={exercise?.id} name="id" />

              <Input
                type="text"
                name="name"
                id="name"
                placeholder=""
                required
                pattern="^[a-zA-Z0-9\s]+$"
                title="Name should only contain letters, numbers, and spaces."
                defaultValue={exerciseToEdit?.name}
                className="w-full h-10 peer outline-offset-0  pl-2 peer"
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
              <YoutubeInput youtubeUrlProps={exerciseToEdit?.youtubeUrl} />

              <SelectWithSearch
                options={muscles}
                selectedOptions={exerciseToEdit?.muscles}
                handleSelect={handleExerciseInfo}
                parentModelRef={modelRef}
                OptionComponent={ExerciseInfoOption}
              />
              <SelectWithSearch
                options={equipment}
                selectedOptions={exerciseToEdit?.equipment}
                handleSelect={handleExerciseInfo}
                parentModelRef={modelRef}
                OptionComponent={ExerciseInfoOption}
              />
              <SelectWithSearch
                options={types}
                selectedOptions={exerciseToEdit?.types}
                handleSelect={handleExerciseInfo}
                parentModelRef={modelRef}
                OptionComponent={ExerciseInfoOption}
              />
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
