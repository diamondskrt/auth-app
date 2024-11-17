import { apiInstance } from '../base'
import { Resource } from '../config'
import { convertData } from '../lib'
import { UUID } from '../model'

import { UserAbilityGroupAction, User, UserUpsert } from './model'

const version = '/v1'

const getUsersList = (
  queryParams?: Record<string, string>
): Promise<User[]> => {
  return apiInstance.get<User[]>({
    endpoint: `${version}/users`,
    deserialize: true,
    params: queryParams,
  })
}

const getUserById = ({
  userId,
  queryParams,
}: {
  userId?: UUID
  queryParams?: Record<string, string>
}): Promise<User> | undefined => {
  if (!userId) return
  return apiInstance.get<User>({
    endpoint: `${version}/users/${userId}`,
    deserialize: true,
    params: queryParams,
  })
}

const createUser = (data: UserUpsert) => {
  return apiInstance.post<User>(
    `${version}/users`,
    convertData({ resource: Resource.Users, data })
  )
}

const updateUser = ({
  userId,
  data,
}: {
  userId: UUID
  data: Partial<UserUpsert>
}): Promise<User> => {
  return apiInstance.patch<User>(
    `${version}/users/${userId}`,
    convertData({ resource: Resource.Users, data, id: userId })
  )
}

const deleteUser = (userId?: UUID): Promise<void> => {
  return apiInstance.delete<void>(`${version}/users/${userId}`)
}

const attachUserAbilityGroup = (data: UserAbilityGroupAction) => {
  return apiInstance.post<User>(
    `${version}/users/${data.userId}/actions/ability-group/attach`,
    data
  )
}

const detachUserAbilityGroup = async (data: UserAbilityGroupAction) => {
  return apiInstance.post<User>(
    `${version}/users/${data.userId}/actions/ability-group/detach`,
    data
  )
}

export {
  getUsersList,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  attachUserAbilityGroup,
  detachUserAbilityGroup,
}
