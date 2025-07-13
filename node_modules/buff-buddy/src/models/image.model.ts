import type { IEntity } from "./entity.model";

export interface IImageDTO extends IEntity {
  publicId: string;
  imgUrl: string;
}
