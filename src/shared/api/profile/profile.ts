import { apiInstance } from '../api'

import { ProfileSchema } from './model'

const version = '/v1'

const getProfile = (): Promise<ProfileSchema> => {
  return apiInstance.get<ProfileSchema>(`${version}/profile`)
}

export { getProfile }
