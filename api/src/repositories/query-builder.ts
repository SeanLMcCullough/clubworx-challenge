export type Predicate<T> = (item: T) => boolean
export type SortSelector<T> = (item: T) => any
export type SortComparitor<T> = (a: T, b: T) => number

export class QueryBuilder<T> {
  private readonly _predicates: Array<Predicate<T>> = []
  private _sortBy?: SortComparitor<T>

  private _skip?: number
  private _take?: number

  constructor (private readonly data: T[]) {}

  where (pred: Predicate<T>): this {
    this._predicates.push(pred)
    return this
  }

  paginate (page: number, perPage: number): this {
    if (page < 1) {
      throw new Error('page cannot be less than 1')
    }
    if (perPage < 1) {
      throw new Error('perPage cannot be less than 1')
    }
    this._skip = (page - 1) * perPage
    this._take = perPage
    return this
  }

  sortBy (selector: SortSelector<T>, descending: boolean = false): this {
    this._sortBy = (a: T, b: T) => {
      const aVal = selector(a)
      const bVal = selector(b)
      let result: number

      // Null last behaviour
      if (aVal == null && bVal == null) return 0
      if (aVal == null) return 1
      if (bVal == null) return -1

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        result = aVal.localeCompare(bVal)
      } else if (typeof aVal === 'number' && typeof bVal === 'number') {
        result = aVal - bVal
      } else {
        result = String(aVal).localeCompare(String(bVal))
      }

      return descending ? -result : result
    }
    return this
  }

  async execute (): Promise<T[]> {
    const matchAll: Predicate<T> = (item: T) =>
      this._predicates.every((pred) => pred(item))
    let results = this.data.filter(matchAll)

    if (this._sortBy != null) {
      results.sort(this._sortBy)
    }

    if (this._skip !== undefined && this._take !== undefined) {
      results = results.slice(this._skip, this._skip + this._take)
    }

    return await Promise.resolve(results)
  }
}
