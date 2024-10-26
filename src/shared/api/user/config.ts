import { z } from 'zod'

import { AbilityGroup } from '../ability-group'

const User = z.object({
  id: z.string().uuid().min(1),
  email: z.string().min(1),
  fullName: z.string().min(1),
  username: z.string().min(1),
  phone: z.string(),
  isAdmin: z.boolean(),
  abilityGroups: z.array(AbilityGroup),
  merchantCode: z.string().min(1),
})

export { User }
