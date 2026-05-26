import z from 'zod'
import { randomUUID } from 'node:crypto'

export const Entity = z.object({
  id: z.uuid().default(() => randomUUID()),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
})
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Entity = z.infer<typeof Entity>
