import Fuse from 'fuse.js'
import { QueryBuilder } from './query-builder'

import { Repository } from './repository'
import type { Gym } from '../models'

export class GymRepository extends Repository<Gym> {
  private fuse: Fuse<Gym>

  constructor(data: Gym[]) {
    super(data)
    this.fuse = new Fuse(data, {
      keys: ['businessName', 'address', 'phoneNumber', 'email']
    })
  }

  search(term: string): QueryBuilder<Gym> {
    if (!term?.trim()) return this.query()

    const results = this.fuse.search(term)
    return new QueryBuilder<Gym>(results.map((res) => res.item))
  }
}
