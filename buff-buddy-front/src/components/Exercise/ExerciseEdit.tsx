import { useEffect, useState } from "react";
import {
  EXERCISE_EQUIPMENT,
  EXERCISE_MUSCLES,
  EXERCISE_TYPES,
  type IExerciseDTO,
  type TExerciseInfo,
} from "../../../../shared/models/exercise.model";
import { useExerciseStore } from "../../store/exercise.store";
import Button from "../UI/Button";
import Input from "../UI/Form/Input";
import Label from "../UI/Form/Label";
import YoutubeInput from "../UI/Form/YoutubeInput";
import { exerciseService } from "../../services/exercise.service";
import SelectWithSearch from "../UI/Form/SelectMultiWithSearch";

interface ExerciseEditProps {
  exercise?: IExerciseDTO;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  modelRef?: React.RefObject<HTMLDivElement | HTMLFormElement | null>;
  handleModel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ExerciseEdit({
  exercise,
  modelRef,
  setIsOpen,
  handleModel,
}: ExerciseEditProps) {
  const [exerciseToEdit, setExerciseToEdit] = useState<
    IExerciseDTO | undefined | null
  >(null);
  const saveExercise = useExerciseStore((state) => state.saveExercise);
  const pending = useExerciseStore((state) => state.isLoading);
  // const error = useExerciseStore((state) => state.error);

  useEffect(() => {
    setExerciseToEdit(() => (exercise ? exercise : exerciseService.getEmpty()));
  }, [exercise]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name") as string;
      const youtubeUrl = formData.get("youtubeUrl") as string;
      const id = formData.get("id") as string;

      const res = await saveExercise({
        ...exerciseToEdit,
        name,
        youtubeUrl,
        id,
      });
      if (res && setIsOpen) {
        setIsOpen((prev) => !prev);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleExerciseInfo = (inputName: TExerciseInfo, option: string) => {
    if (!exerciseToEdit) return;

    setExerciseToEdit((prev) => {
      if (!prev) return prev;

      const currentItems =
        (prev[inputName as keyof IExerciseDTO] as string[]) || [];
      const idx = currentItems.findIndex((item) => item === option);

      return idx !== -1
        ? {
            ...prev,
            [inputName]: currentItems.filter((item) => item !== option),
          }
        : { ...prev, [inputName]: [...currentItems, option] };
    });
  };

  return (
    <form
      ref={modelRef as React.RefObject<HTMLFormElement>}
      onSubmit={onSubmit}
      className="bg-amber p-4 grid gap-4 rounded w-[calc(100%-1rem)] max-w-96 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
    >
      <Input hidden defaultValue={exercise?.id} name="id" />

      <Input
        type="text"
        name="name"
        id="name"
        placeholder=""
        pattern="^[a-zA-Z0-9\s]+$"
        title="Name should only contain letters, numbers, and spaces."
        defaultValue={exerciseToEdit?.name}
        className="w-full h-10 peer outline-offset-0  pl-2 peer"
        divStyle="bg-main-orange border-1 rounded h-full"
      >
        <Label isMoveUpEffect={true} labelPosition="input" htmlFor="name">
          Name
        </Label>
      </Input>
      <YoutubeInput youtubeUrlProps={exerciseToEdit?.youtubeUrl} />

      <SelectWithSearch
        options={EXERCISE_MUSCLES}
        inputName="muscles"
        selectedOptions={exerciseToEdit?.muscles}
        handleSelect={handleExerciseInfo}
        parentModelRef={modelRef}
      />
      <SelectWithSearch
        options={EXERCISE_EQUIPMENT}
        inputName="equipment"
        selectedOptions={exerciseToEdit?.equipment}
        handleSelect={handleExerciseInfo}
        parentModelRef={modelRef}
      />
      <SelectWithSearch
        options={EXERCISE_TYPES}
        inputName="types"
        selectedOptions={exerciseToEdit?.types}
        handleSelect={handleExerciseInfo}
        parentModelRef={modelRef}
      />
      <div className="inline-flex items-center justify-between gap-2">
        <Button
          className="px-2 py-1 border rounded hover:border-red-orange
                   cursor-pointer
                   hover:text-red-orange transition-all duration-300"
          type="button"
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
  );
}
