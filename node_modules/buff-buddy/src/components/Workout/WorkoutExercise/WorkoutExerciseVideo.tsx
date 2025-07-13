import { useModel } from "../../../hooks/shared/useModel";
import Button from "../../UI/Button";
import YoutubePlayer from "../../UI/YoutubePlayer";

interface IWorkoutExerciseVideoProps {
  youtubeUrl?: string;
}

export default function WorkoutExerciseVideo({
  youtubeUrl,
}: IWorkoutExerciseVideoProps) {
  const [isOpen, , handleModel] = useModel(null);

  const buttonText = isOpen ? "Hide Video" : "Show Video";
  return (
    <>
      <Button onClick={handleModel} className="w-full">
        {buttonText}
      </Button>
      {isOpen ? <YoutubePlayer youtubeUrl={youtubeUrl} /> : null}
    </>
  );
}
