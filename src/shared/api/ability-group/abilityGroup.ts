import { apiInstance } from '../base'

import { AbilityGroup } from './model'

const version = '/v1'

const getAbilityGroupList = () => {
  return apiInstance.get<AbilityGroup[]>({
    endpoint: `${version}/ability-groups`,
    deserialize: true,
  })
}

const getAbilityGroupById = (abilityGroupId: string) => {
  return apiInstance.get<AbilityGroup>({
    endpoint: `${version}/ability-groups/${abilityGroupId}`,
    deserialize: true,
  })
}

export { getAbilityGroupList, getAbilityGroupById }
