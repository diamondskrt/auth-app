import { apiInstance } from '../base'

import { UpdateUserData, UserSchema } from './model'

const version = '/v1'

const getUsers = (): Promise<UserSchema[]> => {
  return apiInstance.get<UserSchema[]>(`${version}/users`)
}

const getUserById = (userId: string): Promise<UserSchema> => {
  return apiInstance.get<UserSchema>(`${version}/users/${userId}`)
}

const updateUser = (
  userId: string,
  data: UpdateUserData
): Promise<UserSchema> => {
  return apiInstance.put<UserSchema>(`${version}/users/${userId}`, data)
}

const deleteUser = (userId: string): Promise<void> => {
  return apiInstance.delete<void>(`${version}/users/${userId}`)
}

export { getUsers, getUserById, updateUser, deleteUser }
