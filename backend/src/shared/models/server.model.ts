export interface IApiService<Model, CreateInput, UpdateInput, TQuery> {
  get: (filter: TQuery, userId?: string) => Promise<TGetReturn<Model>>;
  getById: (id: string, userId?: string) => Promise<Model | null>;
  create: (dto: CreateInput) => Promise<Model>;
  update: (id: string, dto: UpdateInput) => Promise<Model>;
  remove: (id: string, userId?: string) => Promise<void | null | Model>;
}

export type TGetReturn<Model> = [data: Model[], number];
