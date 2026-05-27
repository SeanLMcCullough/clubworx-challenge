import { createApp } from './app'

import { environment } from './environment'
import { createLogger } from './logger'

const logger = createLogger('app')
const app = createApp()

app.listen(environment.PORT, () => {
  logger.info(`Server is running on port ${environment.PORT}`)
})
