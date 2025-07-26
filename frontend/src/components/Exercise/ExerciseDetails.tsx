import type { IExerciseDTO } from "../../../../shared/models/exercise.model";
import Button from "../UI/Button";
import type { IModelProps } from "../UI/GenericModel";
import YoutubePlayer from "../UI/YoutubePlayer";

interface ExerciseDetailsProps extends IModelProps<HTMLDivElement> {
  exercise: IExerciseDTO;
}
export default function ExerciseDetails({
  exercise,
  ...props
}: ExerciseDetailsProps) {
  const { name, muscles, equipment, types, youtubeUrl } = exercise;
  const { handleModel } = props;

  return (
    <div
      className="bg-amber p-4 grid gap-4 rounded w-[calc(100%-1rem)]
       max-w-96 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
    >
      <h3>{name}</h3>
      <YoutubePlayer youtubeUrl={youtubeUrl!} />
      <p>{muscles?.join(", ")}</p>
      <p>{equipment?.join(", ")}</p>
      <p>{types?.join(", ")}</p>
      <Button
        className="px-2 py-1 border rounded hover:border-red-orange
                               cursor-pointer
                               hover:text-red-orange transition-all duration-300"
        onClick={handleModel}
      >
        Close
      </Button>
    </div>
  );
}
