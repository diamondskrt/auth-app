import dayjs from 'dayjs'
import { useCallback, useEffect } from 'react'
import { toast } from 'sonner'

import { UUID } from '~/shared/api/model'
import { useUpdateUser } from '~/shared/api/user'
import { DATE_FORMAT_TEMPLATE } from '~/shared/lib/date'
import { ApiDateTime } from '~/shared/lib/zod/model'

export function useBlockUserAction() {
  const { mutateAsync: updateUser, isPending, isError, error } = useUpdateUser()

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

  useEffect(() => {
    if (!isError) return
    toast.error(error?.message)
  }, [isError, error])

  return {
    onBlockUserToggle,
    isPending,
  }
}
