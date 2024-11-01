import { useQuery } from '@tanstack/react-query'

import { getAbilityGroupList } from './abilityGroup'

const useGetAbilityGroupList = () => {
  return useQuery({
    queryKey: ['abilityGroupList'],
    queryFn: getAbilityGroupList,
  })
}

export { useGetAbilityGroupList }
