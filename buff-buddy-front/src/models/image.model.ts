import type { IEntity } from "../../../shared/models/entity.model";

export interface IImageDTO extends IEntity {
  publicId: string;
  imgUrl: string;
}
