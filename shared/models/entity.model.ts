export interface IID {
  id?: string;
}

export interface IEntityDates {
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface IName {
  name?: string | null;
}

export interface IEntity extends IID, IEntityDates {}
