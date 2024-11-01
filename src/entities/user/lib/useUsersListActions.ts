import dayjs from 'dayjs'
import { useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { Resource } from '~/shared/api/config'
import { UUID } from '~/shared/api/model'
import {
  useGetUsersList,
  useDeleteUser,
  useUpdateUser,
} from '~/shared/api/user'
import { DATE_FORMAT_TEMPLATE } from '~/shared/lib/date'
import { ApiDateTime } from '~/shared/lib/zod/model'

export function useUsersListActions() {
  const navigate = useNavigate()
  const location = useLocation()

  const {
    data: users,
    isPending: isGetUsersListPending,
    isError: isGetUsersListError,
    error: getUserError,
  } = useGetUsersList({
    include: `${Resource.AbilityGroups}`,
  })
  const {
    mutateAsync: updateUser,
    isPending: isUpdateUserPending,
    isError: isUpdateUserError,
    error: updateUserError,
  } = useUpdateUser()
  const {
    mutateAsync: deleteUser,
    isPending: isDeleteUserPending,
    isError: isDeleteUserError,
    error: deleteUserError,
  } = useDeleteUser()

  const isPending =
    isGetUsersListPending || isUpdateUserPending || isDeleteUserPending

  const isError = isGetUsersListError || isUpdateUserError || isDeleteUserError

  const error = getUserError || updateUserError || deleteUserError

  const onBlockUserToggle = useCallback(
    async ({ userId, block }: { userId?: UUID; block: boolean }) => {
      await updateUser({
        userId,
        data: {
          blockedAt: block
            ? (dayjs().format(DATE_FORMAT_TEMPLATE) as ApiDateTime)
            : null,
        },
      })
      toast.success(block ? 'User has been blocked' : 'User has been unblocked')
    },
    [updateUser]
  )

  const onDeleteUser = async (userId?: UUID) => {
    await deleteUser(userId)
    toast.success('user has been deleted')
    if (location.pathname === '/users') return
    navigate('/users')
  }

  useEffect(() => {
    if (!isError) return
    toast.error(error?.message)
  }, [isError, error])

  return {
    users,
    isPending,
    onBlockUserToggle,
    onDeleteUser,
  }
}
