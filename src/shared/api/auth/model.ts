import { z } from 'zod'

import { AuthCredentials, AuthResponse, AuthResponseData } from './config'

type AuthCredentialsSchema = z.infer<typeof AuthCredentials>

type AuthResponseDataSchema = z.infer<typeof AuthResponseData>

type AuthResponseSchema = z.infer<typeof AuthResponse>

export type {
  AuthCredentialsSchema,
  AuthResponseDataSchema,
  AuthResponseSchema,
}
