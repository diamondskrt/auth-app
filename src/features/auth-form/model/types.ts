import { z } from 'zod'

import { AuthCredentialsSchema, AuthResponseData } from '~/shared/api/auth'

type formSchema = z.infer<typeof AuthCredentialsSchema>

type SetTokenParams = Pick<
  AuthResponseData,
  | 'accessToken'
  | 'accessTokenExpiresAt'
  | 'refreshToken'
  | 'refreshTokenExpiresAt'
>

export type { formSchema, SetTokenParams }
