import { useSearchStore, setActiveGym } from '../search.store'
import { GymSearchResultsItem } from './GymSearchResultsItem'

export function GymSearchResults() {
  const { gyms, isLoading, error, activeGym } = useSearchStore()

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-gray-500">
        Loading...
      </div>
    )
  }

  if (error !== null) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    )
  }

  if (gyms.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-gray-500">
        No gyms found
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
      {gyms.map((gym) => (
        <GymSearchResultsItem
          key={gym.id}
          gym={gym}
          isActive={activeGym?.id === gym.id}
          onSelect={setActiveGym}
        />
      ))}
    </div>
  )
}
