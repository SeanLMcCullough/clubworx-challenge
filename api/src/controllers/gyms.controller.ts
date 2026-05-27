import { Router } from 'express'
import type { Response } from 'express'
import fs from 'node:fs'
import z, { ZodString } from 'zod'
import validate, { type ValidatedRequest } from 'express-zod-safe'
import _ from 'lodash'

import { environment } from '../environment'
import { GymRepository } from '../repositories'
import { Gym, PageRequest, GymFilterRequest } from 'shared'
import type { PageResponse } from 'shared'

const PageGymFilterRequest = z.object({
  ...PageRequest.shape,
  ...GymFilterRequest.shape
})

export function createGymsController(): Router {
  const data = fs.readFileSync(environment.GYMS_JSON_PATH, 'utf-8')
  const gyms = z.array(Gym).parse(JSON.parse(data))
  const repository = new GymRepository(gyms)
  const router = Router()

  router.get(
    '/',
    validate({ query: PageGymFilterRequest }),
    async (
      req: ValidatedRequest<{ query: typeof PageGymFilterRequest }>,
      res: Response
    ) => {
      const {
        page,
        perPage,
        searchTerm,
        sortBy,
        sortDirection,
        isOpenToNewMembers,
        amenities
      } = req.query

      const count = await repository.count()

      const query =
        searchTerm !== undefined
          ? repository.search(searchTerm)
          : repository.query()

      if (isOpenToNewMembers !== undefined) {
        query.where((gym) => gym.isOpenToNewMembers === isOpenToNewMembers)
      }

      if (amenities !== undefined) {
        query.where((gym) =>
          amenities.every((amenity) => gym.amenities.includes(amenity))
        )
      }

      const results = await query
        .sortBy((o) => _.get(o, sortBy), sortDirection === 'desc')
        .paginate(page, perPage)
        .execute()

      const data: PageResponse<typeof Gym> = {
        page,
        perPage,
        total: count,
        items: results
      }
      res.json(data)
    }
  )

  router.get(
    '/:id',
    validate({ params: { id: z.string() } }),
    async (
      req: ValidatedRequest<{ params: { id: ZodString } }>,
      res: Response
    ) => {
      const { id } = req.params
      const gym = await repository.get(id)
      if (gym == null) {
        res.status(404).json({ message: 'Gym not found' })
        return
      }
      res.json(gym)
    }
  )

  router.patch(
    '/:id',
    validate({ body: Gym, params: { id: z.string() } }),
    async (
      req: ValidatedRequest<{ body: typeof Gym; params: { id: ZodString } }>,
      res: Response
    ) => {
      const { id } = req.params

      const gym = await repository.get(id)
      if (gym == null) {
        res.status(404).json({ message: 'Gym not found' })
        return
      }

      Object.assign(gym, req.body)

      res.json(gym)
    }
  )

  return router
}
