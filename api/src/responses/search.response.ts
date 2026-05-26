import z, { type ZodType } from 'zod'

export const SearchResponse = <T extends ZodType>(schema: T) =>
  z.object({
    term: z.string(),
    items: z.array(schema)
  })
export type SearchResponse<T extends ZodType> = z.infer<
  ReturnType<typeof SearchResponse<T>>
>
