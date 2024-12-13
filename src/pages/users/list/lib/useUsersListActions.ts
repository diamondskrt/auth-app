import { useEffect } from 'react'
import { toast } from 'sonner'

import { useBlockUserAction, useDeleteUserAction } from '~/entities/user'
import { Resource } from '~/shared/api/config'
import { useGetUsersList } from '~/shared/api/user'
import { useQueryParams } from '~/shared/lib/query-params'

export function useUsersListActions() {
  const { queryParams } = useQueryParams()

  const { onBlockUserToggle, isPending: isBlockUserPending } =
    useBlockUserAction()

  const { onDeleteUser, isPending: isDeleteUserPending } = useDeleteUserAction()

  const {
    data,
    isPending: isGetUsersListPending,
    isError,
    error,
  } = useGetUsersList({
    ...queryParams,
    include: `${Resource.AbilityGroups}`,
  })

  const isPending =
    isBlockUserPending || isDeleteUserPending || isGetUsersListPending

  useEffect(() => {
    if (!isError) return
    toast.error(error.message)
  }, [isError, error])

  return {
    users: data?.data,
    total: data?.meta.page.total,
    isPending,
    onBlockUserToggle,
    onDeleteUser,
  }
}
