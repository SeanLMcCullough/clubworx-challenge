import { createApp } from './app'

import { environment } from './environment'

const app = createApp()

app.listen(environment.PORT, () => {
  console.log(`Server is running on port ${environment.PORT}`)
})
