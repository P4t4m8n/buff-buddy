import { useEffect, useState } from "react";

import {
  EXERCISE_EQUIPMENT,
  EXERCISE_MUSCLES,
  EXERCISE_TYPES,
} from "../../../../shared/consts/exercise.consts";

import { useExerciseStore } from "../../store/exercise.store";
import { exerciseService } from "../../services/exercise.service";
import { useFormErrors } from "../../hooks/shared/useFormErrors";

import Button from "../UI/Button";
import Input from "../UI/Form/Input";
import YoutubeInput from "../UI/Form/YoutubeInput";
import GenericSaveButton from "../UI/GenericSaveButton";
import LabelWithError from "../UI/Form/LabelWithError";

import type {
  IExerciseDTO,
  TExerciseInfo,
} from "../../../../shared/models/exercise.model";
import type { IModelProps } from "../UI/GenericModel";
import SelectMultiWithSearch from "../UI/Form/SelectMultiWithSearch";
import SelectWithSearch from "../UI/Form/SelectWithSearch";
import type { ExerciseType } from "../../../../backend/prisma/generated/prisma";

interface ExerciseEditProps extends IModelProps<HTMLFormElement> {
  exercise?: IExerciseDTO;
}

export default function ExerciseEdit({
  exercise,
  ...props
}: ExerciseEditProps) {
  const [exerciseToEdit, setExerciseToEdit] = useState<
    IExerciseDTO | undefined | null
  >(null);
  const saveExercise = useExerciseStore((state) => state.saveExercise);

  const { errors, clearErrors, handleError } = useFormErrors<IExerciseDTO>();

  const { setOpen, modelRef } = props;

  useEffect(() => {
    setExerciseToEdit(() => (exercise ? exercise : exerciseService.getEmpty()));
  }, [exercise]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    clearErrors();
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
      if (res && setOpen) {
        setOpen(false);
      }
    } catch (error) {
      handleError(error);
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

  const handleType = (type: ExerciseType) => {
    setExerciseToEdit((prev) => {
      if (!prev) return prev;
      return { ...prev, type };
    });
  };

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    clearErrors();
    setExerciseToEdit(null);
    if (setOpen) setOpen(false);
  };

  const { id, muscles, equipment, type } = exerciseToEdit || {};

  const selects = [
    {
      name: "muscles",
      options: EXERCISE_MUSCLES,
      selectedOptions: muscles,
    },
    {
      name: "equipment",
      options: EXERCISE_EQUIPMENT,
      selectedOptions: equipment,
    },
  ];

  return (
    <form
      ref={modelRef}
      onSubmit={onSubmit}
      className="bg-amber p-4 grid gap-4 rounded w-[calc(100%-1rem)]
       max-w-96 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
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
        className={`w-full h-10 peer outline-offset-0 pl-2 border-1 rounded`}
        divStyle="bg-main-orange  rounded h-full border-black outline-black"
      >
        <LabelWithError
          htmlFor="name"
          error={errors?.name}
          labelText="Program Name"
        />
      </Input>
      <YoutubeInput
        youtubeUrlProps={exerciseToEdit?.youtubeUrl}
        error={errors?.youtubeUrl}
      />
      <SelectWithSearch
        options={EXERCISE_TYPES}
        selectedValue={type as ExerciseType}
        handleSelect={handleType}
        error={errors?.type}
      />
      {selects.map((select) => (
        <SelectMultiWithSearch
          key={select.name}
          error={errors?.[select.name as keyof IExerciseDTO]}
          options={select.options}
          inputName={select.name as TExerciseInfo}
          selectedOptions={select.selectedOptions}
          handleSelect={handleExerciseInfo}
          parentModelRef={modelRef}
        />
      ))}

      <div className="inline-flex items-center justify-between gap-2">
        <Button type="button" buttonStyle="warning" onClick={onCancel}>
          Cancel
        </Button>
        <GenericSaveButton useStore={useExerciseStore} itemId={id} />
      </div>
    </form>
  );
}
