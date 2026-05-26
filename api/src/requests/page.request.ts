import z from 'zod'

export const PageRequest = z.object({
  page: z.coerce.number().min(1).default(1),
  perPage: z.coerce.number().min(1).max(100).default(10)
})
export type PageRequest = z.infer<typeof PageRequest>
