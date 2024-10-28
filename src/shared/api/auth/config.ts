import { z } from 'zod'

import { AbilityGroup } from '../ability-group'

const AuthCredentials = z.object({
  username: z.string().min(2),
  password: z.string().min(5),
})

const AuthResponseData = z.object({
  abilityGroups: z.array(AbilityGroup),
  merchantCode: z.string().min(1),
  phone: z.string(),
  accessToken: z.string().min(1),
  accessTokenExpiresAt: z.string().min(1),
  refreshToken: z.string().min(1),
  refreshTokenExpiresAt: z.string().min(1),
})

export { AuthCredentials, AuthResponseData }
