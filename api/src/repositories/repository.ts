import type { Entity } from '../models/entity'
import { QueryBuilder } from './query-builder'

export abstract class Repository<T extends Entity> {
  protected data: T[] = []

  constructor(data: T[]) {
    this.data = data
  }

  count(): Promise<number> {
    return Promise.resolve(this.data.length)
  }

  all(): Promise<T[]> {
    return Promise.resolve([])
  }

  get(id: string): Promise<T> {
    const entity = this.data.find((entity) => entity.id === id)
    if (!entity) {
      return Promise.reject(`Entity with id ${id} not found`)
    }
    return Promise.resolve(entity)
  }

  query(): QueryBuilder<T> {
    return new QueryBuilder<T>(this.data)
  }

  abstract search(query: string): QueryBuilder<T>
}
