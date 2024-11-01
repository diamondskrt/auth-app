import { z } from 'zod'

import { zDateTime } from '~/shared/lib/zod'

import { AbilityGroupSchema } from '../ability-group'
import { BaseEntity } from '../config'

const UserSchema = BaseEntity.merge(
  z.object({
    fullName: z.string().min(1),
    username: z.string().min(1),
    email: z.string().optional(),
    phone: z.string().nullable().optional(),
    password: z.string().optional(),
    isAdmin: z.boolean().optional(),
    abilityGroups: z.array(AbilityGroupSchema),
    merchantCode: z.string().min(1),
    blockedAt: zDateTime.nullable().optional(),
    blockedTo: z.string().optional(),
  })
)

const UserUpsertSchema = UserSchema.omit({
  isAdmin: true,
  blockedTo: true,
})

enum QueryKeys {
  UsersList = 'usersList',
  User = 'user',
}

export { UserSchema, UserUpsertSchema, QueryKeys }
