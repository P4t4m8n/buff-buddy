//Constants
import { EXERCISE_TYPES } from "../../../../../shared/consts/exercise.consts";
//Hooks
import { useExerciseEdit } from "../../../hooks/features/exercise/useExerciseEdit";
import { useMusclesQuery } from "../../../hooks/features/exercise/useMusclesQuery";
import { useEquipmentsQuery } from "../../../hooks/features/exercise/useEquipmentQuery";
//Components
import ExerciseTypeSelectItem from "./ExerciseTypeSelectItem";
import ExerciseTypeSelected from "./ExerciseTypeSelected";
import ExerciseEditInfoSelect from "./ExerciseEditInfoSelect";
//UI
import Button from "../../UI/Button";
import Input from "../../UI/Form/Input";
import YoutubeInput from "../../UI/Form/YoutubeInput";
import GenericSaveButton from "../../UI/GenericSaveButton";
import SelectWithSearch from "../../UI/Form/SelectWithSearch/SelectWithSearch";
import InputWithError from "../../UI/Form/InputWithError";
import CheckBox from "../../UI/Form/CheckBox";
import Loader from "../../UI/loader/Loader";
//Types
import type { IModelProps } from "../../../models/model.model";

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
    errors,
    saveExercise,
    handleType,
    handleExerciseInfo,
    onInputChange,
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

  const { id, muscles, equipment, type, name, youtubeUrl, isCompounded } =
    exerciseToEdit || {};

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
          value: name,
          onChange: onInputChange,
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
        youtubeUrl={youtubeUrl}
        error={errors?.youtubeUrl}
        parentId={id}
        onInputChange={onInputChange}
      />
      <CheckBox
        name="isCompounded"
        id={"isCompounded"}
        defaultChecked={!!isCompounded}
        labelText="Compound Movement"
        error={errors?.isCompounded}
      />

      <SelectWithSearch
        options={EXERCISE_TYPES}
        handleSelect={handleType}
        SelectedComponent={<ExerciseTypeSelected type={type} />}
        parentModelRef={modelRef}
        filterBy={(item) => item}
        error={errors?.type}
        SelectItemComponent={ExerciseTypeSelectItem}
      />
      <ExerciseEditInfoSelect
        queryHook={useMusclesQuery}
        handleExerciseInfo={handleExerciseInfo}
        filter={{}}
        inputName="muscles"
        mutationError={errors?.muscles}
        parentModelRef={modelRef}
        selectedList={muscles}
      />
      <ExerciseEditInfoSelect
        queryHook={useEquipmentsQuery}
        handleExerciseInfo={handleExerciseInfo}
        filter={{}}
        inputName="equipment"
        mutationError={errors?.equipment}
        parentModelRef={modelRef}
        selectedList={equipment}
      />

      <div className="grid grid-cols-2 gap-8">
        <Button
          type="button"
          buttonStyle="warning"
          className="w-full"
          onClick={handleModel}
        >
          Cancel
        </Button>
        <GenericSaveButton isSaving={isSaving} />
      </div>
    </form>
  );
}
