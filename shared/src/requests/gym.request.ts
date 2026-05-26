import z from 'zod'

import { GymAmenity } from '../models'

export const GymFilterRequest = z.object({
  isOpenToNewMembers: z.stringbool().optional(),
  amenities: z
    .string()
    .transform((s) => s.split(','))
    .pipe(GymAmenity.array())
    .optional()
})
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type GymFilterRequest = z.infer<typeof GymFilterRequest>
