import z from 'zod'

const Environment = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  GYMS_JSON_PATH: z
    .string()
    .default('./data/gyms.json')
    .describe('Path to the JSON file containing gym data.')
})

const env = Environment.safeParse(process.env)

if (!env.success) {
  console.error('Invalid environment variables:')
  console.error(JSON.stringify(env.error.format(), null, 2))
  process.exit(1)
}

export type Environment = z.infer<typeof Environment>
export const environment = env.data
