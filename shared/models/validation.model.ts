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
  }) => z.ZodType<TCreateOutput, DTO>;
  updateFactorySchema: (options: {
    toSanitize?: boolean;
  }) => z.ZodType<TUpdateOutput, Partial<DTO>>;
  QuerySchema: z.ZodType<TQuery, Partial<Filter>>;
}
