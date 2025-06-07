import type {
  IExerciseInfoDTO,
  IExerciseInfoEditDTO,
  IExerciseInfoFilter,
  TExerciseInfoCategory,
} from "../models/exerciseInfo.model";
import type { IImageDTO } from "../models/image.model";
import { storageService } from "./async-storage.service";
// import { apiService } from "./http.service";

export const exerciseInfoService = {
  rootPath: "/exercise/exercise-info",

  async get(type: TExerciseInfoCategory, filter?: IExerciseInfoFilter) {
    return await storageService.get<Array<IExerciseInfoDTO>>(type, filter);
    // return await apiService.get<Array<IExerciseInfoDTO>>(
    //   `${this.rootPath}/${type}`,
    //   filter,
    // )
  },

  async getById(type: TExerciseInfoCategory, id: string) {
    return await storageService.getById<IExerciseInfoEditDTO>(type, id);
    // return await apiService.get<IExerciseInfoEditDTO>(
    //   `${this.rootPath}/${type}/${id}`
    // );
  },

  async save(formData: FormData) {
    const dtoToSave = formDataToEditDto(formData);

  if (dtoToSave.file) {
    const imgUrl = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(dtoToSave.file!);
    });

    const image: IImageDTO = {
      imgUrl,
      publicId: dtoToSave.file.name || "",
    };

    delete dtoToSave.file;
    dtoToSave.image = image;
  }
    return dtoToSave.id
      ? storageService.put<IExerciseInfoEditDTO>(dtoToSave.category, dtoToSave)
      : storageService.post<IExerciseInfoEditDTO>(
          dtoToSave.category,
          dtoToSave
        );

    // const path = `${this.rootPath}/${category}/edit`;
    // if (!id) {
    //   return await apiService.post<IExerciseInfoEditDTO>(path, formData);
    // } else {
    //   return await apiService.put<IExerciseInfoEditDTO>(
    //     `${path}/${id}`,
    //     formData
    //   );
    // }
  },

  async delete(type: TExerciseInfoCategory, id: string) {
    return await storageService.remove<IExerciseInfoEditDTO>(type, id);
    // return await apiService.delete(`${this.rootPath}/${type}/${id}`);
  },
};

const formDataToEditDto = (formData: FormData): IExerciseInfoEditDTO => {
  const name = formData.get("name") as string;
  const category = formData.get("category") as TExerciseInfoCategory;
  const file = formData.get("image") as File | null;
  const id = formData.get("id") as string;

  return {
    id,
    name,
    category,
    file,
  };
};
