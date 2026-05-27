import { memo } from 'react'
import type { Gym } from 'shared'

interface GymSearchResultsItemProps {
  gym: Gym
  isActive: boolean
  onSelect: (gym: Gym) => void
}

export const GymSearchResultsItem = memo(function GymSearchResultsItem({
  gym,
  isActive,
  onSelect
}: GymSearchResultsItemProps) {
  return (
    <div
      className={`p-4 cursor-pointer transition-colors ${isActive ? 'bg-blue-50 border-l-2 border-blue-500' : 'hover:bg-gray-50 border-l-2 border-transparent'}`}
      onClick={() => {
        onSelect(gym)
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight">
          {gym.businessName}
        </h3>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded shrink-0">
          {gym.gymType}
        </span>
      </div>

      <p className="text-xs text-gray-500 mb-2">{gym.address}</p>

      <div className="flex flex-col gap-0.5 mb-2">
        <p className="text-xs text-gray-600">{gym.phoneNumber}</p>
        <p className="text-xs text-gray-600">{gym.email}</p>
      </div>

      {/* <p className="text-xs text-gray-500 mb-2">
        <span className="font-medium">
          {gym.acn !== undefined ? 'ACN' : 'ABN'}:
        </span>{' '}
        {gym.acn ?? gym.abn}
      </p> */}
      <span className="font-medium">{gym.activeMemberCount}</span>

      <div className="flex flex-wrap gap-1">
        {[...gym.amenities].sort().map((amenity) => (
          <span
            key={amenity}
            className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full"
          >
            {amenity}
          </span>
        ))}
      </div>
    </div>
  )
})
