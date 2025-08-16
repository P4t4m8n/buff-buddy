import {
  EXERCISE_EQUIPMENT,
  EXERCISE_MUSCLES,
  EXERCISE_TYPES,
} from "../../../../shared/consts/exercise.consts";

import { useExerciseStore } from "../../store/exercise.store";
import { useExerciseEdit } from "../../hooks/features/exercise/useExerciseEdit";

import Button from "../UI/Button";
import Input from "../UI/Form/Input";
import YoutubeInput from "../UI/Form/YoutubeInput";
import GenericSaveButton from "../UI/GenericSaveButton";
import SelectMultiWithSearch from "../UI/Form/SelectMultiWithSearch/SelectMultiWithSearch";
import SelectWithSearch from "../UI/Form/SelectWithSearch";
import InputWithError from "../UI/Form/InputWithError";

import ExerciseTypeSelectItem from "./ExerciseTypeSelectItem";
import ExerciseTypeSelected from "./ExerciseTypeSelected";

import type {
  IExerciseDTO,
  TExerciseInfo,
} from "../../../../shared/models/exercise.model";
import type { IModelProps } from "../UI/GenericModel";

interface ExerciseEditProps extends IModelProps<HTMLFormElement> {
  exercise?: IExerciseDTO;
}

export default function ExerciseEdit({
  exercise,
  ...props
}: ExerciseEditProps) {
  const { setIsOpen, modelRef } = props;

  const {
    exerciseToEdit,
    onSubmit,
    errors,
    handleType,
    handleExerciseInfo,
    onCancel,
  } = useExerciseEdit(exercise, setIsOpen);

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
        error={errors?.name}
      />

      <YoutubeInput
        youtubeUrlProps={youtubeUrl}
        error={errors?.youtubeUrl}
        parentId={id}
      />

      {/* //INFO: Exercise Type Select */}
      <SelectWithSearch
        options={EXERCISE_TYPES}
        handleSelect={handleType}
        SelectedComponent={<ExerciseTypeSelected type={type} />}
        parentModelRef={modelRef}
        filterBy={(item) => item}
        error={errors?.type}
        SelectItemComponent={ExerciseTypeSelectItem}
      />

      {selects.map((select) => (
        <SelectMultiWithSearch
          options={select.options}
          error={errors?.[select.name as keyof IExerciseDTO]}
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
        <GenericSaveButton useStore={useExerciseStore} itemId={id} />
      </div>
    </form>
  );
}
