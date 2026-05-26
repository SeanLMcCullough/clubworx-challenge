import z, { type ZodType } from 'zod'

export const PageResponse = <T extends ZodType>(schema: T) =>
  z.object({
    page: z.number(),
    perPage: z.number(),
    total: z.number(),
    items: z.array(schema)
  })
export type PageResponse<T extends ZodType> = z.infer<
  ReturnType<typeof PageResponse<T>>
>
