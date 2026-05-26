export type Predicate<T> = (item: T) => boolean
export type SortComparitor<T> = (a: T, b: T) => number

export class QueryBuilder<T> {
  private _predicates: Predicate<T>[] = []
  private _sortBy?: SortComparitor<T>

  private _skip?: number
  private _take?: number

  constructor(private data: T[]) {}

  where(pred: Predicate<T>): this {
    this._predicates.push(pred)
    return this
  }

  paginate(skip: number, take: number): this {
    if (skip < 0) {
      throw new Error('skip cannot be negative')
    }
    if (take < 0) {
      throw new Error('take cannot be negative')
    }
    this._skip = skip
    this._take = take
    return this
  }

  execute(): Promise<T[]> {
    const matchAll = (item: T) => this._predicates.every((pred) => pred(item))
    let results = this.data.filter(matchAll)

    if (this._sortBy) {
      results.sort(this._sortBy)
    }

    if (this._skip && this._take) {
      results = results.slice(this._skip, this._skip + this._take)
    }

    return Promise.resolve(results)
  }
}
