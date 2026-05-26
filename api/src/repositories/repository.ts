import type { Entity } from '../models/entity'
import { QueryBuilder } from './query-builder'

export abstract class Repository<T extends Entity> {
  protected data: T[] = []

  constructor (data: T[]) {
    this.data = data
  }

  async count (): Promise<number> {
    return await Promise.resolve(this.data.length)
  }

  async all (): Promise<T[]> {
    return await Promise.resolve([])
  }

  async get (id: string): Promise<T | null> {
    const entity = this.data.find((entity) => entity.id === id)
    return await Promise.resolve(entity ?? null)
  }

  query (): QueryBuilder<T> {
    return new QueryBuilder<T>(this.data)
  }

  abstract search (query: string): QueryBuilder<T>
}
