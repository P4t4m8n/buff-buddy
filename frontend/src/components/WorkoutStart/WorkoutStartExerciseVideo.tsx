import { useModel } from "../../hooks/shared/useModel";
import Button from "../UI/Button";
import YoutubePlayer from "../UI/YoutubePlayer";

interface IWorkoutStartExerciseVideoProps {
  youtubeUrl?: string | null;
}

export default function WorkoutStartExerciseVideo({
  youtubeUrl,
}: IWorkoutStartExerciseVideoProps) {
  const { isOpen, handleModel } = useModel();

  const buttonText = isOpen ? "Hide Video" : "Show Video";
  return (
    <>
      <Button onClick={handleModel} className="w-full pt-2">
        {buttonText}
      </Button>
      {isOpen ? <YoutubePlayer youtubeUrl={youtubeUrl} /> : null}
    </>
  );
}
