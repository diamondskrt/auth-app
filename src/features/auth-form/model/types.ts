import { z } from 'zod'

import { AuthCredentials, AuthResponseSchema } from '~/shared/api/auth'

type formSchema = z.infer<typeof AuthCredentials>

type SetTokenParams = Pick<
  AuthResponseSchema['data'],
  | 'accessToken'
  | 'accessTokenExpiresAt'
  | 'refreshToken'
  | 'refreshTokenExpiresAt'
>

export type { formSchema, SetTokenParams }
