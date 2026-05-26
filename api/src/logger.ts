import { pino, type Logger } from 'pino'

import { environment } from './environment'

export function createLogger (name: string): Logger {
  return pino({
    name,
    level: environment.LOG_LEVEL,
    transport:
      environment.NODE_ENV === 'development'
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true
            }
          }
        : undefined
  })
}
