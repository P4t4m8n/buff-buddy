export interface IApiService<Model, CreateInput, UpdateInput, TQuery> {
  get: (filter: TQuery, userId?: string) => Promise<Model[]>;
  getById: (id: string, userId?: string) => Promise<Model | null>;
  create: (dto: CreateInput) => Promise<Model>;
  update: (id: string, dto: UpdateInput) => Promise<Model>;
  remove: (id: string) => Promise<void | null | Model>;
}
