//Constants
import { EXERCISE_TYPES } from "../../../../shared/consts/exercise.consts";
//Hooks
import { useExerciseEdit } from "../../hooks/features/exercise/useExerciseEdit";
import { useMusclesQuery } from "../../hooks/features/exercise/useMusclesQuery";
import { useEquipmentsQuery } from "../../hooks/features/exercise/useEquipmentQuery";
//Components
import ExerciseTypeSelectItem from "./ExerciseTypeSelectItem";
import ExerciseTypeSelected from "./ExerciseTypeSelected";
import ExerciseEditInfoSelect from "./ExerciseEditInfoSelect";
//UI
import Button from "../UI/Button";
import Input from "../UI/Form/Input";
import YoutubeInput from "../UI/Form/YoutubeInput";
import GenericSaveButton from "../UI/GenericSaveButton";
import SelectWithSearch from "../UI/Form/SelectWithSearch/SelectWithSearch";
import InputWithError from "../UI/Form/InputWithError";
import CheckBox from "../UI/Form/CheckBox";
import Loader from "../UI/loader/Loader";
//Types
import type { IModelProps } from "../../models/model.model";

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
    console.log("🚀 ~ ExerciseEdit ~ exerciseToEdit:", exerciseToEdit)

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
  
  console.log("🚀 ~ ExerciseEdit ~ isCompounded:", isCompounded)
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
      <CheckBox
        name="isCompounded"
        id={"isCompounded"}
        defaultChecked={!!isCompounded}
        labelText="Compound Movement"
      />

      <SelectWithSearch
        options={EXERCISE_TYPES}
        handleSelect={handleType}
        SelectedComponent={<ExerciseTypeSelected type={type} />}
        parentModelRef={modelRef}
        filterBy={(item) => item}
        error={mutationErrors?.type}
        SelectItemComponent={ExerciseTypeSelectItem}
      />
      <ExerciseEditInfoSelect
        queryHook={useMusclesQuery}
        handleExerciseInfo={handleExerciseInfo}
        filter={{}}
        inputName="muscles"
        mutationError={mutationErrors?.muscles}
        parentModelRef={modelRef}
        selectedList={muscles}
      />
      <ExerciseEditInfoSelect
        queryHook={useEquipmentsQuery}
        handleExerciseInfo={handleExerciseInfo}
        filter={{}}
        inputName="equipment"
        mutationError={mutationErrors?.equipment}
        parentModelRef={modelRef}
        selectedList={equipment}
      />

      <div className="inline-flex items-center justify-between gap-2">
        <Button type="button" buttonStyle="warning" onClick={handleModel}>
          Cancel
        </Button>
        <GenericSaveButton isSaving={isSaving} />
      </div>
    </form>
  );
}
