//Constants
import {
  EXERCISE_EQUIPMENT,
  EXERCISE_MUSCLES,
  EXERCISE_TYPES,
} from "../../../../shared/consts/exercise.consts";
//Hooks
import { useExerciseEdit } from "../../hooks/features/exercise/useExerciseEdit";
//Components
import ExerciseTypeSelectItem from "./ExerciseTypeSelectItem";
import ExerciseTypeSelected from "./ExerciseTypeSelected";
//UI
import Button from "../UI/Button";
import Input from "../UI/Form/Input";
import YoutubeInput from "../UI/Form/YoutubeInput";
import GenericSaveButton from "../UI/GenericSaveButton";
import SelectMultiWithSearch from "../UI/Form/SelectMultiWithSearch/SelectMultiWithSearch";
import SelectWithSearch from "../UI/Form/SelectWithSearch/SelectWithSearch";
import InputWithError from "../UI/Form/InputWithError";
import Loader from "../UI/loader/Loader";
//Types
import type {
  IExerciseDTO,
  TExerciseInfo,
} from "../../../../shared/models/exercise.model";
import type { IModelProps } from "../../models/UI.model";

interface ExerciseEditProps extends IModelProps<HTMLFormElement> {
  exerciseId?: string;
}

export default function ExerciseEdit({
  exerciseId,
  ...props
}: ExerciseEditProps) {
  const { setIsOpen, modelRef, handleModel } = props;

  const {
    exerciseToEdit,
    isLoading,
    isSaving,
    mutationErrors,
    saveExercise,
    handleType,
    handleExerciseInfo,
  } = useExerciseEdit({ exerciseId });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const formData = new FormData(e.currentTarget);

      const isSuccess = await saveExercise(formData);
      if (isSuccess && setIsOpen) {
        setIsOpen(false);
      }
    } catch (error) {
      //INFO: The try catch block in need to let the error be caught some where. errors are handled in the mutation hook
    }
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
        <Button type="button" buttonStyle="warning" onClick={handleModel}>
          Cancel
        </Button>
        <GenericSaveButton isSaving={isSaving} />
      </div>
    </form>
  );
}
