import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'

import { useSearchStore, init } from '../search.store'
import { GymSearchFilters } from './GymSearchFilters'
import { GymSearchResults } from './GymSearchResults'
import GymMap from './GymSearchMap'

export function GymSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(true)
  const { gyms, activeGym } = useSearchStore()

  useEffect(() => {
    init()
  }, [])

  return (
    <div className="flex h-dvh w-full overflow-hidden relative bg-gray-50">
      <aside
        className={`
          absolute inset-y-0 left-0 z-20 lg:relative lg:w-1/3 flex flex-col
          transition-transform duration-300 ease-in-out
          bg-white border-r border-gray-200 w-80
          ${isSearchOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full pt-20 lg:pt-0 overflow-hidden">
          <GymSearchFilters />
          <GymSearchResults />
        </div>
      </aside>

      <main className="flex-1 relative h-full w-full bg-blue-50">
        <button
          className="lg:hidden absolute top-4 left-4 z-30 bg-white p-3 rounded-md shadow-md text-gray-700 hover:bg-gray-50"
          onClick={() => {
            setIsSearchOpen(true)
          }}
        >
          <Menu />
        </button>

        <div className="h-full w-full flex">
          <GymMap gyms={gyms} activeGym={activeGym} />
        </div>
      </main>

      {isSearchOpen && (
        <div
          className="lg:hidden absolute inset-0 bg-black/20 z-15"
          onClick={() => {
            setIsSearchOpen(false)
          }}
        />
      )}
    </div>
  )
}
