import { Router } from 'express'
import type { Request, Response } from 'express'
import fs from 'node:fs'
import z from 'zod'
import validate, { type ValidatedRequest } from 'express-zod-safe'

import { environment } from '../environment'
import { GymRepository } from '../repositories'
import { Gym } from '../models'

import { PageRequest, SearchRequest } from '../requests'
import type { PageResponse, SearchResponse } from '../responses'

export function createGymsController(): Router {
  const data = fs.readFileSync(environment.GYMS_JSON_PATH, 'utf-8')
  const gyms = z.array(Gym).parse(JSON.parse(data))
  const repository = new GymRepository(gyms)
  const router = Router()

  router.get(
    '/',
    validate({ query: PageRequest }),
    async (
      req: ValidatedRequest<{ query: typeof PageRequest }>,
      res: Response
    ) => {
      const { page, perPage } = req.query
      const skip = (page - 1) * perPage
      const take = perPage

      const count = await repository.count()
      const results = await repository.query().paginate(skip, take).execute()

      res.json({
        page,
        perPage,
        total: count,
        items: results
      } as PageResponse<typeof Gym>)
    }
  )

  router.get(
    '/search',
    validate({ query: SearchRequest }),
    async (
      req: ValidatedRequest<{ query: typeof SearchRequest }>,
      res: Response
    ) => {
      const { term, limit } = req.query
      const items = await repository.search(term).paginate(0, limit).execute()
      res.json({
        term,
        items
      } as SearchResponse<typeof Gym>)
    }
  )

  return router
}
