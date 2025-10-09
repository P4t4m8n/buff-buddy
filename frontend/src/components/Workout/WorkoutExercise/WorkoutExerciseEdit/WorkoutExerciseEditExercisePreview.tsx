import { toTitle } from "../../../../utils/toTitle";

import GenericModel from "../../../UI/GenericModel";
import YoutubePlayer from "../../../UI/YoutubePlayer";
import ExerciseListModel from "../../../Exercise/ExerciseList/ExerciseListModel";

import type { IExerciseDTO } from "../../../../../../shared/models/exercise.model";
import type { TSelectExercise } from "../../../../models/exercise.model";

interface IWorkoutExerciseEditExercisePreviewProps {
  exercise: IExerciseDTO;
  selectExercise: TSelectExercise;
}
export default function WorkoutExerciseEditExercisePreview({
  exercise,
  selectExercise,
}: IWorkoutExerciseEditExercisePreviewProps) {
  return (
    <div
      className="bg-black-500 border  p-4 grid gap-4 rounded w-full
        "
    >
      <h3>{toTitle(exercise.name)}</h3>
      <YoutubePlayer youtubeUrl={exercise.youtubeUrl!} />

      <p>{toTitle(exercise.muscles?.join(", "))}</p>
      <p>{toTitle(exercise.equipment?.join(", "))}</p>
      <p>{toTitle(exercise.type)}</p>
      <GenericModel
        Model={ExerciseListModel}
        modelProps={{ selectExercise }}
        buttonProps={{ children: "Replace" }}
        isPortal={true}
      />
    </div>
  );
}
