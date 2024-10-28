import { apiInstance } from '../api'

import { AuthCredentialsSchema, AuthResponseDataSchema } from './model'

const authUrl = '/auth'

const login = (
  credentials: AuthCredentialsSchema
): Promise<AuthResponseDataSchema> => {
  return apiInstance.post<AuthResponseDataSchema>(
    `${authUrl}/token`,
    credentials
  )
}

export { login }
