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
import { toTitle } from "../../utils/toTitle";
import type { ISelectItemComponentProps } from "../../models/select.model";
import IconPlus from "../UI/Icons/IconPlus";

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

  const handleType = (option: ExerciseType) => {
    setExerciseToEdit((prev) => {
      if (!prev) return prev;
      return { ...prev, type: option };
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
      className="bg-black-500 p-4 grid gap-4 rounded w-[calc(100%-1rem)]
       max-w-96 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
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
        divStyle="  rounded h-full border-black outline-black"
      >
        <LabelWithError
          htmlFor="name"
          error={errors?.name}
          labelText="Exercise Name"
        />
      </Input>
      <YoutubeInput
        youtubeUrlProps={exerciseToEdit?.youtubeUrl}
        error={errors?.youtubeUrl}
      />
      <SelectWithSearch
        options={EXERCISE_TYPES}
        handleSelect={handleType}
        SelectedComponent={type ? toTitle(type) : "Select a Type"}
        parentModelRef={modelRef}
        filterBy={(item) => item}
        error={errors?.type}
        SelectItemComponent={ExerciseTypeSelectItem}
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

const ExerciseTypeSelectItem = ({
  item,
  onClick,
}: ISelectItemComponentProps<ExerciseType>) => {
  return (
    <li className="w-full h-full">
      <Button
        onClick={(e) => onClick(e, item)}
        className="w-full h-full flex cursor-pointer items-center justify-between"
      >
        {item ? item : "No Type Selected"}
        <IconPlus className=" h-8 aspect-square stroke-main-black" />
      </Button>
    </li>
  );
};
