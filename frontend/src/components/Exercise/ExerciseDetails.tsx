//-Core
import { useEffect } from "react";
//-Util
import { toTitle } from "../../utils/toTitle";
//-Hooks
import { useExerciseIdQuery } from "../../hooks/features/exercise/useExerciseIdQuery";
import { useErrors } from "../../hooks/shared/useErrors";
//-UI
import Button from "../UI/Button";
import YoutubePlayer from "../UI/YoutubePlayer";
import Loader from "../UI/loader/Loader";
//-Types
import type { IModelProps } from "../../models/UI.model";

interface ExerciseDetailsProps extends IModelProps<HTMLDivElement> {
  exerciseId?: string;
}
export default function ExerciseDetails({
  exerciseId,
  ...props
}: ExerciseDetailsProps) {
  const { data, isLoading, error: queryError } = useExerciseIdQuery(exerciseId);
  const exercise = data?.data;
  const { handleError } = useErrors();

  useEffect(() => {
    if (queryError) handleError({ error: queryError, emitToToast: true });
  }, [queryError]);

  if (isLoading) {
    return <Loader loaderType="screen" isFullScreen={false} />;
  }

  const { name, muscles, equipment, type, youtubeUrl } = exercise ?? {};
  const { handleModel } = props;

  return (
    <div
      className="bg-black-500 border p-4 grid gap-4 rounded w-[calc(100%-1rem)]
       max-w-96 min-h-96 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
    >
      {!exercise ? (
        <p className="text-center">Exercise not found</p>
      ) : (
        <>
          <h3>{toTitle(name)}</h3>
          <YoutubePlayer youtubeUrl={youtubeUrl!} />
          <p>{toTitle(muscles?.join(", "))}</p>
          <p>{toTitle(equipment?.join(", "))}</p>
          <p>{toTitle(type)}</p>
        </>
      )}
      <Button
        className="px-2 py-1 h-fit self-end border rounded
                   hover:border-red-orange hover:text-red-orange transition-all duration-300"
        onClick={handleModel}
      >
        Close
      </Button>
    </div>
  );
}
