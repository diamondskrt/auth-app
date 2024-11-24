import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { useUsersListActions } from '~/entities/user'
import { Resource } from '~/shared/api/config'
import { useGetUserById } from '~/shared/api/user'

export function useShowUserActions() {
  const { id } = useParams<{ id: string }>()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const {
    isPending: isUserActionPending,
    onBlockUserToggle,
    onDeleteUser,
  } = useUsersListActions()

  const {
    data,
    isPending: isGetUserByIdPending,
    isError,
    error,
  } = useGetUserById({
    userId: id,
    queryParams: {
      include: `${Resource.AbilityGroups}`,
    },
  })

  const isPending = isUserActionPending || isGetUserByIdPending

  useEffect(() => {
    if (!isError) return
    toast.error(error.message)
  }, [isError, error])

  return {
    user: data?.data,
    isPending,
    onBlockUserToggle,
    isConfirmOpen,
    setIsConfirmOpen,
    onDeleteUser,
  }
}
