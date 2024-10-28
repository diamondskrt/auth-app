import { z } from 'zod'

import { AuthCredentials, AuthResponseData } from './config'

type AuthCredentialsSchema = z.infer<typeof AuthCredentials>

type AuthResponseDataSchema = z.infer<typeof AuthResponseData>

export type { AuthCredentialsSchema, AuthResponseDataSchema }
