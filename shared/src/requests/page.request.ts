import z from 'zod'

export const PageRequest = z.object({
  page: z.coerce.number().min(1).default(1),
  perPage: z.coerce.number().min(1).max(100).default(10),
  searchTerm: z.string().optional(),
  sortBy: z.string().optional().default('createdAt'),
  sortDirection: z.enum(['asc', 'desc']).default('asc'),
  filters: z.record(z.string(), z.any()).optional().default({}) // unused for now, didn't have enough time to implement
})
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type PageRequest = z.infer<typeof PageRequest>
