import { z } from 'zod'

import { UUIDSchema } from './config'

type Nullable<T> = T | null

type UUID = z.infer<typeof UUIDSchema>

type Page = {
  currentPage: number
  from: number
  lastPage: number
  perPage: number
  to: number
  total: number
}

type Meta = {
  page: Page
}

export type { Nullable, UUID, Meta }
