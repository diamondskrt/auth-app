import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { UUID } from '~/shared/api/model'
import { useDeleteUser } from '~/shared/api/user'

export function useDeleteUserAction() {
  const navigate = useNavigate()
  const { mutateAsync: deleteUser, isPending, isError, error } = useDeleteUser()

  const onDeleteUser = async (userId?: UUID) => {
    await deleteUser(userId)
    toast.success('user has been deleted')
    if (location.pathname === '/users') return
    navigate('/users')
  }

  useEffect(() => {
    if (!isError) return
    toast.error(error.message)
  }, [isError, error])

  return {
    onDeleteUser,
    isPending,
  }
}
