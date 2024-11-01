import { apiInstance } from '../base'

import { Profile } from './model'

const version = '/v1'

const getProfile = (): Promise<Profile> => {
  return apiInstance.get<Profile>({ endpoint: `${version}/profile` })
}

export { getProfile }
