import { z } from 'zod'

import { UUID } from '../model'

import { UserSchema, UserUpsertSchema } from './config'

type User = z.infer<typeof UserSchema>

type UserUpsert = z.infer<typeof UserUpsertSchema>

type UserAbilityGroupAction = {
  userId: UUID
  abilityGroupIds: string[]
}

export type { User, UserUpsert, UserAbilityGroupAction }
