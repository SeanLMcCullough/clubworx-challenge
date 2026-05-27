import { useSyncExternalStore } from 'react'
import { Gym, type GymAmenity, PageResponse } from 'shared'
import { environment } from '../../environment'

interface SearchParams {
  searchTerm: string
  sortBy: string
  sortDirection: 'asc' | 'desc'
  isOpenToNewMembers: boolean | undefined
  amenities: GymAmenity[]
  page: number
  perPage: number
}

interface SearchState {
  gyms: Gym[]
  total: number
  activeGym: Gym | null
  isLoading: boolean
  error: string | null
  params: SearchParams
}

const defaultParams: SearchParams = {
  searchTerm: '',
  sortBy: 'businessName',
  sortDirection: 'asc',
  isOpenToNewMembers: undefined,
  amenities: [],
  page: 1,
  perPage: 50
}

let state: SearchState = {
  gyms: [],
  total: 0,
  activeGym: null,
  isLoading: false,
  error: null,
  params: defaultParams
}

const listeners = new Set<() => void>()

function notify(): void {
  listeners.forEach((l) => {
    l()
  })
}

function setState(_state: Partial<SearchState>): void {
  state = { ...state, ..._state }
  notify()
}

async function fetchGyms(): Promise<void> {
  const {params} = state
  setState({ isLoading: true, error: null })

  try {
    const url = new URL('/gyms', environment.VITE_API_URL)

    url.searchParams.set('page', String(params.page))
    url.searchParams.set('perPage', String(params.perPage))

    url.searchParams.set('sortBy', params.sortBy)
    url.searchParams.set('sortDirection', params.sortDirection)

    if (params.searchTerm !== '')
      {url.searchParams.set('searchTerm', params.searchTerm)}

    if (params.isOpenToNewMembers !== undefined) {
      url.searchParams.set(
        'isOpenToNewMembers',
        String(params.isOpenToNewMembers)
      )
    }
    if (params.amenities.length > 0) {
      url.searchParams.set('amenities', params.amenities.join(','))
    }

    const response = await fetch(url.toString())
    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const data = PageResponse(Gym).parse(await response.json())
    setState({ gyms: data.items, total: data.total, isLoading: false })
  } catch (e) {
    setState({
      isLoading: false,
      error: e instanceof Error ? e.message : 'Something went wrong'
    })
  }
}

let debounce: ReturnType<typeof setTimeout> | null = null

export function init(): void {
  void fetchGyms()
}

export function search(params: Partial<SearchParams>): void {
  setState({ params: { ...state.params, ...params } })

  if (debounce !== null) clearTimeout(debounce)

  debounce = setTimeout(() => {
    void fetchGyms()
  }, 300)
}

export function setActiveGym(gym: Gym | null): void {
  setState({ activeGym: gym })
}

export function useSearchStore(): SearchState {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
    () => state
  )
}
