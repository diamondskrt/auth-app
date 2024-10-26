import { apiInstance } from '../base'

import { AuthCredentialsSchema, AuthResponseSchema } from './model'

const authUrl = '/auth'

const login = (
  credentials: AuthCredentialsSchema
): Promise<AuthResponseSchema> => {
  return apiInstance.post<AuthResponseSchema>(`${authUrl}/token`, credentials)
}

export { login }
