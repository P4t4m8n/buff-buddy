import { useRef } from "react";
import type { IExerciseDTO } from "../../models/exercise.model";
import Button from "../UI/Button";
import { useModel } from "../../hooks/shared/useModel";
import IconDetails from "../UI/Icons/IconDetails";
import ModelOverlay from "../UI/ModelOverlay";
import YoutubePlayer from "../UI/YoutubePlayer";

interface ExerciseDetailsProps {
  exercise: IExerciseDTO;
}
export default function ExerciseDetails({ exercise }: ExerciseDetailsProps) {
  const modelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useModel(modelRef);
  const handleModel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const { name, muscles, equipment, types, youtubeUrl } = exercise;

  return (
    <>
      <Button
        onClick={handleModel}
        className="bg-main-black p-2 rounded  hover:bg-amber transition-all 
                 duration-300 group border-2 w-14 h-14 border-transparent hover:border-main-black cursor-pointer"
      >
        <IconDetails
          className="fill-amber stroke-none h-8 w-8
       group-hover:fill-main-black transition-all duration-300"
        />
      </Button>
      {isOpen && (
        <ModelOverlay isOpen={isOpen}>
          <div
            ref={modelRef}
            className="w-small bg-amber  p-4 grid gap-4 rounded"
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
              Cancel
            </Button>
          </div>
        </ModelOverlay>
      )}
    </>
  );
}
