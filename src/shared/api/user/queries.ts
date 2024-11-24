import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { UUID } from '../model'

import { QueryKeys } from './config'
import {
  getUsersList,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
  attachUserAbilityGroup,
  detachUserAbilityGroup,
} from './user'

const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.UsersList] })
    },
  })
}

const useGetUsersList = (queryParams?: Record<string, string>) => {
  return useQuery({
    queryKey: [QueryKeys.UsersList, queryParams],
    queryFn: () => getUsersList(queryParams),
    enabled: Boolean(queryParams),
  })
}

const useGetUserById = ({
  userId,
  queryParams,
}: {
  userId?: UUID
  queryParams?: Record<string, string>
}) => {
  return useQuery({
    queryKey: [QueryKeys.User, userId, queryParams],
    queryFn: () => getUserById({ userId, queryParams }),
    enabled: Boolean(userId),
  })
}

const useUpdateUser = () => {
  const queryClient = useQueryClient()

  const keysToInvalidate = [[QueryKeys.UsersList], [QueryKeys.User]]

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      keysToInvalidate.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key })
      })
    },
  })
}

const useAttachUserAbilityGroup = () => {
  const queryClient = useQueryClient()

  const keysToInvalidate = [[QueryKeys.UsersList], [QueryKeys.User]]

  return useMutation({
    mutationFn: attachUserAbilityGroup,
    onSuccess: () => {
      keysToInvalidate.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key })
      })
    },
  })
}

const useDetachUserAbilityGroup = () => {
  const queryClient = useQueryClient()

  const keysToInvalidate = [[QueryKeys.UsersList], [QueryKeys.User]]

  return useMutation({
    mutationFn: detachUserAbilityGroup,
    onSuccess: () => {
      keysToInvalidate.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key })
      })
    },
  })
}

const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.UsersList] })
    },
  })
}

export {
  useGetUsersList,
  useGetUserById,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
  useAttachUserAbilityGroup,
  useDetachUserAbilityGroup,
}
