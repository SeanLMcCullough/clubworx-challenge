import z from 'zod'

export const SearchRequest = z.object({
  term: z.string().min(1),
  limit: z.number().min(1).max(100).default(10)
})
export type SearchRequest = z.infer<typeof SearchRequest>
