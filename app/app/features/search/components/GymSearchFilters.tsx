import { GymAmenity } from 'shared'

import { useSearchStore, search } from '../search.store'

const sortFields = [
  { value: 'businessName', label: 'Business Name' },
  { value: 'gymType', label: 'Type' },
  { value: 'membershipPrice', label: 'Price' },
  { value: 'activeMemberCount', label: 'Active Members' },
  { value: 'employeeCount', label: 'Employees' },
  { value: 'createdAt', label: 'Date Added' }
] as const

export function GymSearchFilters() {
  const { params } = useSearchStore()

  function toggleAmenity(amenity: GymAmenity): void {
    const next = params.amenities.includes(amenity)
      ? params.amenities.filter((a) => a !== amenity)
      : [...params.amenities, amenity]
    search({ amenities: next })
  }

  return (
    <form
      className="flex flex-col gap-4 p-4 border-b border-gray-200"
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <input
        type="text"
        placeholder="Search gyms..."
        value={params.searchTerm}
        onChange={(e) => {
          search({ searchTerm: e.target.value })
        }}
        className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
        <input
          type="checkbox"
          checked={params.isOpenToNewMembers === true}
          onChange={(e) => {
            search({ isOpenToNewMembers: e.target.checked ? true : undefined })
          }}
          className="rounded"
        />
        Open to new members
      </label>

      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
          Amenities
        </p>
        <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
          {GymAmenity.options.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={params.amenities.includes(amenity)}
                onChange={() => {
                  toggleAmenity(amenity)
                }}
                className="rounded"
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <select
          value={params.sortBy}
          onChange={(e) => {
            search({ sortBy: e.target.value })
          }}
          className="flex-1 px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {sortFields.map((field) => (
            <option key={field.value} value={field.value}>
              {field.label}
            </option>
          ))}
        </select>

        <div className="flex rounded-md overflow-hidden border border-gray-300">
          <button
            type="button"
            onClick={() => {
              search({ sortDirection: 'asc' })
            }}
            className={`px-3 py-2 text-sm ${params.sortDirection === 'asc' ? 'bg-blue-500 text-black' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            Asc
          </button>
          <button
            type="button"
            onClick={() => {
              search({ sortDirection: 'desc' })
            }}
            className={`px-3 py-2 text-sm border-l border-gray-300 ${params.sortDirection === 'desc' ? 'bg-blue-500 text-black' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            Desc
          </button>
        </div>
      </div>
    </form>
  )
}
