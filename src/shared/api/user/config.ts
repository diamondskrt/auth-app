import { z } from 'zod'

import { BaseEntity } from '../base'

enum Role {
  Admin = 'admin',
  Merchant = 'merchant',
  Operator = 'operator',
  Worker = 'worker',
}

const User = BaseEntity.merge(
  z.object({
    email: z.string().min(1),
    fullName: z.string().min(1),
    username: z.string().min(1),
    phone: z.string(),
    isAdmin: z.boolean(),
    abilityGroups: z.array(z.nativeEnum(Role)),
    merchantCode: z.string().min(1),
  })
)

export { User, Role }
