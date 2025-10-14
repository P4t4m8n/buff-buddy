import type { IID } from "../../../shared/models/entity.model";

export interface IImageDTO extends IID {
  publicId: string;
  imgUrl: string;
}
