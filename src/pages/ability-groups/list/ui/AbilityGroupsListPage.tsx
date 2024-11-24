import { Loader } from '~/shared/ui/loader'
import { Typography } from '~/shared/ui/typography'
import { AppBar } from '~/widgets/app-bar'

import { useAbilityGroupsListActions } from '../lib'

export function AbilityGroupsListPage() {
  const { abilityGroupList, isPending } = useAbilityGroupsListActions()

  return (
    <>
      <AppBar title="Ability-groups" />
      {isPending ? (
        <Loader />
      ) : (
        <div className="ability-group-list">
          {abilityGroupList ? (
            abilityGroupList.map((abilityGroup) => (
              <div key={abilityGroup.id}>
                <Typography>- {abilityGroup.description}</Typography>
              </div>
            ))
          ) : (
            <Typography tag="p">No data</Typography>
          )}
        </div>
      )}
    </>
  )
}
