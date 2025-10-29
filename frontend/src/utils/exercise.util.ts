import  getTempId  from "../../../shared/utils/getTempId";

import type { IExerciseDTO } from "../../../shared/models/exercise.model";

const getEmpty = (): IExerciseDTO => {
  return {
    id: getTempId(),
    name: "",
    youtubeUrl: "",
    muscles: [],
    equipment: [],
    type: null,
  };
};

export const exerciseUtil = {
  getEmpty,
};
