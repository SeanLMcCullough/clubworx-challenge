import z, { type ZodType } from 'zod'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const PageResponse = <T extends ZodType>(schema: T) =>
  z.object({
    page: z.number(),
    perPage: z.number(),
    total: z.number(),
    items: z.array(schema)
  })
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type PageResponse<T extends ZodType> = z.infer<
ReturnType<typeof PageResponse<T>>
>
