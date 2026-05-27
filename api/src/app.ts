import express, { type Express } from 'express'
import cors from 'cors'
import pinoHTTP from 'pino-http'

import { environment } from './environment'
import { createLogger } from './logger'
import { createGymsController } from './controllers'

export function createApp (): Express {
  const logger = createLogger('app')

  const app = express()

  app.use(cors({ origin: environment.CORS }))
  app.use(pinoHTTP({ logger }))

  app.use('/gyms', createGymsController())

  return app
}
