import { z } from 'zod'

import { UUIDSchema } from './config'

type Nullable<T> = T | null

type UUID = z.infer<typeof UUIDSchema>

export type { Nullable, UUID }
