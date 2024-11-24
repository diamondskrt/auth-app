import { apiInstance } from '../base'

import { AuthCredentials, AuthResponseData } from './model'

const authUrl = '/auth'

const login = (credentials: AuthCredentials) => {
  return apiInstance.post<AuthResponseData>(`${authUrl}/token`, credentials)
}

export { login }
