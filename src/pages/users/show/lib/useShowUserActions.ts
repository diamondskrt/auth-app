import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { useBlockUserAction, useDeleteUserAction } from '~/entities/user'
import { Resource } from '~/shared/api/config'
import { useGetUserById } from '~/shared/api/user'
import { errorMessage } from '~/shared/config'

export function useShowUserActions() {
  const { id } = useParams<{ id: string }>()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const { onBlockUserToggle, isPending: isBlockUserPending } =
    useBlockUserAction()

  const { onDeleteUser, isPending: isDeleteUserPending } = useDeleteUserAction()

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

  const isPending =
    isBlockUserPending || isDeleteUserPending || isGetUserByIdPending

  useEffect(() => {
    if (!isError) return
    toast.error(error?.message ?? errorMessage)
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
