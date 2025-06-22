import type { IExerciseDTO, IExerciseFilter } from "../models/exercise.model";
import { storageService } from "./async-storage.service";

export const exerciseService = {
  rootPath: "/exercise",

  async get(filter: IExerciseFilter): Promise<Array<IExerciseDTO>> {
    return await storageService.get<IExerciseDTO>("exercise", filter);
  },

  async getById(id: string) {
    return await storageService.getById<IExerciseDTO>("exercise", id);
  },

  async save(dto: IExerciseDTO): Promise<IExerciseDTO> {
    return dto.id
      ? await storageService.put<IExerciseDTO>("exercise", dto)
      : await storageService.post<IExerciseDTO>("exercise", dto);
  },

  async delete(id: string): Promise<void> {
    return storageService.remove("exercise", id);
  },

  getEmpty(): IExerciseDTO {
    return {
      id: "",
      name: "",
      youtubeUrl: "",
      muscles: [],
      equipment: [],
      types: [],
    };
  },
};

//TODO:Improve ID checking
// const dtoToEditDto = (dto: IExerciseDTO): IExerciseDTO => {
//   return {
//     id: dto.id,
//     name: dto.name,
//     youtubeUrl: dto.youtubeUrl,
//     exerciseMusclesId: dto.muscles?.map((m) => m.id!),
//     exerciseEquipmentId: dto.equipment?.map((e) => e.id!),
//     exerciseTypesId: dto.types?.map((t) => t.id!),
//   };
// };

//Temp till connected to backend. will return regular dto from backend
// const editDtoToDto = async (
//   dto: IExerciseDTO[]
// ): Promise<IExerciseDTO[]> => {
//   const muscles = await storageService.get<IExerciseInfoDTO>("muscles");
//   const equipment = await storageService.get<IExerciseInfoDTO>("equipment");
//   const types = await storageService.get<IExerciseInfoDTO>("types");
//   return dto.map((d) => {
//     return {
//       id: d.id,
//       name: d.name,
//       youtubeUrl: d.youtubeUrl,
//       muscles: muscles.filter((m) => d.exerciseMusclesId?.includes(m.id!)),
//       equipment: equipment.filter((e) =>
//         d.exerciseEquipmentId?.includes(e.id!)
//       ),
//       types: types.filter((t) => d.exerciseTypesId?.includes(t.id!)),
//     };
//   });
// };
