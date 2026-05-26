import z from 'zod'

export const Entity = z.object({
  id: z.uuid().default(() => crypto.randomUUID()),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
})
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Entity = z.infer<typeof Entity>
