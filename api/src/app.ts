import express from 'express'
import pinoHTTP from 'pino-http'

import { createLogger } from './logger'
import { createGymsController } from './controllers'

export function createApp() {
  const logger = createLogger('app')

  const app = express()

  app.use(pinoHTTP({ logger }))

  app.use('/gyms', createGymsController())

  return app
}
