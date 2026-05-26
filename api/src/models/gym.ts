import z from 'zod'

import { Entity } from './entity'

export const MembershipInterval = z.enum(['weekly', 'monthly', 'yearly'])
export type MembershipInterval = z.infer<typeof MembershipInterval>

export const GymAmenity = z.enum([
  '24/7',
  'Air Conditioning',
  'Cafe',
  'Childcare',
  'Classes',
  'Free Parking',
  'Ice Bath',
  'Lockers',
  'Massage Therapy',
  'Paid Parking',
  'Personal Training',
  'Physiotherapy',
  'Plunge Pool',
  'Pool',
  'Sauna',
  'Shop',
  'Showers',
  'Wi-Fi'
])
export type GymAmenity = z.infer<typeof GymAmenity>

export const GymType = z.enum([
  'Bouldering',
  'Boutique',
  'Commercial',
  'Crossfit',
  'Pilates',
  'Powerlifting',
  'Yoga'
])
export type GymType = z.infer<typeof GymType>

export const Gym = z.object({
  ...Entity.shape,
  gymType: GymType,
  businessName: z.string(),
  abn: z.string().length(11).regex(/^\d+$/),
  acn: z.string().length(9).regex(/^\d+$/).optional(),
  phoneNumber: z.string(),
  email: z.email(),
  address: z.string().describe('Formatted street address.'),
  location: z.tuple([z.number(), z.number()]).describe('Latitude, Longitude'),
  employeeCount: z.number().positive(),
  capacity: z.number().positive(),
  membershipPrice: z.number().positive(),
  membershipInterval: MembershipInterval,
  activeMemberCount: z.number(),
  isOpenToNewMembers: z.boolean(),
  amenities: z
    .array(GymAmenity)
    .refine((items) => new Set(items).size === items.length, {
      message: 'Amenities must be unique'
    })
})
export type Gym = z.infer<typeof Gym>
