import z from 'zod'

const Environment = z.object({
  VITE_API_URL: z.string().url().default('http://localhost:3000')
})

const env = Environment.safeParse(import.meta.env)

if (!env.success) {
  console.error('Invalid environment variables:')
  console.error(JSON.stringify(env.error, null, 2))
  throw new Error('Invalid environment variables')
}

export type Environment = z.infer<typeof Environment>
export const environment = env.data
