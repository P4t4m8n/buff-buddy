import type { IExerciseDTO } from "../../../../shared/models/exercise.model";
import Button from "../UI/Button";
import YoutubePlayer from "../UI/YoutubePlayer";

interface ExerciseDetailsProps {
  exercise: IExerciseDTO;
  modelRef?: React.RefObject<HTMLDivElement | null>;
  handleModel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function ExerciseDetails({
  exercise,
  modelRef,
  handleModel,
}: ExerciseDetailsProps) {
  const { name, muscles, equipment, types, youtubeUrl } = exercise;

  return (
    <div ref={modelRef} className="w-small bg-amber  p-4 grid gap-4 rounded">
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
        Cancel
      </Button>
    </div>
  );
}
