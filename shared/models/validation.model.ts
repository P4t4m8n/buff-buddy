import { z } from "zod";

export interface IValidation<
  DTO,
  Filter,
  TCreateOutput,
  TUpdateOutput,
  TQuery
> {
  createFactorySchema: (options: {
    toSanitize?: boolean;
  }) => z.ZodType<TCreateOutput, z.ZodTypeDef, DTO>;
  updateFactorySchema: (options: {
    toSanitize?: boolean;
  }) => z.ZodType<TUpdateOutput, z.ZodTypeDef, Partial<DTO>>;
  QuerySchema: z.ZodType<TQuery, z.ZodTypeDef, Partial<Filter>>;
}
