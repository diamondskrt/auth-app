import { z } from 'zod'

import { User } from './config'

type UserSchema = z.infer<typeof User>

interface UpdateUserData
  extends Omit<UserSchema, 'abilityGroups' | 'isAdmin'> {}

export type { UserSchema, UpdateUserData }
