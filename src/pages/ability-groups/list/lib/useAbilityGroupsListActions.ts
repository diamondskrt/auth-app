import { useEffect } from 'react'
import { toast } from 'sonner'

import { useGetAbilityGroupList } from '~/shared/api/ability-group'

export function useAbilityGroupsListActions() {
  const { data, isPending, isError, error } = useGetAbilityGroupList()

  useEffect(() => {
    if (!isError) return
    toast.error(error?.message)
  }, [isError, error])

  return {
    abilityGroupList: data?.data,
    isPending,
  }
}
