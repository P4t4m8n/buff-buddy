import {
  EXERCISE_EQUIPMENT,
  EXERCISE_MUSCLES,
  EXERCISE_TYPES,
} from "../../../../shared/consts/exercise.consts";

import { useExerciseEdit } from "../../hooks/features/exercise/useExerciseEdit";

import Button from "../UI/Button";
import Input from "../UI/Form/Input";
import YoutubeInput from "../UI/Form/YoutubeInput";
import GenericSaveButton from "../UI/GenericSaveButton";
import SelectMultiWithSearch from "../UI/Form/SelectMultiWithSearch/SelectMultiWithSearch";
import SelectWithSearch from "../UI/Form/SelectWithSearch/SelectWithSearch";
import InputWithError from "../UI/Form/InputWithError";

import ExerciseTypeSelectItem from "./ExerciseTypeSelectItem";
import ExerciseTypeSelected from "./ExerciseTypeSelected";

import type {
  IExerciseDTO,
  TExerciseInfo,
} from "../../../../shared/models/exercise.model";
import type { IModelProps } from "../../models/UI.model";
import { useErrors } from "../../hooks/shared/useErrors";
import Loader from "../UI/loader/Loader";
import { useEffect } from "react";

interface ExerciseEditProps extends IModelProps<HTMLFormElement> {
  exerciseId?: string;
}

export default function ExerciseEdit({
  exerciseId,
  ...props
}: ExerciseEditProps) {
  const { setIsOpen, modelRef } = props;
  const { clearErrors, handleError } = useErrors<IExerciseDTO>();

  const {
    exerciseToEdit,
    saveExercise,
    mutationErrors,
    queryError,
    handleType,
    handleExerciseInfo,
    clearItem,
    isLoading,
    isSaving,
  } = useExerciseEdit({ exerciseId });

  useEffect(() => {
    if (queryError) handleError({ error: queryError,emitToToast: true });
  }, [queryError]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    clearErrors();
    try {
      const formData = new FormData(e.currentTarget);

      const { data } = await saveExercise(formData);
      if (data && setIsOpen) {
        setIsOpen(false);
      }
    } catch (error) {
      handleError({ error });
    }
  };

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    clearErrors();
    clearItem();
    if (setIsOpen) setIsOpen(false);
  };

  if (isLoading || !exerciseToEdit) {
    return <Loader loaderType="screen" isFullScreen={false} />;
  }

  const { id, muscles, equipment, type, name, youtubeUrl } =
    exerciseToEdit || {};

  const selects = [
    {
      name: "muscles",
      options: EXERCISE_MUSCLES,
      selectedOptions: muscles ?? [],
    },
    {
      name: "equipment",
      options: EXERCISE_EQUIPMENT,
      selectedOptions: equipment ?? [],
    },
  ];

  return (
    <form
      ref={modelRef}
      onSubmit={onSubmit}
      className="bg-black-500 p-4 grid gap-4 rounded w-[calc(100%-1rem)]
                   max-w-96 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 border"
    >
      <Input hidden defaultValue={id} name="id" />

      <InputWithError
        inputProps={{
          type: "text",
          name: "name",
          id: "name" + id,
          placeholder: "",
          defaultValue: name,
          className: "h-10 pl-2",
        }}
        divStyle=""
        labelProps={{
          htmlFor: "name" + id,
          children: "Exercise Name",
          isMoveUpEffect: true,
        }}
        error={mutationErrors?.name}
      />

      <YoutubeInput
        youtubeUrlProps={youtubeUrl}
        error={mutationErrors?.youtubeUrl}
        parentId={id}
      />

      {/* //INFO: Exercise Type Select */}
      <SelectWithSearch
        options={EXERCISE_TYPES}
        handleSelect={handleType}
        SelectedComponent={<ExerciseTypeSelected type={type} />}
        parentModelRef={modelRef}
        filterBy={(item) => item}
        error={mutationErrors?.type}
        SelectItemComponent={ExerciseTypeSelectItem}
      />

      {selects.map((select) => (
        <SelectMultiWithSearch
          options={select.options}
          error={mutationErrors?.[select.name as keyof IExerciseDTO]}
          parentModelRef={modelRef}
          selectedOptions={select.selectedOptions}
          inputName={select.name as TExerciseInfo}
          key={select.name}
          handleSelect={handleExerciseInfo}
          filterBy={(item) => item}
        />
      ))}

      <div className="inline-flex items-center justify-between gap-2">
        <Button type="button" buttonStyle="warning" onClick={onCancel}>
          Cancel
        </Button>
        <GenericSaveButton isSaving={isSaving} />
      </div>
    </form>
  );
}
