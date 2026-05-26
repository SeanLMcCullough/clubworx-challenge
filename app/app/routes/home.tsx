import type { Route } from './+types/home'
import { GymSearch } from '../features/search/components/GymSearch'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Gym Search' },
    { name: 'description', content: 'Find a Gym near you.' }
  ]
}

export default function Home() {
  return <GymSearch />
}
