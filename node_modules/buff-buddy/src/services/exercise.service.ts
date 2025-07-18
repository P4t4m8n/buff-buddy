import type { IExerciseDTO, IExerciseFilter } from "../../../shared/models/exercise.model";
import { apiService, type THttpPostResponse } from "./api.service";

export const exerciseService = {
  rootPath: "/exercises",

  async get(filter: IExerciseFilter): Promise<Array<IExerciseDTO>> {
    return await apiService.get<Array<IExerciseDTO>>(
      `${this.rootPath}`,
      filter
    );
  },

  async getById(id: string) {
    return await apiService.get<IExerciseDTO>(`${this.rootPath}/${id}`);
  },

  async save(dto: IExerciseDTO): Promise<THttpPostResponse<IExerciseDTO>> {
    return dto.id
      ? await apiService.put<THttpPostResponse<IExerciseDTO>>(
          `${this.rootPath}/edit/${dto.id}`,
          dto
        )
      : await apiService.post<THttpPostResponse<IExerciseDTO>>(
          `${this.rootPath}/edit`,
          dto
        );
  },

  async delete(id: string): Promise<void> {
    return await apiService.delete<void>(`${this.rootPath}/${id}`);
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

//TODO??Improve ID checking
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
